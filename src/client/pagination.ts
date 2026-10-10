const PAGE_HEIGHT = 4096
const SHORT_PAGE_HEIGHT = 1024

interface SharePages {
  elements: HTMLElement[]
  dispose(): void
}

/** 只在已知的问答边界分组，省略标记随下一轮一起移动。 */
function collectTurnGroups(card: HTMLElement, footer: HTMLElement): HTMLElement[][] {
  const groups: HTMLElement[][] = []
  let previousTurn: string | undefined
  let pending: HTMLElement[] = []
  for (const child of Array.from(card.children) as HTMLElement[]) {
    if (child === footer) continue
    if (child.hasAttribute('data-dsh-share-omission')) {
      pending.push(child)
      continue
    }
    const turn = child.dataset.dshShareTurn
    if (turn === undefined || !child.hasAttribute('data-dsh-share-message-group')) return []
    if (turn !== previousTurn) groups.push([])
    groups.at(-1)!.push(...pending, child)
    pending = []
    previousTurn = turn
  }
  return pending.length ? [] : groups
}

/** 新页首组不显示组间分隔线；真正的内容省略标记仍保留。 */
function resetPageStart(group: HTMLElement[]): void {
  const first = group[0]!
  if (!first.hasAttribute('data-dsh-share-message-group')) return
  Object.assign(first.style, { borderTop: '0', marginTop: '0', paddingTop: '0' })
}

/** 以完整问答顺序分页；孤立短组合并相邻页，超高内容不裁切。 */
export async function createSharePages(element: HTMLElement): Promise<SharePages> {
  const copy = element.cloneNode(true) as HTMLElement
  copy.style.margin = '0'
  element.after(copy)
  const temporary = [copy]
  const dispose = () => temporary.forEach(page => page.remove())
  try {
    // 测量前等待图片及字体稳定；移动已解码节点，避免分页后图片高度变化。
    await Promise.all([
      element.ownerDocument.fonts?.ready,
      ...Array.from(copy.querySelectorAll('img'), image => {
        image.setAttribute('loading', 'eager')
        return image.decode?.().catch(() => {})
      }),
    ])
    const footer = copy.querySelector<HTMLElement>(':scope > footer')
    if (!copy.hasAttribute('data-dsh-share-card') || !footer
      || Math.ceil(copy.getBoundingClientRect().height) <= PAGE_HEIGHT) {
      return { elements: [copy], dispose }
    }
    const groups = collectTurnGroups(copy, footer)
    if (groups.length < 2) return { elements: [copy], dispose }

    const starts = new Map(groups.map(group => [group[0]!, group[0]!.getAttribute('style')]))
    const pages: { element: HTMLElement, groups: HTMLElement[][] }[] = []
    const newPage = () => {
      const element = copy.cloneNode(false) as HTMLElement
      element.append(footer.cloneNode(true))
      temporary.at(-1)!.after(element)
      temporary.push(element)
      const page = { element, groups: [] as HTMLElement[][] }
      pages.push(page)
      return page
    }
    let page = newPage()
    for (const group of groups) {
      // 当前页达到目标后才换页；不足目标时继续接纳下一完整问答。
      if (page.groups.length && page.element.getBoundingClientRect().height >= PAGE_HEIGHT) {
        page = newPage()
      }
      if (!page.groups.length) resetPageStart(group)
      page.element.lastElementChild!.before(...group)
      page.groups.push(group)
    }

    for (let index = 0; index < pages.length && pages.length > 1; index++) {
      const current = pages[index]!
      if (current.groups.length !== 1
        || current.element.getBoundingClientRect().height >= SHORT_PAGE_HEIGHT) continue
      // 优先合并后一整页；末尾孤立短组并入前页，保持对话顺序。
      const targetIndex = Math.min(index, pages.length - 2)
      const target = pages[targetIndex]!
      const following = pages[targetIndex + 1]!
      const first = following.groups[0]![0]!
      const style = starts.get(first)
      // 新页首重新成为组间边界时，恢复原分隔线或省略标记的样式。
      if (style == null) first.removeAttribute('style')
      else first.setAttribute('style', style)
      target.element.lastElementChild!.before(...following.groups.flat())
      target.groups.push(...following.groups)
      following.element.remove()
      pages.splice(targetIndex + 1, 1)
    }
    return { elements: pages.map(page => page.element), dispose }
  } catch (error) {
    dispose()
    throw error
  }
}
