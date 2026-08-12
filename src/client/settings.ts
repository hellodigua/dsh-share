export type WidthPreset = 'phone' | 'tablet' | 'desktop'
export type FontSizePreset = 'normal' | 'large' | 'xlarge'

export interface ShareSettings {
  width: WidthPreset
  fontSize: FontSizePreset
}

export const WIDTH_PRESETS: Record<WidthPreset, number> = {
  phone: 375,
  tablet: 520,
  desktop: 640,
}

export const FONT_SIZE_PRESETS: Record<FontSizePreset, number> = {
  normal: 16,
  large: 18,
  xlarge: 20,
}

export const DEFAULT_SHARE_SETTINGS: ShareSettings = {
  width: 'phone',
  fontSize: 'normal',
}

const WIDTH_STORAGE_KEY = 'dsh-share.width'
const FONT_SIZE_STORAGE_KEY = 'dsh-share.font-size'
const WIDTH_VALUES = new Set<WidthPreset>(['phone', 'tablet', 'desktop'])
const FONT_SIZE_VALUES = new Set<FontSizePreset>(['normal', 'large', 'xlarge'])

/** 读取失败时回到默认值，避免隐私模式下 localStorage 异常阻断分享功能。 */
export function loadShareSettings(storage?: Storage): ShareSettings {
  if (!storage) return { ...DEFAULT_SHARE_SETTINGS }
  try {
    const width = storage.getItem(WIDTH_STORAGE_KEY) as WidthPreset | null
    const fontSize = storage.getItem(FONT_SIZE_STORAGE_KEY) as FontSizePreset | null
    return {
      width: width !== null && WIDTH_VALUES.has(width) ? width : DEFAULT_SHARE_SETTINGS.width,
      fontSize: fontSize !== null && FONT_SIZE_VALUES.has(fontSize)
        ? fontSize
        : DEFAULT_SHARE_SETTINGS.fontSize,
    }
  } catch {
    return { ...DEFAULT_SHARE_SETTINGS }
  }
}

export function saveShareSettings(storage: Storage | undefined, settings: ShareSettings): void {
  if (!storage) return
  try {
    storage.setItem(WIDTH_STORAGE_KEY, settings.width)
    storage.setItem(FONT_SIZE_STORAGE_KEY, settings.fontSize)
  } catch {
    // localStorage 可能被浏览器策略禁用；设置仍在当前弹窗内有效。
  }
}
