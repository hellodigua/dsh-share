import type { TurnContent } from './dom.ts';
export type ShareMessageRole = 'user' | 'assistant';
/** 一条进入图片和 Markdown 导出器的稳定消息。 */
export interface ShareMessage {
    elements: HTMLElement[];
    /** 与上一组所选问答之间省略的完整问答数量。 */
    omittedBefore: number;
    /** 在当前会话消息中的稳定顺序。 */
    order: number;
    role: ShareMessageRole;
    turn: number;
}
/** 选择模式保存的一轮完整问答；用户消息和回答始终关联。 */
export interface SelectedTurn {
    content: TurnContent;
    id: string;
    turn: number;
}
/** 始终按会话顺序输出；一轮问答拆成连续的用户与回答消息供渲染器使用。 */
export declare function selectedTurnsToShareMessages(selected: Iterable<SelectedTurn>): ShareMessage[];
/** 一轮问答转成连续的“用户消息 + 回答消息”渲染模型。 */
export declare function turnToShareMessages(content: TurnContent, turn: number): ShareMessage[];
//# sourceMappingURL=content.d.ts.map