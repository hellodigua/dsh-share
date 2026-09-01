// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import {
  DEFAULT_SHARE_SETTINGS,
  FONT_SIZE_PRESETS,
  loadDirectSingleTurn,
  loadShareSettings,
  saveDirectSingleTurn,
  saveShareSettings,
  WIDTH_PRESETS,
} from '../src/client/settings.ts'

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

describe('分享图片设置', () => {
  it('提供手机、平板和电脑的宽度与字号预设', () => {
    expect(WIDTH_PRESETS).toEqual({ phone: 375, tablet: 768, desktop: 1024 })
    expect(FONT_SIZE_PRESETS).toEqual({ normal: 16, large: 18, xlarge: 20 })
    expect(DEFAULT_SHARE_SETTINGS).toEqual({
      width: 'tablet',
      fontSize: 'normal',
      hideProcess: false,
    })
  })

  it('保存有效偏好，并忽略无效的历史值', () => {
    const storage = createMemoryStorage()
    saveShareSettings(storage, { width: 'desktop', fontSize: 'xlarge', hideProcess: true })
    expect(loadShareSettings(storage)).toEqual({
      width: 'desktop',
      fontSize: 'xlarge',
      hideProcess: true,
    })

    storage.setItem('dsh-share.width', 'unknown')
    storage.setItem('dsh-share.font-size', 'tiny')
    storage.setItem('dsh-share.hide-process', 'invalid')
    expect(loadShareSettings(storage)).toEqual(DEFAULT_SHARE_SETTINGS)
  })

  it('单轮点击直接生成图片默认关闭，并可单独持久化', () => {
    const storage = createMemoryStorage()
    expect(loadDirectSingleTurn(storage)).toBe(false)

    saveDirectSingleTurn(storage, true)
    expect(loadDirectSingleTurn(storage)).toBe(true)

    storage.setItem('dsh-share.direct-single-turn', 'invalid')
    expect(loadDirectSingleTurn(storage)).toBe(false)
  })
})
