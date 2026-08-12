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
    expect(card.element.textContent).not.toContain('复制')
    expect(card.element.querySelector('button')).toBeNull()
    card.dispose()
    expect(document.querySelector('[data-dsh-share-card-host]')).toBeNull()
  })

  it('按预设设置图片宽度和正文基准字号', () => {
    const prompt = document.createElement('div')
    prompt.textContent = '问题'
    const answer = document.createElement('div')
    answer.textContent = '回答'
    const content: TurnContent = { prompts: [prompt], answers: [answer], tail: document.createElement('div') }

    const card = createShareCard(document, content, 'zh', { width: 'tablet', fontSize: 'large' })

    expect(card.element.style.width).toBe('520px')
    expect(card.element.style.getPropertyValue('--dsh-share-font-size')).toBe('18px')
    expect(card.element.querySelectorAll('[data-dsh-share-message]')).toHaveLength(2)
    card.dispose()
  })
})
