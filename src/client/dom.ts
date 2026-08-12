export const TURN_TAIL_SELECTOR = '[data-turn-tail]'
export const TURN_FLOW_SELECTOR = '[data-chat-flow-kind="turn-tail"]'
export const SHARE_BUTTON_SELECTOR = '[data-dsh-share-button]'

export interface TurnContent {
  prompts: HTMLElement[]
  answers: HTMLElement[]
  tail: HTMLElement
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

/** 找到复制、分支和时间所在的按钮行。 */
export function findActionRow(tail: HTMLElement): HTMLElement | undefined {
  const candidate = tail.lastElementChild
  if (!(candidate instanceof HTMLElement)) return undefined
  if (!candidate.querySelector('button')) return undefined
  return candidate
}
