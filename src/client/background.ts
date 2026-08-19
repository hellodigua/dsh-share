/** 无主题或亮色时的不透明分享图底色，对应卡片 `var()` 兜底 `#f7f8fa`。 */
export const SHARE_LIGHT_BACKGROUND = 'rgb(247, 248, 250)'
/** 官方暗色 `--dsw-alias-bg-base` 的实色，避免皮肤把 token 设成 transparent。 */
export const SHARE_DARK_BACKGROUND = 'rgb(21, 21, 23)'

export function shareFallbackBackground(document: Document): string {
  return document.body.hasAttribute('data-ds-dark-theme')
    ? SHARE_DARK_BACKGROUND
    : SHARE_LIGHT_BACKGROUND
}

interface CssColor {
  r: number
  g: number
  b: number
  a: number
}

function clampByte(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)))
}

function parseAlpha(raw: string): number {
  if (raw.endsWith('%')) return Math.min(1, Math.max(0, Number(raw.slice(0, -1)) / 100))
  const value = Number(raw)
  if (!Number.isFinite(value)) return 1
  return Math.min(1, Math.max(0, value))
}

function parseCssColor(color: string): CssColor | null {
  const value = color.trim().toLowerCase()
  if (!value || value === 'transparent' || value === 'none') {
    return { r: 0, g: 0, b: 0, a: 0 }
  }

  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/)
  if (hex) {
    const digits = hex[1].length === 3
      ? hex[1].split('').map(digit => digit + digit).join('')
      : hex[1]
    return {
      r: Number.parseInt(digits.slice(0, 2), 16),
      g: Number.parseInt(digits.slice(2, 4), 16),
      b: Number.parseInt(digits.slice(4, 6), 16),
      a: 1,
    }
  }

  const comma = value.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+%?))?\s*\)$/,
  )
  if (comma) {
    return {
      r: Number(comma[1]),
      g: Number(comma[2]),
      b: Number(comma[3]),
      a: comma[4] === undefined ? 1 : parseAlpha(comma[4]),
    }
  }

  const space = value.match(
    /^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/,
  )
  if (space) {
    return {
      r: Number(space[1]),
      g: Number(space[2]),
      b: Number(space[3]),
      a: space[4] === undefined ? 1 : parseAlpha(space[4]),
    }
  }

  return null
}

/** 把计算色压成不透明实色。透明走主题兜底；半透明叠在兜底之上。无法解析的颜色原样返回。 */
export function flattenOpaqueBackground(color: string, fallback: string): string {
  const parsed = parseCssColor(color)
  if (!parsed) {
    const normalized = color.trim().toLowerCase()
    return !normalized || normalized === 'transparent' ? fallback : color
  }
  if (parsed.a <= 0) return fallback
  if (parsed.a >= 1) return `rgb(${clampByte(parsed.r)}, ${clampByte(parsed.g)}, ${clampByte(parsed.b)})`

  const base = parseCssColor(fallback) ?? parseCssColor(SHARE_LIGHT_BACKGROUND)!
  const alpha = parsed.a
  return `rgb(${clampByte(parsed.r * alpha + base.r * (1 - alpha))}, ${clampByte(parsed.g * alpha + base.g * (1 - alpha))}, ${clampByte(parsed.b * alpha + base.b * (1 - alpha))})`
}

export function shareExportBackground(element: HTMLElement): string {
  const view = element.ownerDocument.defaultView
  const computed = view?.getComputedStyle(element).backgroundColor ?? ''
  return flattenOpaqueBackground(computed, shareFallbackBackground(element.ownerDocument))
}
