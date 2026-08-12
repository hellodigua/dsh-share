import type { TurnContent } from './dom.ts'
import {
  DEFAULT_SHARE_SETTINGS,
  FONT_SIZE_PRESETS,
  WIDTH_PRESETS,
  type ShareSettings,
} from './settings.ts'

export interface ShareCard {
  element: HTMLElement
  dispose(): void
}

function applyStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(element.style, styles)
}

function cloneMessage(source: HTMLElement): HTMLElement {
  const clone = source.cloneNode(true) as HTMLElement
  clone.dataset.dshShareMessage = ''

  // 删除 hover 操作区，避免复制、分支和本插件按钮出现在分享图里。
  for (const hoverRoot of clone.querySelectorAll<HTMLElement>('[data-time-hover-root]')) {
    const last = hoverRoot.lastElementChild
    if (last?.querySelector('button')) last.remove()
  }
  for (const element of clone.querySelectorAll<HTMLElement>(
    'button, input, textarea, select, [data-dsh-share-button], [role="tooltip"]',
  )) {
    element.remove()
  }

  clone.removeAttribute('data-chat-anchor-key')
  clone.removeAttribute('data-chat-flow-key')
  clone.removeAttribute('data-chat-flow-kind')
  applyStyles(clone, {
    boxSizing: 'border-box',
    margin: '0',
    maxWidth: 'none',
    width: '100%',
  })
  return clone
}

function createLabel(document: Document, text: string, align: 'left' | 'right'): HTMLElement {
  const label = document.createElement('div')
  label.textContent = text
  applyStyles(label, {
    color: 'var(--dsw-alias-label-secondary, #6b7280)',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    marginBottom: '10px',
    textAlign: align,
  })
  return label
}

export function createShareCard(
  document: Document,
  content: TurnContent,
  locale: 'zh' | 'en',
  settings: ShareSettings = DEFAULT_SHARE_SETTINGS,
): ShareCard {
  const host = document.createElement('div')
  host.dataset.dshShareCardHost = ''
  applyStyles(host, {
    left: '-100000px',
    position: 'fixed',
    top: '0',
    zIndex: '-1',
  })

  const card = document.createElement('article')
  card.dataset.dshShareCard = ''
  card.style.setProperty('--dsh-share-font-size', `${FONT_SIZE_PRESETS[settings.fontSize]}px`)
  applyStyles(card, {
    background: 'var(--dsw-alias-bg-base, #f7f8fa)',
    boxSizing: 'border-box',
    color: 'var(--dsw-alias-label-primary, #111827)',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    overflowWrap: 'anywhere',
    padding: '28px 24px 24px',
    width: `${WIDTH_PRESETS[settings.width]}px`,
    wordBreak: 'break-word',
  })

  const title = document.createElement('header')
  title.textContent = locale === 'zh' ? '对话分享' : 'Conversation'
  applyStyles(title, {
    borderBottom: '1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, 0.2))',
    fontSize: '18px',
    fontWeight: '650',
    marginBottom: '24px',
    paddingBottom: '16px',
  })
  card.append(title)

  const promptSection = document.createElement('section')
  promptSection.append(createLabel(document, locale === 'zh' ? '提问' : 'QUESTION', 'right'))
  for (const prompt of content.prompts) promptSection.append(cloneMessage(prompt))
  applyStyles(promptSection, { marginBottom: '30px' })
  card.append(promptSection)

  const answerSection = document.createElement('section')
  answerSection.append(createLabel(document, locale === 'zh' ? '回答' : 'ANSWER', 'left'))
  for (const answer of content.answers) answerSection.append(cloneMessage(answer))
  card.append(answerSection)

  const footer = document.createElement('footer')
  footer.textContent = 'DeepSeek Harness'
  applyStyles(footer, {
    borderTop: '1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, 0.2))',
    color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
    fontSize: '12px',
    marginTop: '30px',
    paddingTop: '16px',
    textAlign: 'right',
  })
  card.append(footer)

  host.append(card)
  document.body.append(host)

  return {
    element: card,
    dispose: () => host.remove(),
  }
}
