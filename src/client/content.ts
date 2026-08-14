import type { TurnContent } from './dom.ts'

export type ShareMessageRole = 'user' | 'assistant'

/** 一条进入图片和 Markdown 导出器的稳定消息。 */
export interface ShareMessage {
  elements: HTMLElement[]
  /** 与上一组所选问答之间省略的完整问答数量。 */
  omittedBefore: number
  /** 在当前会话消息中的稳定顺序。 */
  order: number
  role: ShareMessageRole
  turn: number
}

/** 选择模式保存的一轮完整问答；用户消息和回答始终关联。 */
export interface SelectedTurn {
  content: TurnContent
  id: string
  turn: number
}

/** 始终按会话顺序输出；一轮问答拆成连续的用户与回答消息供渲染器使用。 */
export function selectedTurnsToShareMessages(selected: Iterable<SelectedTurn>): ShareMessage[] {
  const ordered = [...selected].sort((left, right) => left.turn - right.turn)
  return ordered.flatMap((item, index) => {
    const previous = ordered[index - 1]
    const messages = turnToShareMessages(item.content, item.turn)
    messages[0]!.omittedBefore = previous === undefined
      ? 0
      : Math.max(0, item.turn - previous.turn - 1)
    return messages
  })
}

/** 一轮问答转成连续的“用户消息 + 回答消息”渲染模型。 */
export function turnToShareMessages(content: TurnContent, turn: number): ShareMessage[] {
  return [
    {
      elements: content.prompts,
      omittedBefore: 0,
      order: turn * 2,
      role: 'user',
      turn,
    },
    {
      elements: content.answers,
      omittedBefore: 0,
      order: turn * 2 + 1,
      role: 'assistant',
      turn,
    },
  ]
}
