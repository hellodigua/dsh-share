// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { createShareCard } from '../src/client/card.ts'
import type { ShareMessage } from '../src/client/content.ts'

function pair(
  prompt: HTMLElement,
  answers: HTMLElement[],
  turn = 1,
): ShareMessage[] {
  return [
    { elements: [prompt], omittedBefore: 0, order: turn * 2, role: 'user', turn },
    { elements: answers, omittedBefore: 0, order: turn * 2 + 1, role: 'assistant', turn },
  ]
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('分享图片卡片', () => {
  it('按用户消息和回答消息分别克隆内容，并移除原消息操作按钮', () => {
    const prompt = document.createElement('div')
    prompt.innerHTML = '<div data-time-hover-root><p>测试问题</p><div><button>复制</button></div></div>'
    const answer = document.createElement('div')
    answer.innerHTML = '<article><p>测试回答</p><button>代码复制</button></article>'

    const card = createShareCard(document, pair(prompt, [answer]), 'zh')

    expect(card.element.textContent).toContain('测试问题')
    expect(card.element.textContent).toContain('测试回答')
    expect(card.element.textContent).not.toContain('提问')
    expect(card.element.textContent).not.toContain('复制')
    expect(card.element.textContent).not.toContain('对话分享')
    expect(card.element.querySelector('header')).toBeNull()
    expect(card.element.querySelector('button')).toBeNull()
    expect(card.element.querySelectorAll(':scope > [data-dsh-share-turn]')).toHaveLength(2)
    expect(card.element.querySelector('[data-dsh-share-message-group="user"]')?.childElementCount).toBe(1)
    expect(card.element.querySelector('[data-dsh-share-message-group="assistant"]')?.childElementCount).toBe(1)
    card.dispose()
    expect(document.querySelector('[data-dsh-share-card-host]')).toBeNull()
  })

  it('保留工具调用摘要和文件路径，但移除展开内容', () => {
    const prompt = document.createElement('div')
    prompt.textContent = '问题'
    const toolCall = document.createElement('div')
    toolCall.dataset.chatFlowKind = 'tool-call'
    toolCall.innerHTML = `
      <div data-chat-call-id="call-1">
        <div data-variant="read" data-open>
          <div>
            <div data-disclosure-row data-expandable role="button" tabindex="0" aria-expanded="true">
              <span>Read</span><button class="file-link">src/main.ts</button>
            </div>
            <div><p>不应出现在分享图中的完整文件内容</p><button>Inspect</button></div>
          </div>
        </div>
      </div>`
    const answer = document.createElement('div')
    answer.textContent = '最终回答'

    const card = createShareCard(document, pair(prompt, [toolCall, answer]), 'zh')

    expect(card.element.textContent).toContain('Read')
    expect(card.element.textContent).toContain('src/main.ts')
    expect(card.element.textContent).toContain('最终回答')
    expect(card.element.textContent).not.toContain('完整文件内容')
    expect(card.element.textContent).not.toContain('Inspect')
    expect(card.element.querySelector('button')).toBeNull()
    expect(card.element.querySelector('[data-open]')).toBeNull()
    expect(card.element.querySelector('[data-dsh-share-tool-call]')).not.toBeNull()
    card.dispose()
  })

  it('保留 Bash 摘要，但移除展开的终端输出', () => {
    const prompt = document.createElement('div')
    prompt.textContent = '问题'
    const toolCall = document.createElement('div')
    toolCall.dataset.chatFlowKind = 'tool-call'
    toolCall.innerHTML = `
      <div data-chat-call-id="call-2">
        <div class="bash-card">
          <div data-sample="bash" data-variant="bash" data-expandable role="button" aria-expanded="true">
            <span>Bash</span><span>List project files</span>
          </div>
          <div data-terminal><pre>secret terminal output</pre><button>Inspect</button></div>
        </div>
      </div>`
    const answer = document.createElement('div')
    answer.textContent = '最终回答'

    const card = createShareCard(document, pair(prompt, [toolCall, answer]), 'zh')

    expect(card.element.textContent).toContain('Bash')
    expect(card.element.textContent).toContain('List project files')
    expect(card.element.textContent).not.toContain('secret terminal output')
    expect(card.element.textContent).not.toContain('Inspect')
    card.dispose()
  })

  it('隐藏过程时只过滤回答消息，用户消息保持不变', () => {
    const prompt = document.createElement('div')
    prompt.dataset.chatFlowKind = 'user'
    prompt.textContent = '用户问题'
    const intermediate = document.createElement('div')
    intermediate.dataset.chatFlowKind = 'assistant-step'
    intermediate.innerHTML = '<div data-variant="think">Think 一</div><p>正在处理</p>'
    const toolCall = document.createElement('div')
    toolCall.dataset.chatFlowKind = 'tool-call'
    toolCall.innerHTML = '<div data-disclosure-row><span>Bash</span><span>pnpm test</span></div>'
    const finalAnswer = document.createElement('div')
    finalAnswer.dataset.chatFlowKind = 'assistant-step'
    finalAnswer.innerHTML = '<div data-variant="think">Think 二</div><article>最终回答</article>'

    const card = createShareCard(document, pair(prompt, [intermediate, toolCall, finalAnswer]), 'zh', {
      width: 'tablet', fontSize: 'normal', hideProcess: true,
    })

    expect(card.element.textContent).toContain('用户问题')
    expect(card.element.textContent).toContain('最终回答')
    expect(card.element.textContent).not.toContain('正在处理')
    expect(card.element.textContent).not.toContain('Think')
    expect(card.element.textContent).not.toContain('Bash')
    expect(card.element.querySelector('[data-variant="think"]')).toBeNull()
    expect(card.element.querySelector('[data-dsh-share-tool-call]')).toBeNull()
    card.dispose()
  })

  it('按预设设置图片宽度和正文基准字号', () => {
    const prompt = document.createElement('div')
    prompt.textContent = '问题'
    const answer = document.createElement('div')
    answer.textContent = '回答'

    const card = createShareCard(document, pair(prompt, [answer]), 'zh', {
      width: 'tablet', fontSize: 'large', hideProcess: false,
    })

    expect(card.element.style.width).toBe('768px')
    expect(card.element.style.getPropertyValue('--dsh-share-font-size')).toBe('18px')
    expect(card.element.querySelectorAll('[data-dsh-share-message]')).toHaveLength(2)
    expect(card.element.querySelector('[data-dsh-share-wordmark]')?.textContent).toContain('deepseek')
    expect(card.element.querySelector('footer')?.style.justifyContent).toBe('center')
    card.dispose()
  })

  it('按会话顺序渲染不连续的完整问答组，并插入省略标记', () => {
    const firstPrompt = document.createElement('div')
    firstPrompt.textContent = '问题 一'
    const firstAnswer = document.createElement('div')
    firstAnswer.textContent = '回答 一'
    const thirdPrompt = document.createElement('div')
    thirdPrompt.textContent = '问题 三'
    const thirdAnswer = document.createElement('div')
    thirdAnswer.dataset.chatFlowKind = 'assistant-step'
    thirdAnswer.textContent = '回答 三'

    const card = createShareCard(document, [
      { elements: [firstPrompt], omittedBefore: 0, order: 2, role: 'user', turn: 1 },
      { elements: [firstAnswer], omittedBefore: 0, order: 3, role: 'assistant', turn: 1 },
      { elements: [thirdPrompt], omittedBefore: 1, order: 6, role: 'user', turn: 3 },
      { elements: [thirdAnswer], omittedBefore: 0, order: 7, role: 'assistant', turn: 3 },
    ], 'zh')

    const text = card.element.textContent ?? ''
    expect(text.indexOf('问题 一')).toBeLessThan(text.indexOf('回答 三'))
    expect(card.element.querySelectorAll('[data-dsh-share-turn]')).toHaveLength(4)
    expect(card.element.querySelector('[data-dsh-share-omission]')?.textContent).toBe('···')
    expect(card.element.querySelectorAll('footer')).toHaveLength(1)
    card.dispose()
  })

  it('复用页面侧边栏的完整品牌字标', () => {
    document.body.innerHTML = `
      <svg id="sidebar-wordmark" style="--dsw-alias-label-primary-inverted:rgb(250, 250, 250)" viewBox="0 0 182 24">
        <path d="M0 0h24v24z"/>
      </svg>`
    const prompt = document.createElement('div')
    prompt.textContent = '问题'
    const answer = document.createElement('div')
    answer.textContent = '回答'

    const card = createShareCard(document, pair(prompt, [answer]), 'zh')
    const wordmark = card.element.querySelector<SVGSVGElement>('[data-dsh-share-wordmark] svg')

    expect(wordmark?.getAttribute('viewBox')).toBe('0 0 182 24')
    expect(wordmark?.getAttribute('id')).toBe('sidebar-wordmark')
    expect(wordmark?.getAttribute('width')).toBe('137')
    expect(wordmark?.getAttribute('height')).toBe('18')
    expect(wordmark?.parentElement?.style.getPropertyValue('--dsw-alias-label-primary-inverted'))
      .toBe('rgb(250, 250, 250)')
    card.dispose()
  })
})
