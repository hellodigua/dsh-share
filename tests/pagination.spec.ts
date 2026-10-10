// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { createShareCard } from '../src/client/card.ts'
import type { ShareMessage } from '../src/client/content.ts'
import { createSharePages } from '../src/client/pagination.ts'
import { renderShareImage } from '../src/client/preview-dialog.ts'

const toBlob = vi.hoisted(() => vi.fn())
vi.mock('html-to-image', () => ({ toBlob }))

function fixture(heights: number[], turns = heights.map((_, index) => index + 1)) {
  const messages: ShareMessage[] = heights.flatMap((height, index) => {
    const turn = turns[index]!
    const question = document.createElement('p')
    question.textContent = `question-${turn}`
    const answer = document.createElement('p')
    answer.textContent = `answer-${turn}`
    answer.dataset.testHeight = String(height)
    return [
      { elements: [question], role: 'user', turn, order: turn * 2, omittedBefore: index ? turn - turns[index - 1]! - 1 : 0 },
      { elements: [answer], role: 'assistant', turn, order: turn * 2 + 1, omittedBefore: 0 },
    ]
  })
  // jsdom 没有排版：夹具统一按100px页边距/页脚及真实组间样式模拟页高。
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const height = 100
      + Array.from(this.querySelectorAll<HTMLElement>('[data-test-height]'), node => Number(node.dataset.testHeight)).reduce((a, b) => a + b, 0)
      + Array.from(this.querySelectorAll<HTMLElement>(':scope > [data-dsh-share-message-group="user"]'), node =>
        (Number.parseFloat(node.style.marginTop) || 0) + (Number.parseFloat(node.style.paddingTop) || 0)).reduce((a, b) => a + b, 0)
      + this.querySelectorAll(':scope > [data-dsh-share-omission]').length * 50
    return new DOMRect(0, 0, 768, height)
  })
  return createShareCard(document, messages, 'zh')
}

function turnsOnPage(page: HTMLElement): string[] {
  return Array.from(page.querySelectorAll<HTMLElement>(':scope > [data-dsh-share-message-group="user"]'), node => node.dataset.dshShareTurn!)
}

afterEach(() => {
  document.body.innerHTML = ''
  toBlob.mockReset()
  vi.restoreAllMocks()
})

describe('按完整问答分页', () => {
  it.each([
    { heights: [1200, 1200, 1200, 1000], expected: [['1', '2', '3', '4']] },
    { heights: [1200, 1200, 1200, 800], expected: [['1', '2', '3', '4']] },
    { heights: [1800, 2136], expected: [['1', '2']] },
    { heights: [1800, 2137], expected: [['1', '2']] },
    { heights: [1800, 2136, 1200], expected: [['1', '2'], ['3']] },
    { heights: [1800, 2135.5, 1200], expected: [['1', '2', '3']] },
    { heights: [2662, 2896, 2142], expected: [['1', '2'], ['3']] },
    { heights: [9000], expected: [['1']] },
    { heights: [215, 4003], expected: [['1', '2']] },
    { heights: [500, 3900, 10, 5000], expected: [['1', '2'], ['3', '4']] },
    { heights: [500, 9000, 700, 800], expected: [['1', '2'], ['3', '4']] },
    { heights: [9000, 500, 9000, 500], expected: [['1'], ['2', '3', '4']] },
    { heights: [500, 9000, 500], expected: [['1', '2', '3']] },
    { heights: [923, 5000], expected: [['1', '2']] },
    { heights: [924, 5000], expected: [['1', '2']] },
    { heights: [5000, 923], expected: [['1', '2']] },
    { heights: [5000, 924], expected: [['1'], ['2']] },
    { heights: [500], expected: [['1']] },
    { heights: [5000, 6000], expected: [['1'], ['2']] },
  ])('顺序装入并保留超长单组：$heights', async ({ heights, expected }) => {
    const card = fixture(heights)
    const before = card.element.outerHTML
    const pages = await createSharePages(card.element)
    try {
      expect(pages.elements.map(turnsOnPage)).toEqual(expected)
      for (const page of pages.elements) {
        const turns = turnsOnPage(page)
        expect(page.querySelectorAll(':scope > [data-dsh-share-message-group="assistant"]')).toHaveLength(turns.length)
        if (pages.elements.length > 1 && turns.length === 1) {
          expect(page.getBoundingClientRect().height).toBeGreaterThanOrEqual(1024)
        }
        expect(page.querySelectorAll(':scope > footer')).toHaveLength(1)
        expect(page.style.padding).toBe(card.element.style.padding)
        expect(page.style.width).toBe(card.element.style.width)
        expect(page.style.transform).toBe('')
        expect(page.style.overflow).not.toBe('hidden')
      }
      expect(pages.elements.flatMap(page => Array.from(page.querySelectorAll('[data-dsh-share-message]'), node => node.textContent)))
        .toEqual(Array.from(card.element.querySelectorAll('[data-dsh-share-message]'), node => node.textContent))
      expect(card.element.outerHTML).toBe(before)
    } finally {
      pages.dispose()
    }
    expect(card.element.parentElement!.children).toHaveLength(1)
  })

  it('末尾短页并入前页后恢复真实组间分隔，并只保留一个页脚', async () => {
    const card = fixture([5000, 500])
    const second = card.element.querySelector<HTMLElement>('[data-dsh-share-turn="2"]')!
    const before = second.getAttribute('style')
    const pages = await createSharePages(card.element)
    try {
      expect(pages.elements.map(turnsOnPage)).toEqual([['1', '2']])
      expect(pages.elements[0]!.querySelector('[data-dsh-share-turn="2"]')!.getAttribute('style')).toBe(before)
      expect(pages.elements[0]!.querySelectorAll(':scope > footer')).toHaveLength(1)
      expect(pages.elements[0]!.getBoundingClientRect().height).toBe(5660)
    } finally {
      pages.dispose()
    }
  })

  it('短组向前或向后合并均保留真正的省略标记', async () => {
    const card = fixture([500, 9000, 500], [1, 4, 8])
    const pages = await createSharePages(card.element)
    try {
      expect(pages.elements.map(turnsOnPage)).toEqual([['1', '4', '8']])
      expect(pages.elements[0]!.querySelectorAll('[data-dsh-share-omission]')).toHaveLength(2)
      expect(pages.elements[0]!.querySelectorAll(':scope > footer')).toHaveLength(1)
    } finally {
      pages.dispose()
    }
  })

  it('分页首组移除组间分隔，并保留同一问答内部间距', async () => {
    const card = fixture([2500, 2500, 1200])
    const pages = await createSharePages(card.element)
    try {
      expect(pages.elements.map(page => page.getBoundingClientRect().height)).toEqual([5160, 1300])
      const first = pages.elements[1]!.firstElementChild as HTMLElement
      expect(first.style.marginTop).toBe('0px')
      expect(first.style.paddingTop).toBe('0px')
      expect(first.style.borderTopWidth).toBe('0px')
      expect((first.nextElementSibling as HTMLElement).style.marginTop).toBe('30px')
      expect(pages.elements[1]!.querySelector('[data-dsh-share-omission]')).toBeNull()
    } finally {
      pages.dispose()
    }
  })

  it('真正的省略标记只随下一组移动，页脚和主题随每页保留', async () => {
    const card = fixture([4100, 2100], [1, 4])
    card.element.style.setProperty('--dsw-alias-label-primary', '#eeeeee')
    const pages = await createSharePages(card.element)
    try {
      expect(pages.elements.map(turnsOnPage)).toEqual([['1'], ['4']])
      expect(pages.elements.map(page => page.querySelectorAll('[data-dsh-share-omission]').length)).toEqual([0, 1])
      expect(pages.elements[1]!.firstElementChild!.hasAttribute('data-dsh-share-omission')).toBe(true)
      for (const page of pages.elements) {
        expect(page.style.getPropertyValue('--dsw-alias-label-primary')).toBe('#eeeeee')
        expect(page.querySelector('[data-dsh-share-badge]')!.textContent).toBe('HARNESS')
      }
    } finally {
      pages.dispose()
    }
  })

  it('有未知顶层内容时完整导出，不遗漏内容或猜测切口', async () => {
    const card = fixture([2500, 2500])
    const header = document.createElement('header')
    header.textContent = 'extra content'
    card.element.prepend(header)
    const pages = await createSharePages(card.element)
    try {
      expect(pages.elements).toHaveLength(1)
      expect(pages.elements[0]!.textContent).toBe(card.element.textContent)
    } finally {
      pages.dispose()
    }
  })

  it('等待图片解码完成后再测量，并移动同一个已解码节点', async () => {
    const card = fixture([2800, 1000])
    const image = document.createElement('img')
    image.setAttribute('loading', 'lazy')
    card.element.querySelector('[data-dsh-share-message]')!.append(image)
    let finish!: () => void
    const decoded: HTMLImageElement[] = []
    const decode = vi.fn(function (this: HTMLImageElement) {
      decoded.push(this)
      return new Promise<void>(resolve => { finish = () => { this.dataset.testHeight = '1400'; resolve() } })
    })
    Object.defineProperty(HTMLImageElement.prototype, 'decode', { configurable: true, value: decode })
    try {
      const pending = createSharePages(card.element)
      expect(decode).toHaveBeenCalledOnce()
      expect(decoded[0]!.getAttribute('loading')).toBe('eager')
      expect(image.getAttribute('loading')).toBe('lazy')
      finish()
      const pages = await pending
      try {
        expect(pages.elements.map(turnsOnPage)).toEqual([['1'], ['2']])
        expect(pages.elements[0]!.querySelector('img')).toBe(decoded[0])
      } finally {
        pages.dispose()
      }
    } finally {
      delete (HTMLImageElement.prototype as Partial<HTMLImageElement>).decode
    }
  })

  it('测量抛错时清理所有临时页并保留原卡片', async () => {
    const card = fixture([2500, 2500])
    vi.mocked(HTMLElement.prototype.getBoundingClientRect).mockImplementationOnce(() => { throw new Error('layout failed') })
    await expect(createSharePages(card.element)).rejects.toThrow('layout failed')
    expect(card.element.parentElement!.children).toHaveLength(1)
  })

  it('按页实际高度编码，超高组只生成一张完整图片', async () => {
    const card = fixture([500, 9000, 700, 800])
    toBlob.mockImplementation(async () => new Blob(['png']))
    const result = await renderShareImage(card.element)
    expect(result).toHaveLength(2)
    expect(toBlob.mock.calls.map(([, options]) => options.height)).toEqual([9660, 1660])
    for (const [, options] of toBlob.mock.calls) expect(options).toMatchObject({ width: 768, pixelRatio: 2, skipAutoScale: true })
    expect(card.element.parentElement!.children).toHaveLength(1)
  })

  it('后续页编码失败不返回部分结果，并清理所有页', async () => {
    const card = fixture([4100, 2500])
    toBlob.mockResolvedValueOnce(new Blob(['png'])).mockResolvedValueOnce(null)
    await expect(renderShareImage(card.element)).rejects.toThrow('complete image')
    expect(toBlob.mock.calls.map(([, options]) => options.pixelRatio)).toEqual([2, 2, 1, 0.5])
    expect(card.element.parentElement!.children).toHaveLength(1)
  })
})
