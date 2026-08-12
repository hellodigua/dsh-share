// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  apply,
  createShareRuntime,
  ShareAction,
  type ShareActionProps,
  type ShareRuntime,
} from '../src/client/index.ts'

function createMemoryStorage(): Storage {
  const entries = new Map<string, string>()
  return {
    get length() { return entries.size },
    clear: () => entries.clear(),
    getItem: key => entries.get(key) ?? null,
    key: index => Array.from(entries.keys())[index] ?? null,
    removeItem: key => { entries.delete(key) },
    setItem: (key, value) => { entries.set(key, value) },
  }
}

function addTurn(id: string): HTMLElement {
  const root = document.createElement('div')
  root.innerHTML = `
    <div data-chat-flow-kind="user"><div data-time-hover-root><p>问题 ${id}</p><div><button>复制</button></div></div></div>
    <div data-chat-flow-kind="assistant-step"><article><p>回答 ${id}</p></article></div>
    <div data-chat-flow-kind="turn-tail"><div data-turn-tail="${id}"><div><button>复制</button><button>分支</button><span>1 秒</span></div></div></div>`
  document.body.append(root)
  return root.querySelector(`[data-turn-tail="${id}"]`) as HTMLElement
}

function addTurnWithProcess(id: string): HTMLElement {
  const root = document.createElement('div')
  root.innerHTML = `
    <div data-chat-flow-kind="user"><p>问题 ${id}</p></div>
    <div data-chat-flow-kind="assistant-step">
      <div data-variant="think">Think 中间步骤</div><p>中间说明</p>
    </div>
    <div data-chat-flow-kind="tool-call">
      <div data-disclosure-row><span>Bash</span><span>pnpm test</span></div>
    </div>
    <div data-chat-flow-kind="assistant-step">
      <div data-variant="think">Think 最终步骤</div><article><p>最终回答 ${id}</p></article>
    </div>
    <div data-chat-flow-kind="turn-tail"><div data-turn-tail="${id}"><div><button>复制</button><button>分支</button></div></div></div>`
  document.body.append(root)
  return root.querySelector(`[data-turn-tail="${id}"]`) as HTMLElement
}

function triggerShareAction(tail: HTMLElement, runtime: ShareRuntime, messageId = 'message-1'): HTMLButtonElement {
  const button = document.createElement('button')
  button.dataset.dshShareButton = ''
  tail.lastElementChild?.append(button)
  const action = ShareAction({ messageId, shareRuntime: runtime })
  const { onClick } = action.props as {
    onClick(event: { currentTarget: HTMLButtonElement }): void
  }
  onClick({ currentTarget: button })
  return button
}

beforeEach(() => {
  document.documentElement.lang = 'zh-CN'
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: createMemoryStorage(),
  })
  Object.defineProperty(window.HTMLImageElement.prototype, 'decode', {
    configurable: true,
    value: vi.fn(async () => undefined),
  })
})

afterEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
  window.localStorage.clear()
  vi.restoreAllMocks()
})

describe('分享按钮运行时', () => {
  it('通过官方 assistant-actions 插槽注册按钮，并在卸载时清理', () => {
    addTurn('one')
    const disposeRegistration = vi.fn()
    const injectionDisposers: Array<() => void> = []
    const register = vi.fn(() => disposeRegistration)
    const injectSlot = vi.fn((_name: string, callback: () => void | (() => void)) => {
      const dispose = callback()
      if (dispose) injectionDisposers.push(dispose)
    })

    apply({ slots: { inject: injectSlot, register } } as never)

    expect(injectSlot).toHaveBeenCalledWith('conversation.chat.assistant-actions', expect.any(Function))
    const [options, component] = register.mock.calls[0] as unknown as [
      {
        name: string
        id: string
        order: number
        inject(): { shareRuntime: ShareRuntime }
      },
      (props: ShareActionProps) => ReturnType<typeof ShareAction>,
    ]
    expect(options).toMatchObject({
      name: 'conversation.chat.assistant-actions',
      id: 'share',
      order: 20,
    })

    const runtime = options.inject().shareRuntime
    const action = component({ messageId: 'message-one', shareRuntime: runtime })
    expect(action.type).toBe('button')
    expect(action.props).toMatchObject({
      'data-dsh-share-button': '',
      'aria-label': '将当前问答分享为图片',
    })
    // 按钮由 React 插槽渲染；插件不再自行扫描已有或后来加入的对话。
    expect(document.querySelector('[data-dsh-share-button]')).toBeNull()
    const styleText = document.getElementById('dsh-share-style')?.textContent ?? ''
    expect(styleText).toContain('width: 960px')
    expect(styleText).toContain('max-height: 62vh')
    expect(styleText).not.toContain('max-height: 58vh')
    expect(styleText).not.toContain('opacity: .72')
    expect(styleText).not.toContain('margin-left: auto')
    expect(document.querySelector('.dsh-share-dialog__controls')?.firstElementChild?.classList
      .contains('dsh-share-dialog__toggle')).toBe(true)

    addTurn('two')
    expect(document.querySelector('[data-dsh-share-button]')).toBeNull()

    injectionDisposers[0]?.()
    expect(disposeRegistration).toHaveBeenCalledOnce()
    expect(document.querySelector('[data-dsh-share-dialog]')).toBeNull()
    expect(document.getElementById('dsh-share-style')).toBeNull()
  })

  it('运行时重复释放不会报错', () => {
    const runtime = createShareRuntime(document)
    runtime.dispose()
    runtime.dispose()
    expect(document.querySelector('[data-dsh-share-dialog]')).toBeNull()
  })

  it('点击按钮后用当前问答生成图片并显示预览', async () => {
    const createObjectURL = vi.fn(() => 'blob:dsh-share-preview')
    const revokeObjectURL = vi.fn()
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL })
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL })

    const tail = addTurn('click')
    const renderImage = vi.fn(async (element: HTMLElement) => {
      expect(element.textContent).toContain('问题 click')
      expect(element.textContent).toContain('回答 click')
      return new Blob(['png'], { type: 'image/png' })
    })
    const runtime = createShareRuntime(document, { renderImage })
    triggerShareAction(tail, runtime)

    await vi.waitFor(() => expect(renderImage).toHaveBeenCalledOnce())
    await vi.waitFor(() => {
      const image = document.querySelector('[data-dsh-share-preview]') as HTMLImageElement
      expect(image.src).toBe('blob:dsh-share-preview')
      expect(image.hidden).toBe(false)
      expect(image.style.width).toBe('768px')
    })

    runtime.dispose()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:dsh-share-preview')
  })

  it('切换电脑和大字号后重新生成图片并保存偏好', async () => {
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn(() => `blob:dsh-share-${Math.random()}`),
    })
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() })

    const tail = addTurn('settings')
    const renderedSettings: Array<{ width: string; fontSize: string }> = []
    const renderImage = vi.fn(async (element: HTMLElement) => {
      renderedSettings.push({
        width: element.style.width,
        fontSize: element.style.getPropertyValue('--dsh-share-font-size'),
      })
      return new Blob(['png'], { type: 'image/png' })
    })
    const runtime = createShareRuntime(document, { renderImage })
    triggerShareAction(tail, runtime)
    await vi.waitFor(() => expect(renderImage).toHaveBeenCalledTimes(1))
    expect(renderedSettings[0]).toEqual({ width: '768px', fontSize: '16px' })

    ;(document.querySelector('[data-dsh-share-choice="width"][data-value="desktop"]') as HTMLButtonElement).click()
    await vi.waitFor(() => expect(renderImage).toHaveBeenCalledTimes(2))
    expect(renderedSettings[1]).toEqual({ width: '1024px', fontSize: '16px' })
    await vi.waitFor(() => {
      expect((document.querySelector('[data-dsh-share-preview]') as HTMLImageElement).style.width).toBe('1024px')
    })

    ;(document.querySelector('[data-dsh-share-choice="font-size"][data-value="large"]') as HTMLButtonElement).click()
    await vi.waitFor(() => expect(renderImage).toHaveBeenCalledTimes(3))
    expect(renderedSettings[2]).toEqual({ width: '1024px', fontSize: '18px' })
    expect(window.localStorage.getItem('dsh-share.width')).toBe('desktop')
    expect(window.localStorage.getItem('dsh-share.font-size')).toBe('large')
    expect(document.querySelector('[data-value="desktop"]')?.getAttribute('aria-pressed')).toBe('true')
    expect(document.querySelector('[data-value="large"]')?.getAttribute('aria-pressed')).toBe('true')

    runtime.dispose()
  })

  it('勾选不展示过程后隐藏 Think、工具调用和中间步骤', async () => {
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn(() => `blob:dsh-share-${Math.random()}`),
    })
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() })

    const tail = addTurnWithProcess('clean')
    const renderedContent: string[] = []
    const renderImage = vi.fn(async (element: HTMLElement) => {
      renderedContent.push(element.textContent ?? '')
      return new Blob(['png'], { type: 'image/png' })
    })
    const runtime = createShareRuntime(document, { renderImage })
    triggerShareAction(tail, runtime)
    await vi.waitFor(() => expect(renderImage).toHaveBeenCalledTimes(1))
    expect(renderedContent[0]).toContain('Think 中间步骤')
    expect(renderedContent[0]).toContain('Bash')

    const toggle = document.querySelector('[data-dsh-share-hide-process]') as HTMLInputElement
    expect(toggle.checked).toBe(false)
    toggle.click()

    await vi.waitFor(() => expect(renderImage).toHaveBeenCalledTimes(2))
    expect(renderedContent[1]).toContain('问题 clean')
    expect(renderedContent[1]).toContain('最终回答 clean')
    expect(renderedContent[1]).not.toContain('Think')
    expect(renderedContent[1]).not.toContain('Bash')
    expect(renderedContent[1]).not.toContain('中间说明')
    expect(window.localStorage.getItem('dsh-share.hide-process')).toBe('true')

    runtime.dispose()
  })

  it('更新预览时保留旧图，等新图解码后再原位替换', async () => {
    const objectUrls = ['blob:preview-1', 'blob:preview-2']
    const createObjectURL = vi.fn(() => objectUrls.shift() as string)
    const revokeObjectURL = vi.fn()
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL })
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL })

    let finishSecondDecode: (() => void) | undefined
    const decode = vi.fn()
      .mockResolvedValueOnce(undefined)
      .mockImplementationOnce(() => new Promise<void>((resolve) => {
        finishSecondDecode = resolve
      }))
    Object.defineProperty(window.HTMLImageElement.prototype, 'decode', {
      configurable: true,
      value: decode,
    })

    const tail = addTurn('smooth')
    const renderImage = vi.fn(async () => new Blob(['png'], { type: 'image/png' }))
    const runtime = createShareRuntime(document, { renderImage })
    triggerShareAction(tail, runtime)
    const preview = document.querySelector('[data-dsh-share-preview]') as HTMLImageElement
    await vi.waitFor(() => expect(preview.src).toBe('blob:preview-1'))
    expect(preview.style.width).toBe('768px')

    ;(document.querySelector('[data-dsh-share-choice="width"][data-value="desktop"]') as HTMLButtonElement).click()
    await vi.waitFor(() => expect(decode).toHaveBeenCalledTimes(2))

    expect(preview.hidden).toBe(false)
    expect(preview.src).toBe('blob:preview-1')
    expect(preview.style.width).toBe('768px')
    expect(document.querySelector('[data-dsh-share-status]')?.textContent).toBe('正在更新预览…')
    expect((document.querySelector('[data-dsh-share-copy]') as HTMLButtonElement).disabled).toBe(true)
    expect(revokeObjectURL).not.toHaveBeenCalledWith('blob:preview-1')

    finishSecondDecode?.()
    await vi.waitFor(() => expect(preview.src).toBe('blob:preview-2'))
    expect(preview.style.width).toBe('1024px')
    await vi.waitFor(() => expect(revokeObjectURL).toHaveBeenCalledWith('blob:preview-1'))
    expect((document.querySelector('[data-dsh-share-copy]') as HTMLButtonElement).disabled).toBe(false)

    runtime.dispose()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:preview-2')
  })
})
