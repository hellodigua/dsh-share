import { flattenOpaqueBackground, SHARE_DARK_BACKGROUND, shareFallbackBackground } from './background.ts'

interface ExportTheme {
  colors: ReadonlyArray<readonly [string, string]>
  background: string
}

const themes = new WeakMap<HTMLElement, ExportTheme>()
const htmlThemes = new WeakMap<HTMLElement, ReadonlyArray<readonly [string, string]>>()
const HTML_TOKENS = /^(?:--dsw-alias-(?:bg-base|label-(?:primary|secondary|caption)|border-l[12]|link|markdown-(?:inline-code|code-block|code-block-banner))|--dsw-specific-bubble|--dsw-radius-(?:sm|lg|xl)|--dsw-font-(?:family|markdown-(?:base|h[123]|code-block))|--ds-font-family-code|--dsh-content-font-(?:size|delta))$/

/** 仅保存HTML实际消费的主题值，不复制宿主样式表或资源地址。 */
function readHtmlTheme(source: HTMLElement): ReadonlyArray<readonly [string, string]> {
  const saved = htmlThemes.get(source)
  if (saved) return saved
  if (!source.isConnected) return []
  const style = source.ownerDocument.defaultView?.getComputedStyle(source)
  if (!style) return []
  return Array.from(style).filter(name => HTML_TOKENS.test(name))
    .map(name => [name, style.getPropertyValue(name).trim()] as const)
    .filter(([, value]) => value && !/[{};<>\\]|url\s*\(|expression\s*\(/i.test(value))
}

/** HTML使用首个完整主题快照，脱离宿主后仍保持配色。 */
export function applyHtmlExportTheme(target: HTMLElement, sources: readonly HTMLElement[]): void {
  for (const source of sources) {
    const values = readHtmlTheme(source)
    if (!values.some(([name]) => name === '--dsw-alias-bg-base')
      || !values.some(([name]) => name === '--dsw-alias-label-primary')) continue
    for (const [name, value] of values) target.style.setProperty(name, value)
    return
  }
}
const COLOR_TOKEN = /^--dsw-alias-(?:bg-|label-|border-|line-|markdown-|link(?:-|$)|state-)/

/** 在节点仍连接到宿主时保存配色，不捕获尺寸、字号或布局样式。 */
function readTheme(element: HTMLElement): ExportTheme | undefined {
  const saved = themes.get(element)
  if (saved) return saved
  if (!element.isConnected) return undefined
  const style = element.ownerDocument.defaultView?.getComputedStyle(element)
  if (!style) return undefined
  const foreground = style.getPropertyValue('--dsw-alias-label-primary').trim()
  const background = style.getPropertyValue('--dsw-alias-bg-base').trim()
  // 不保存半套主题，避免前景与背景来自不同的上下文。
  if (!foreground || !background) return undefined
  const colors = Array.from(style)
    .filter(name => COLOR_TOKEN.test(name))
    .map(name => [name, style.getPropertyValue(name).trim()] as const)
  const fallback = style.colorScheme === 'dark' || element.closest('[data-ds-dark-theme]')
    ? SHARE_DARK_BACKGROUND
    : shareFallbackBackground(element.ownerDocument)
  return { colors, background: flattenOpaqueBackground(background, fallback) }
}

export function saveExportTheme(source: HTMLElement, snapshot: HTMLElement): void {
  htmlThemes.set(snapshot, readHtmlTheme(source))
  const theme = readTheme(source)
  if (theme) themes.set(snapshot, theme)
}

/** 整张导出卡片统一使用首个可用快照的配色，先设置主题再固化底色。 */
export function applyExportTheme(card: HTMLElement, sources: readonly HTMLElement[]): void {
  for (const source of sources) {
    const theme = readTheme(source)
    if (!theme) continue
    for (const [name, value] of theme.colors) card.style.setProperty(name, value)
    card.style.backgroundColor = theme.background
    return
  }
}
