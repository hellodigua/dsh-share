import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'
import type { ShareMessage } from './content.ts'
import { cloneShareMessage, visibleAssistantElements } from './card.ts'
import type { ShareSettings } from './settings.ts'

function createConverter(): TurndownService {
  const converter = new TurndownService({
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    headingStyle: 'atx',
    strongDelimiter: '**',
  })
  converter.use(gfm)
  converter.addRule('dsh-tool-summary', {
    filter: node => node.hasAttribute('data-dsh-share-tool-summary'),
    replacement: (_content, node) => {
      // 图片保留原生摘要行的 DOM；Markdown 单独为相邻字段补上可读分隔符。
      const parts = [...node.children]
        .map(child => child.textContent?.replace(/\s+/g, ' ').trim() ?? '')
        .filter(Boolean)
      const summary = parts.length > 0
        ? parts.join(' · ')
        : node.textContent?.replace(/\s+/g, ' ').trim() ?? ''
      const body = summary.replace(/^/gm, '> ')
      return body ? `\n\n${body}\n\n` : ''
    },
  })
  converter.addRule('dsh-reasoning', {
    filter: node => node.getAttribute('data-variant') === 'think',
    replacement: content => {
      const body = content.trim().replace(/^/gm, '> ')
      return body ? `\n\n${body}\n\n` : ''
    },
  })
  return converter
}

function convertMessages(
  converter: TurndownService,
  messages: readonly HTMLElement[],
  locale: 'zh' | 'en',
  hideReasoning = false,
): string {
  return messages
    .map(message => converter.turndown(cloneShareMessage(message, locale, hideReasoning)).trim())
    .filter(Boolean)
    .join('\n\n')
}

/** 将与 PNG 相同的可见内容导出为按原会话顺序排列的 GFM Markdown。 */
export function createShareMarkdown(
  messages: readonly ShareMessage[],
  locale: 'zh' | 'en',
  settings: ShareSettings,
): string {
  const converter = createConverter()
  const parts = [locale === 'zh' ? '# 对话分享' : '# Shared conversation']

  for (const message of messages) {
    if (message.omittedBefore > 0) {
      parts.push(locale === 'zh'
        ? `> 中间省略 ${message.omittedBefore} 组对话`
        : `> ${message.omittedBefore} conversation ${message.omittedBefore === 1 ? 'group was' : 'groups were'} omitted`)
    }

    const elements = message.role === 'assistant'
      ? visibleAssistantElements(message.elements, settings.hideProcess)
      : message.elements
    const content = convertMessages(
      converter,
      elements,
      locale,
      message.role === 'assistant' && settings.hideProcess,
    )
    parts.push(`${message.role === 'user'
      ? locale === 'zh' ? '## 用户' : '## User'
      : '## DeepSeek'}\n\n${content}`)
    parts.push('---')
  }

  if (parts.at(-1) === '---') parts.pop()
  return `${parts.join('\n\n')}\n`
}
