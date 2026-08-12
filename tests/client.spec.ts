// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { installShareButton } from '../src/client/index.ts'

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
  it('为已有和后来加入的对话各插入一个按钮，并在卸载时清理', async () => {
    addTurn('one')
    const dispose = installShareButton(document, { renderImage: vi.fn() })
    expect(document.querySelectorAll('[data-dsh-share-button]')).toHaveLength(1)
    const styleText = document.getElementById('dsh-share-style')?.textContent ?? ''
    expect(styleText).toContain('width: 960px')
    expect(styleText).toContain('max-height: 62vh')
    expect(styleText).not.toContain('max-height: 58vh')

    addTurn('two')
    await vi.waitFor(() => expect(document.querySelectorAll('[data-dsh-share-button]')).toHaveLength(2))

    document.documentElement.lang = 'zh-CN'
    await vi.waitFor(() => {
      expect(document.querySelector('[data-dsh-share-button]')?.getAttribute('aria-label')).toContain('分享')
    })

    dispose()
    expect(document.querySelector('[data-dsh-share-button]')).toBeNull()
    expect(document.querySelector('[data-dsh-share-dialog]')).toBeNull()
    expect(document.getElementById('dsh-share-style')).toBeNull()
  })

  it('多个挂载者独立释放，重复调用 disposer 不会提前卸载', () => {
    addTurn('lease')
    const releaseOne = installShareButton(document)
    const releaseTwo = installShareButton(document)

    releaseOne()
    releaseOne()
    expect(document.querySelector('[data-dsh-share-button]')).not.toBeNull()

    releaseTwo()
    expect(document.querySelector('[data-dsh-share-button]')).toBeNull()
  })

  it('点击按钮后用当前问答生成图片并显示预览', async () => {
    const createObjectURL = vi.fn(() => 'blob:dsh-share-preview')
    const revokeObjectURL = vi.fn()
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL })
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL })

    addTurn('click')
    const renderImage = vi.fn(async (element: HTMLElement) => {
      expect(element.textContent).toContain('问题 click')
      expect(element.textContent).toContain('回答 click')
      return new Blob(['png'], { type: 'image/png' })
    })
    const dispose = installShareButton(document, { renderImage })

    ;(document.querySelector('[data-dsh-share-button]') as HTMLButtonElement).click()

    await vi.waitFor(() => expect(renderImage).toHaveBeenCalledOnce())
    await vi.waitFor(() => {
      const image = document.querySelector('[data-dsh-share-preview]') as HTMLImageElement
      expect(image.src).toBe('blob:dsh-share-preview')
      expect(image.hidden).toBe(false)
      expect(image.style.width).toBe('768px')
    })

    dispose()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:dsh-share-preview')
  })

  it('切换电脑和大字号后重新生成图片并保存偏好', async () => {
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn(() => `blob:dsh-share-${Math.random()}`),
    })
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() })

    addTurn('settings')
    const renderedSettings: Array<{ width: string; fontSize: string }> = []
    const renderImage = vi.fn(async (element: HTMLElement) => {
      renderedSettings.push({
        width: element.style.width,
        fontSize: element.style.getPropertyValue('--dsh-share-font-size'),
      })
      return new Blob(['png'], { type: 'image/png' })
    })
    const dispose = installShareButton(document, { renderImage })

    ;(document.querySelector('[data-dsh-share-button]') as HTMLButtonElement).click()
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

    dispose()
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

    addTurn('smooth')
    const renderImage = vi.fn(async () => new Blob(['png'], { type: 'image/png' }))
    const dispose = installShareButton(document, { renderImage })

    ;(document.querySelector('[data-dsh-share-button]') as HTMLButtonElement).click()
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

    dispose()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:preview-2')
  })
})
