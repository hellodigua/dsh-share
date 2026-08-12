// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { findActionRow, findTurnContent } from '../src/client/dom.ts'

function renderFixture(): HTMLElement {
  document.body.innerHTML = `
    <div data-chat-flow-kind="turn-tail"><div data-turn-tail="old"><div><button></button></div></div></div>
    <div data-chat-flow-kind="user" id="user"><div>问题</div></div>
    <div data-chat-flow-kind="assistant-step" id="answer-1"><div>回答一</div></div>
    <div data-chat-flow-kind="tool-call"><div>工具调用</div></div>
    <div data-chat-flow-kind="steering" id="steering"><div>补充问题</div></div>
    <div data-chat-flow-kind="assistant-step" id="answer-2"><div>回答二</div></div>
    <div data-chat-flow-kind="turn-tail"><div data-turn-tail="current"><div class="actions"><button></button></div></div></div>`
  return document.querySelector('[data-turn-tail="current"]') as HTMLElement
}

describe('DSH 对话 DOM 适配', () => {
  it('回溯并收集本轮提问、steering 和回答', () => {
    const content = findTurnContent(renderFixture())

    expect(content?.prompts.map((item) => item.id)).toEqual(['user', 'steering'])
    expect(content?.answers.map((item) => item.id)).toEqual(['answer-1', 'answer-2'])
  })

  it('找到 turn-tail 的操作按钮行', () => {
    const tail = renderFixture()
    expect(findActionRow(tail)?.className).toBe('actions')
  })
})
