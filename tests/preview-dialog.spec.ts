// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { SHARE_DARK_BACKGROUND, SHARE_LIGHT_BACKGROUND } from '../src/client/background.ts'

const toBlob = vi.hoisted(() => vi.fn())

vi.mock('html-to-image', () => ({ toBlob }))

afterEach(() => {
  document.body.innerHTML = ''
  document.body.removeAttribute('data-ds-dark-theme')
  toBlob.mockReset()
  vi.restoreAllMocks()
})

describe('分享图渲染', () => {
  it('没有问答边界的长图完整导出，不按像素裁切，并清理副本', async () => {
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    document.body.append(element)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 768, height: 9000 } as DOMRect)
    const blob = new Blob(['png'])
    toBlob.mockResolvedValue(blob)
    expect(await renderShareImage(element)).toBe(blob)
    expect(toBlob).toHaveBeenCalledOnce()
    expect(toBlob.mock.calls[0]![1]).toMatchObject({ width: 768, height: 9000, pixelRatio: 2, skipAutoScale: true })
    expect(toBlob.mock.calls[0]![0].style.transform).toBe('')
    expect(document.body.children).toHaveLength(1)
  })

  it('编码失败时拒绝空结果并清理临时容器', async () => {
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    document.body.append(element)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 768, height: 9000 } as DOMRect)
    toBlob.mockResolvedValueOnce(null)
    await expect(renderShareImage(element)).rejects.toThrow('complete image')
    expect(toBlob.mock.calls.map(([, options]) => options.pixelRatio)).toEqual([2, 1, 0.5])
    expect(document.body.children).toHaveLength(1)
  })

  it.each([
    { width: 1024, height: 8192, ratio: 2 },
    { width: 1024, height: 8193, ratio: 1 },
    { width: 768, height: 20000, ratio: 1 },
    { width: 768, height: 40000, ratio: 0.5 },
    { width: 768, height: 65534, ratio: 0.5 },
  ])('按单边及面积预算降低倍率，保持完整排版：$width × $height', async ({ width, height, ratio }) => {
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    element.textContent = 'complete content'
    document.body.append(element)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, width, height))
    const blob = new Blob(['png'])
    toBlob.mockResolvedValue(blob)
    expect(await renderShareImage(element)).toBe(blob)
    expect(toBlob).toHaveBeenCalledOnce()
    expect(toBlob.mock.calls[0]![1]).toMatchObject({ width, height, pixelRatio: ratio, skipAutoScale: true })
    expect(toBlob.mock.calls[0]![0].textContent).toBe('complete content')
    expect(toBlob.mock.calls[0]![0].style.transform).toBe('')
    expect(document.body.children).toHaveLength(1)
  })

  it('编码异常或空文件时有界重试，只降低倍率不裁切内容', async () => {
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    document.body.append(element)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 768, 2000))
    const blob = new Blob(['png'])
    toBlob.mockRejectedValueOnce(new Error('allocation failed')).mockResolvedValueOnce(new Blob()).mockResolvedValueOnce(blob)
    expect(await renderShareImage(element)).toBe(blob)
    expect(toBlob.mock.calls.map(([, options]) => options.pixelRatio)).toEqual([2, 1, 0.5])
    for (const [, options] of toBlob.mock.calls) expect(options).toMatchObject({ width: 768, height: 2000 })
    expect(document.body.children).toHaveLength(1)
  })

  it.each([65536, Number.POSITIVE_INFINITY, Number.NaN, 0])('完整图片无法在最低倍率预算内导出时明确失败：%s', async height => {
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    document.body.append(element)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 768, height } as DOMRect)
    await expect(renderShareImage(element)).rejects.toThrow('complete image')
    expect(toBlob).not.toHaveBeenCalled()
    expect(document.body.children).toHaveLength(1)
  })

  it.each(['zh', 'en'] as const)('生成失败时以%s文案说明替代导出方式', async locale => {
    const { PreviewDialog } = await import('../src/client/preview-dialog.ts')
    const { t } = await import('../src/client/i18n.ts')
    const dialog = new PreviewDialog(document, { getLocale: () => locale, onSettingsChange() {}, onDismiss() {} })
    try {
      dialog.showError()
      expect(dialog.element.querySelector('[data-dsh-share-message]')!.textContent).toBe(t(locale).renderFailed)
      expect(t(locale).renderFailed).toContain('Markdown')
      expect(dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-download]')!.disabled).toBe(true)
      expect(dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-copy]')!.disabled).toBe(true)
    } finally {
      dialog.destroy()
    }
  })

  it('分页预览可切换、按页下载，并释放所有 URL', async () => {
    const { PreviewDialog } = await import('../src/client/preview-dialog.ts')
    let id = 0
    const revoke = vi.fn()
    vi.stubGlobal('URL', { createObjectURL: () => `blob:page-${++id}`, revokeObjectURL: revoke })
    Object.defineProperty(HTMLImageElement.prototype, 'decode', { configurable: true, value: vi.fn(async () => {}) })
    const downloads: string[] = []
    const downloadUrls: string[] = []
    const clipboardWrite = vi.fn(async (_items: Array<{ data: Record<string, Blob> }>) => {})
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { write: clipboardWrite } })
    vi.stubGlobal('ClipboardItem', class { constructor(readonly data: Record<string, Blob>) {} })
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      downloads.push(this.download)
      downloadUrls.push(this.href)
    })
    let locale: 'zh' | 'en' = 'zh'
    const dialog = new PreviewDialog(document, { getLocale: () => locale, getConversationTitle: () => '对话.png示例', onSettingsChange() {}, onDismiss() {} })
    try {
      const downloadAll = dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-download-all]')!
      expect(downloadAll.hidden).toBe(true)
      expect(downloadAll.disabled).toBe(true)
      const second = new Blob(['2'])
      await dialog.showResult([new Blob(['1']), second])
      expect(downloadAll.hidden).toBe(false)
      expect(downloadAll.textContent).toBe('下载全部')
      const next = dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-next]')!
      expect(next.disabled).toBe(false)
      next.click()
      expect(next.disabled).toBe(true)
      expect(dialog.element.querySelector('img')!.src).toBe('blob:page-2')
      dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-download]')!.click()
      expect(downloads[0]).toBe('dsh-对话.png示例-02.png')
      downloadAll.click()
      expect(downloads.slice(1)).toEqual([
        'dsh-对话.png示例-01.png',
        'dsh-对话.png示例-02.png',
      ])
      expect(downloadUrls).toEqual(['blob:page-2', 'blob:page-1', 'blob:page-2'])
      expect(dialog.element.querySelector('img')!.src).toBe('blob:page-2')
      expect(dialog.element.querySelector('[data-dsh-share-copy]')!.textContent).toBe('复制当前页')
      dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-copy]')!.click()
      expect(clipboardWrite.mock.calls[0]).toBeDefined()
      expect(clipboardWrite.mock.calls[0]?.[0][0]?.data['image/png']).toBe(second)
      locale = 'en'
      dialog.showPendingUpdate()
      expect(downloadAll.textContent).toBe('Download all')
      expect(downloadAll.disabled).toBe(true)
      downloadAll.click()
      expect(downloads).toHaveLength(3)
      dialog.showError(true)
      expect(downloadAll.disabled).toBe(false)
      dialog.showLoading(2, true)
      expect(downloadAll.disabled).toBe(true)
      await dialog.showResult(new Blob(['3']))
      expect(downloadAll.hidden).toBe(true)
      downloadAll.click()
      expect(downloads).toHaveLength(3)
      dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-download]')!.click()
      expect(downloads[3]).toBe('dsh-对话.png示例.png')
      expect(revoke).toHaveBeenCalledWith('blob:page-1')
      expect(revoke).toHaveBeenCalledWith('blob:page-2')
      expect(dialog.element.querySelector<HTMLElement>('[data-dsh-share-pages]')!.hidden).toBe(true)
      await dialog.showResult([new Blob(['4']), new Blob(['5'])], () => false)
      expect(revoke).toHaveBeenCalledWith('blob:page-4')
      expect(revoke).toHaveBeenCalledWith('blob:page-5')
      dialog.showError()
      expect(downloadAll.hidden).toBe(true)
      expect(downloadAll.disabled).toBe(true)
    } finally {
      dialog.destroy()
      delete (HTMLImageElement.prototype as Partial<HTMLImageElement>).decode
      click.mockRestore()
      vi.unstubAllGlobals()
      delete (navigator as Partial<Navigator>).clipboard
    }
    expect(revoke).toHaveBeenCalledWith('blob:page-3')
  })
  it('把透明计算底色换成不透明颜色再交给 html-to-image', async () => {
    toBlob.mockResolvedValue(new Blob(['png'], { type: 'image/png' }))
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    element.style.backgroundColor = 'transparent'
    document.body.append(element)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 768, 200))

    await renderShareImage(element)

    expect(toBlob).toHaveBeenCalledTimes(1)
    expect(toBlob.mock.calls[0]?.[1]).toMatchObject({
      backgroundColor: SHARE_LIGHT_BACKGROUND,
      pixelRatio: 2,
      skipFonts: true,
    })
  })

  it('暗色主题下透明底色改用官方暗色实色', async () => {
    toBlob.mockResolvedValue(new Blob(['png'], { type: 'image/png' }))
    document.body.setAttribute('data-ds-dark-theme', '')
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    element.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    document.body.append(element)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 768, 200))

    await renderShareImage(element)

    expect(toBlob.mock.calls[0]?.[1]).toMatchObject({
      backgroundColor: SHARE_DARK_BACKGROUND,
    })
  })
})
