// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { findTurnContent, findTurnContentFromAction } from '../src/client/dom.ts'
import { visibleAssistantElements, cloneShareMessage } from '../src/client/card.ts'

function renderFixture(): HTMLElement {
  document.body.innerHTML = `
    <div data-chat-flow-kind="turn-tail"><div data-turn-tail="old"><div><button></button></div></div></div>
    <div data-chat-flow-kind="user" id="user"><div>问题</div></div>
    <div data-chat-flow-kind="assistant-step" id="answer-1"><div>回答一</div></div>
    <div data-chat-flow-kind="tool-call" id="tool-call"><div>工具调用</div></div>
    <div data-chat-flow-kind="steering" id="steering"><div>补充问题</div></div>
    <div data-chat-flow-kind="assistant-step" id="answer-2"><div>回答二</div></div>
    <div data-chat-flow-kind="turn-tail"><div data-turn-tail="current"><div class="actions"><button></button></div></div></div>`
  return document.querySelector('[data-turn-tail="current"]') as HTMLElement
}

describe('DSH 对话 DOM 适配', () => {
  it.each(['compact', 'standard', 'detailed', 'verbose'])('收集 %s 视图中的嵌套过程与独立回答，不重复导出', mode => {
    document.body.innerHTML = `
      <div data-chat-flow-kind="user" id="user">问题</div>
      <div data-step-process data-chat-group-key="process" hidden="until-found">
        <button>过程摘要，不属于消息</button>
        <div data-step-process-body hidden="until-found"><div data-step-process-content data-chat-flow>
          <div data-chat-flow-kind="assistant-step" data-chat-group-part="reasoning" id="reasoning"><div data-variant="think">思考</div></div>
          <div data-chat-flow-kind="tool-call" id="tool"><div data-disclosure-row>工具摘要</div></div>
        </div></div>
      </div>
      <div data-chat-flow-kind="assistant-step" data-chat-group-part="response" id="response">最终回答</div>
      <div data-chat-flow-kind="turn-tail"><div data-turn-tail="1"><button>分享</button></div></div>`
    if (mode === 'compact') {
      document.querySelector<HTMLElement>('#reasoning')!.dataset.turnProcessMember = 'true'
      document.querySelector<HTMLElement>('#response')!.dataset.turnProcessAnswer = 'true'
    }
    const tail = document.querySelector<HTMLElement>('[data-turn-tail]')!
    const content = findTurnContent(tail)!
    expect(content.answers.map(item => item.id)).toEqual(['reasoning', 'tool', 'response'])
    expect(visibleAssistantElements(content.answers, true).map(item => item.id)).toEqual(['response'])
    const text = content.answers.map(item => cloneShareMessage(item, 'zh').textContent).join(' ')
    expect(text).toBe('思考 工具摘要 最终回答')
  })

  it('回溯并收集本轮提问、steering、回答和工具调用', () => {
    const content = findTurnContent(renderFixture())

    expect(content?.prompts.map((item) => item.id)).toEqual(['user', 'steering'])
    expect(content?.answers.map((item) => item.id)).toEqual(['answer-1', 'tool-call', 'answer-2'])
  })

  it('从官方操作插槽中的按钮找到当前轮内容', () => {
    const tail = renderFixture()
    const action = document.createElement('button')
    tail.querySelector('.actions')?.append(action)

    const content = findTurnContentFromAction(action)
    expect(content?.tail).toBe(tail)
    expect(content?.answers.map(item => item.id)).toEqual(['answer-1', 'tool-call', 'answer-2'])
  })
})
