// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { createShareCard } from '../src/client/card.ts'
import type { TurnContent } from '../src/client/dom.ts'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('分享图片卡片', () => {
  it('克隆问答内容并移除原消息操作按钮', () => {
    const prompt = document.createElement('div')
    prompt.innerHTML = '<div data-time-hover-root><p>测试问题</p><div><button>复制</button></div></div>'
    const answer = document.createElement('div')
    answer.innerHTML = '<article><p>测试回答</p><button>代码复制</button></article>'
    const content: TurnContent = { prompts: [prompt], answers: [answer], tail: document.createElement('div') }

    const card = createShareCard(document, content, 'zh')

    expect(card.element.textContent).toContain('测试问题')
    expect(card.element.textContent).toContain('测试回答')
    expect(card.element.textContent).not.toContain('提问')
    expect(card.element.textContent).not.toContain('复制')
    expect(card.element.textContent).not.toContain('对话分享')
    expect(card.element.querySelector('header')).toBeNull()
    expect(card.element.querySelector('button')).toBeNull()
    const sections = card.element.querySelectorAll(':scope > section')
    expect(sections).toHaveLength(2)
    expect(sections[0]?.childElementCount).toBe(1)
    expect(sections[1]?.childElementCount).toBe(1)
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
    const content: TurnContent = {
      prompts: [prompt],
      answers: [toolCall, answer],
      tail: document.createElement('div'),
    }

    const card = createShareCard(document, content, 'zh')

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
    const content: TurnContent = {
      prompts: [prompt],
      answers: [toolCall, answer],
      tail: document.createElement('div'),
    }

    const card = createShareCard(document, content, 'zh')

    expect(card.element.textContent).toContain('Bash')
    expect(card.element.textContent).toContain('List project files')
    expect(card.element.textContent).not.toContain('secret terminal output')
    expect(card.element.textContent).not.toContain('Inspect')
    card.dispose()
  })

  it('按预设设置图片宽度和正文基准字号', () => {
    const prompt = document.createElement('div')
    prompt.textContent = '问题'
    const answer = document.createElement('div')
    answer.textContent = '回答'
    const content: TurnContent = { prompts: [prompt], answers: [answer], tail: document.createElement('div') }

    const card = createShareCard(document, content, 'zh', { width: 'tablet', fontSize: 'large' })

    expect(card.element.style.width).toBe('768px')
    expect(card.element.style.getPropertyValue('--dsh-share-font-size')).toBe('18px')
    expect(card.element.querySelectorAll('[data-dsh-share-message]')).toHaveLength(2)
    expect(card.element.querySelector('[data-dsh-share-wordmark]')?.textContent).toContain('deepseek')
    expect(card.element.querySelector('footer')?.style.justifyContent).toBe('center')
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
    const content: TurnContent = { prompts: [prompt], answers: [answer], tail: document.createElement('div') }

    const card = createShareCard(document, content, 'zh')
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
