export const TURN_TAIL_SELECTOR = '[data-turn-tail]'
export const TURN_FLOW_SELECTOR = '[data-chat-flow-kind="turn-tail"]'

export interface TurnContent {
  prompts: HTMLElement[]
  answers: HTMLElement[]
  tail: HTMLElement
}

export interface RenderedTurn {
  content: TurnContent
  turn: number
}

/** 立即克隆消息节点，后续滚动卸载原 DOM 也不会影响导出。 */
export function snapshotElements(elements: readonly HTMLElement[]): HTMLElement[] {
  return elements.map(element => element.cloneNode(true) as HTMLElement)
}

/**
 * 在用户勾选一轮时立即保存消息节点，避免后续滚动加载或视图切换影响导出内容。
 * tail 保留原节点引用，只用于判断会话顺序；真正渲染的问答均使用脱离页面的副本。
 */
export function snapshotTurnContent(content: TurnContent): TurnContent {
  return {
    prompts: snapshotElements(content.prompts),
    answers: snapshotElements(content.answers),
    tail: content.tail,
  }
}

/**
 * 这里集中保存当前 DSH 页面结构的假设，方便上游 DOM 调整后只改一个地方。
 * 从 turn-tail 向前回溯到本轮 user 节点，同时收集 assistant-step、tool-call 和中途 steering。
 */
export function findTurnContent(tail: HTMLElement): TurnContent | undefined {
  const flowTail = tail.closest<HTMLElement>(TURN_FLOW_SELECTOR)
  if (!flowTail) return undefined

  const prompts: HTMLElement[] = []
  const answers: HTMLElement[] = []
  let sibling = flowTail.previousElementSibling
  let foundStart = false

  while (sibling instanceof HTMLElement) {
    const kind = sibling.dataset.chatFlowKind

    if (kind === 'assistant-step' || kind === 'tool-call') {
      answers.unshift(sibling)
    } else if (kind === 'steering') {
      prompts.unshift(sibling)
    } else if (kind === 'user') {
      prompts.unshift(sibling)
      foundStart = true
      break
    } else if (kind === 'turn-tail') {
      break
    }

    sibling = sibling.previousElementSibling
  }

  if (!foundStart || prompts.length === 0 || answers.length === 0) return undefined
  return { prompts, answers, tail }
}

/** 从官方 assistant-actions 插槽渲染的按钮定位并收集当前轮内容。 */
export function findTurnContentFromAction(action: HTMLElement): TurnContent | undefined {
  const tail = action.closest<HTMLElement>(TURN_TAIL_SELECTOR)
  return tail ? findTurnContent(tail) : undefined
}

/** 收集当前会话页面中已经渲染并完成的轮次，按 DSH 原始 turn 排序。 */
export function findRenderedTurns(root: ParentNode): RenderedTurn[] {
  return [...root.querySelectorAll<HTMLElement>(TURN_TAIL_SELECTOR)]
    .map((tail): RenderedTurn | undefined => {
      const turn = Number(tail.dataset.turnTail)
      if (!Number.isFinite(turn)) return undefined
      const content = findTurnContent(tail)
      return content ? { content, turn } : undefined
    })
    .filter((item): item is RenderedTurn => item !== undefined)
    .sort((left, right) => left.turn - right.turn)
}
