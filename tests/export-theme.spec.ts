// @vitest-environment jsdom
import { afterEach, expect, it } from 'vitest'
import { snapshotElements } from '../src/client/dom.ts'
import { createShareCard } from '../src/client/card.ts'

afterEach(() => { document.body.innerHTML = ''; document.body.removeAttribute('style') })

it('快照保留完整配色，源节点移除及宿主变色后导出仍使用同套主题', () => {
  const source = document.createElement('div')
  source.style.cssText = '--dsw-alias-label-primary:#eee;--dsw-alias-bg-base:#15171b;--dsw-alias-link:#abcdef;--dsw-font-size:40px;width:900px'
  document.body.append(source)
  const snapshots = snapshotElements([source])
  // 不把测试源元素自带的内联变量误认为主题快照机制。
  snapshots[0]!.removeAttribute('style')
  source.remove()
  document.body.style.cssText = '--dsw-alias-label-primary:#000;--dsw-alias-bg-base:#fff'
  const card = createShareCard(document, [{ elements: snapshots, role: 'assistant', turn: 1, order: 1, omittedBefore: 0 }], 'zh', { width: 'phone', fontSize: 'xlarge', hideProcess: false })
  expect(card.element.style.getPropertyValue('--dsw-alias-label-primary')).toBe('#eee')
  expect(card.element.style.backgroundColor).toBe('rgb(21, 23, 27)')
  expect(card.element.style.getPropertyValue('--dsw-alias-link')).toBe('#abcdef')
  expect(card.element.style.getPropertyValue('--dsw-font-size')).toBe('')
  expect(card.element.style.width).toBe('375px')
  expect(card.element.style.getPropertyValue('--dsh-share-font-size')).toBe('20px')
  card.dispose()
})

it('缺少背景时不复制半套主题，也不修改原节点', () => {
  const source = document.createElement('div')
  source.style.setProperty('--dsw-alias-label-primary', '#eee')
  document.body.append(source)
  const before = source.outerHTML
  const snapshots = snapshotElements([source])
  snapshots[0]!.removeAttribute('style')
  const card = createShareCard(document, [{ elements: snapshots, role: 'assistant', turn: 1, order: 1, omittedBefore: 0 }], 'zh')
  expect(card.element.style.getPropertyValue('--dsw-alias-label-primary')).toBe('')
  expect(source.outerHTML).toBe(before)
  card.dispose()
})

it('透明局部暗色主题在捕获时确定不透明底色', () => {
  const source = document.createElement('div')
  source.style.cssText = '--dsw-alias-label-primary:#eee;--dsw-alias-bg-base:transparent;color-scheme:dark'
  document.body.append(source)
  const snapshots = snapshotElements([source])
  source.remove()
  const card = createShareCard(document, [{ elements: snapshots, role: 'assistant', turn: 1, order: 1, omittedBefore: 0 }], 'zh')
  expect(card.element.style.backgroundColor).toBe('rgb(21, 21, 23)')
  card.dispose()
})
