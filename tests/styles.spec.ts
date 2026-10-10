// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { STYLE_TEXT } from '../src/client/styles.ts'

function declarations(selector: string): string {
  const start = STYLE_TEXT.indexOf(`${selector} {`)
  expect(start).toBeGreaterThanOrEqual(0)
  return STYLE_TEXT.slice(start, STYLE_TEXT.indexOf('}', start))
}

describe('分享界面主题契约', () => {
  it('消息入口跟随官方圆角和内容字号增量', () => {
    const button = declarations('[data-dsh-share-button]')
    expect(button).toContain('border-radius: var(--dsw-radius-sm, 6px)')
    expect(button).toContain('width: calc(28px + var(--dsh-content-font-delta, 0px))')
    expect(button).toContain('height: calc(28px + var(--dsh-content-font-delta, 0px))')
    expect(declarations('[data-dsh-share-button] svg')).toContain('calc(15px + var(--dsh-content-font-delta, 0px))')
    expect(declarations('[data-clock="end"] [data-dsh-share-button] svg')).toContain('calc(17px + var(--dsh-content-font-delta, 0px))')
  })

  it('控件圆角和交互颜色使用宿主变量', () => {
    expect(STYLE_TEXT).not.toMatch(/border-radius:\s*\d/)
    expect(STYLE_TEXT).not.toContain('--dsw-static-deepseek-500')
    expect(STYLE_TEXT).not.toContain('--dsw-alias-line-border')
    expect(declarations('.dsh-share-dialog__action--primary')).toContain('--dsw-alias-button-primary-fill')
    expect(declarations('.dsh-share-dialog__action--primary')).toContain('--dsw-alias-label-primary-foreground')
    expect(declarations('.dsh-share-dialog__action--primary:hover:not(:disabled)')).toContain('--dsw-alias-button-primary-hover')
    expect(declarations('[data-dsh-share-dialog]::backdrop')).toContain('--dsw-alias-bg-mask-1')
    expect(STYLE_TEXT).toContain('box-shadow: var(--dsw-elevation-prominent,')
  })

  it('选中档位采用配套主题前景背景及高对比兜底，不依赖正文颜色', () => {
    const choice = declarations('.dsh-share-dialog__choice[aria-pressed="true"]')
    expect(choice).toContain('background: var(--dsw-alias-button-primary-fill, #111827)')
    expect(choice).toContain('color: var(--dsw-alias-label-primary-foreground, #fff)')
    expect(choice).not.toContain('--dsw-alias-interactive-bg-hover')
    expect(choice).not.toContain('--dsw-alias-label-primary,')
  })
})
