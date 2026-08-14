// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { createShareMarkdown } from '../src/client/markdown.ts'
import type { ShareMessage } from '../src/client/content.ts'

function user(turn: number, order: number, omittedBefore = 0): ShareMessage {
  const prompt = document.createElement('div')
  prompt.innerHTML = `<p>问题 ${turn}</p><ul><li>列表项</li></ul>`
  prompt.dataset.chatFlowKind = 'user'
  return { elements: [prompt], omittedBefore, order, role: 'user', turn }
}

function assistant(turn: number, order: number, omittedBefore = 0, process = false): ShareMessage {
  const intermediate = document.createElement('div')
  intermediate.dataset.chatFlowKind = 'assistant-step'
  intermediate.innerHTML = '<div data-variant="think">Think 过程</div><p>中间回答</p>'
  const tool = document.createElement('div')
  tool.dataset.chatFlowKind = 'tool-call'
  tool.innerHTML = '<div data-disclosure-row><span>Bash</span><span>pnpm test</span></div>'
  const answer = document.createElement('div')
  answer.dataset.chatFlowKind = 'assistant-step'
  answer.innerHTML = `<article><p>回答 ${turn}</p><pre><code class="language-ts">const value = ${turn}</code></pre></article>`
  return {
    elements: process ? [intermediate, tool, answer] : [answer],
    omittedBefore,
    order,
    role: 'assistant',
    turn,
  }
}

describe('Markdown 导出', () => {
  it('按问答组保留角色、列表、代码块和工具摘要，并标记不连续选择', () => {
    const markdown = createShareMarkdown([
      user(1, 2),
      assistant(1, 3, 0, true),
      user(3, 6, 1),
      assistant(3, 7),
    ], 'zh', { width: 'tablet', fontSize: 'normal', hideProcess: false })

    expect(markdown).toContain('# 对话分享')
    expect(markdown.match(/## 用户/g)).toHaveLength(2)
    expect(markdown.match(/## DeepSeek/g)).toHaveLength(2)
    expect(markdown).toMatch(/-\s+列表项/)
    expect(markdown).toContain('```ts')
    expect(markdown).toContain('> Bash · pnpm test')
    expect(markdown).toContain('> 中间省略 1 组对话')
    expect(markdown.indexOf('问题 1')).toBeLessThan(markdown.indexOf('回答 3'))
  })

  it('底层转换器仍能处理单独的用户或回答片段', () => {
    const onlyUser = createShareMarkdown([
      user(2, 4),
    ], 'zh', { width: 'tablet', fontSize: 'normal', hideProcess: false })
    const onlyAssistant = createShareMarkdown([
      assistant(2, 5),
    ], 'zh', { width: 'tablet', fontSize: 'normal', hideProcess: false })

    expect(onlyUser).toContain('## 用户')
    expect(onlyUser).not.toContain('## DeepSeek')
    expect(onlyAssistant).toContain('## DeepSeek')
    expect(onlyAssistant).not.toContain('## 用户')
  })

  it('不展示过程时同步移除 Think、工具调用和中间回答', () => {
    const markdown = createShareMarkdown([
      assistant(1, 3, 0, true),
    ], 'zh', { width: 'tablet', fontSize: 'normal', hideProcess: true })

    expect(markdown).toContain('回答 1')
    expect(markdown).not.toContain('Think')
    expect(markdown).not.toContain('Bash')
    expect(markdown).not.toContain('中间回答')
  })
})
