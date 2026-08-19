// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import {
  SHARE_DARK_BACKGROUND,
  SHARE_LIGHT_BACKGROUND,
  flattenOpaqueBackground,
  shareExportBackground,
  shareFallbackBackground,
} from '../src/client/background.ts'

afterEach(() => {
  document.body.innerHTML = ''
  document.body.removeAttribute('data-ds-dark-theme')
})

describe('分享图底色', () => {
  it('把透明和缺省色换成不透明兜底，半透明叠在兜底上', () => {
    expect(flattenOpaqueBackground('transparent', SHARE_LIGHT_BACKGROUND)).toBe(SHARE_LIGHT_BACKGROUND)
    expect(flattenOpaqueBackground('rgba(0, 0, 0, 0)', SHARE_DARK_BACKGROUND)).toBe(SHARE_DARK_BACKGROUND)
    expect(flattenOpaqueBackground('rgb(255, 255, 255)', SHARE_LIGHT_BACKGROUND)).toBe('rgb(255, 255, 255)')
    expect(flattenOpaqueBackground('#f7f8fa', SHARE_DARK_BACKGROUND)).toBe(SHARE_LIGHT_BACKGROUND)
    expect(flattenOpaqueBackground('rgba(13, 16, 30, 0.86)', SHARE_DARK_BACKGROUND)).toBe('rgb(14, 17, 29)')
    expect(flattenOpaqueBackground('color(srgb 1 1 1)', SHARE_LIGHT_BACKGROUND)).toBe('color(srgb 1 1 1)')
  })

  it('亮色和暗色主题使用不同的不透明兜底', () => {
    expect(shareFallbackBackground(document)).toBe(SHARE_LIGHT_BACKGROUND)
    document.body.setAttribute('data-ds-dark-theme', '')
    expect(shareFallbackBackground(document)).toBe(SHARE_DARK_BACKGROUND)
  })

  it('从元素计算样式得到不透明导出底色', () => {
    const element = document.createElement('div')
    element.style.backgroundColor = 'transparent'
    document.body.append(element)
    expect(shareExportBackground(element)).toBe(SHARE_LIGHT_BACKGROUND)

    document.body.setAttribute('data-ds-dark-theme', '')
    element.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    expect(shareExportBackground(element)).toBe(SHARE_DARK_BACKGROUND)
  })
})
