import { expect, it } from 'vitest'
import { STYLE_TEXT } from '../src/client/styles.ts'

it('生成图片使用主题主按钮，下载和格式选择保持次级样式', () => {
  const primary = STYLE_TEXT.match(/\[data-dsh-share-selection-create\] \{([^}]+)\}/g)!
    .find(rule => rule.includes('button-primary-fill'))!
  expect(primary).toContain('var(--dsw-alias-button-primary-fill')
  expect(primary).toContain('var(--dsw-alias-label-primary-foreground')
  expect(STYLE_TEXT).toContain('[data-dsh-share-selection-cancel],\n[data-dsh-share-selection-download],\n[data-dsh-share-format-trigger] {\n  background: transparent;')
  expect(STYLE_TEXT).toContain('[data-dsh-share-selection-create]:hover:not(:disabled) {\n  background: var(--dsw-alias-button-primary-hover')
})
