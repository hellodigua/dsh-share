// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import {
  DEFAULT_SHARE_SETTINGS,
  FONT_SIZE_PRESETS,
  loadShareSettings,
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
})
