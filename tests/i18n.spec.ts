import { describe, expect, it } from 'vitest'
import { normalizeShareLocale, t } from '../src/client/i18n.ts'

describe('第三方语言包兼容', () => {
  it.each(['zh', 'zh-CN', 'zh-TW', 'ZH-Hans'])(
    '%s 使用中文分享文案', locale => {
      expect(t(normalizeShareLocale(locale)).shareTooltip).toBe('分享')
    },
  )

  it.each(['en', 'en-US', 'ja', 'fr', ''])(
    '%s 使用英文兜底而不产生空白文案', locale => {
      expect(t(normalizeShareLocale(locale)).shareTooltip).toBe(t('en').shareTooltip)
    },
  )
})
