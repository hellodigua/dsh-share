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
