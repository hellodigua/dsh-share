// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { SHARE_DARK_BACKGROUND, SHARE_LIGHT_BACKGROUND } from '../src/client/background.ts'

const toBlob = vi.hoisted(() => vi.fn())

vi.mock('html-to-image', () => ({ toBlob }))

afterEach(() => {
  document.body.innerHTML = ''
  document.body.removeAttribute('data-ds-dark-theme')
  toBlob.mockReset()
})

describe('分享图渲染', () => {
  it('长图按固定高度顺序分页，不缩小宽度，并清理临时容器', async () => {
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    document.body.append(element)
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({ width: 768, height: 9000 } as DOMRect)
    const offsets: string[] = []
    toBlob.mockImplementation(async (viewport: HTMLElement) => {
      offsets.push((viewport.firstElementChild as HTMLElement).style.transform)
      return new Blob(['png'])
    })
    const pages = await renderShareImage(element)
    expect(pages).toHaveLength(3)
    expect(offsets).toEqual(['translateY(-0px)', 'translateY(-4096px)', 'translateY(-8192px)'])
    expect(toBlob.mock.calls.map(call => call[1].height)).toEqual([4096, 4096, 808])
    for (const call of toBlob.mock.calls) expect(call[1]).toMatchObject({ width: 768, pixelRatio: 2, skipAutoScale: true })
    expect(document.body.children).toHaveLength(1)
  })

  it('分页失败不返回残缺结果且清理临时容器', async () => {
    const { renderShareImage } = await import('../src/client/preview-dialog.ts')
    const element = document.createElement('article')
    document.body.append(element)
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({ width: 768, height: 9000 } as DOMRect)
    toBlob.mockResolvedValueOnce(new Blob(['png'])).mockResolvedValueOnce(null)
    await expect(renderShareImage(element)).rejects.toThrow('empty page')
    expect(document.body.children).toHaveLength(1)
  })

  it('分页预览可切换、按页下载，并释放所有 URL', async () => {
    const { PreviewDialog } = await import('../src/client/preview-dialog.ts')
    let id = 0
    const revoke = vi.fn()
    vi.stubGlobal('URL', { createObjectURL: () => `blob:page-${++id}`, revokeObjectURL: revoke })
    Object.defineProperty(HTMLImageElement.prototype, 'decode', { configurable: true, value: vi.fn(async () => {}) })
    const downloads: string[] = []
    const clipboardWrite = vi.fn(async (_items: Array<{ data: Record<string, Blob> }>) => {})
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { write: clipboardWrite } })
    vi.stubGlobal('ClipboardItem', class { constructor(readonly data: Record<string, Blob>) {} })
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) { downloads.push(this.download) })
    const dialog = new PreviewDialog(document, { getLocale: () => 'zh', onSettingsChange() {}, onDismiss() {} })
    try {
      const second = new Blob(['2'])
      await dialog.showResult([new Blob(['1']), second])
      const next = dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-next]')!
      expect(next.disabled).toBe(false)
      next.click()
      expect(next.disabled).toBe(true)
      expect(dialog.element.querySelector('img')!.src).toBe('blob:page-2')
      dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-download]')!.click()
      expect(downloads[0]).toMatch(/^dsh-\d{8}-\d{6}-2-of-2\.png$/)
      expect(dialog.element.querySelector('[data-dsh-share-copy]')!.textContent).toBe('复制当前页')
      dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-copy]')!.click()
      expect(clipboardWrite.mock.calls[0]).toBeDefined()
      expect(clipboardWrite.mock.calls[0]?.[0][0]?.data['image/png']).toBe(second)
      await dialog.showResult(new Blob(['3']))
      dialog.element.querySelector<HTMLButtonElement>('[data-dsh-share-download]')!.click()
      expect(downloads[1]).toMatch(/^dsh-\d{8}-\d{6}\.png$/)
      expect(revoke).toHaveBeenCalledWith('blob:page-1')
      expect(revoke).toHaveBeenCalledWith('blob:page-2')
      expect(dialog.element.querySelector<HTMLElement>('[data-dsh-share-pages]')!.hidden).toBe(true)
      await dialog.showResult([new Blob(['4']), new Blob(['5'])], () => false)
      expect(revoke).toHaveBeenCalledWith('blob:page-4')
      expect(revoke).toHaveBeenCalledWith('blob:page-5')
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

    await renderShareImage(element)

    expect(toBlob.mock.calls[0]?.[1]).toMatchObject({
      backgroundColor: SHARE_DARK_BACKGROUND,
    })
  })
})
