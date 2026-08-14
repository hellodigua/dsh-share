export declare const TURN_TAIL_SELECTOR = "[data-turn-tail]";
export declare const TURN_FLOW_SELECTOR = "[data-chat-flow-kind=\"turn-tail\"]";
export interface TurnContent {
    prompts: HTMLElement[];
    answers: HTMLElement[];
    tail: HTMLElement;
}
export interface RenderedTurn {
    content: TurnContent;
    turn: number;
}
/** 立即克隆消息节点，后续滚动卸载原 DOM 也不会影响导出。 */
export declare function snapshotElements(elements: readonly HTMLElement[]): HTMLElement[];
/**
 * 在用户勾选一轮时立即保存消息节点，避免后续滚动加载或视图切换影响导出内容。
 * tail 保留原节点引用，只用于判断会话顺序；真正渲染的问答均使用脱离页面的副本。
 */
export declare function snapshotTurnContent(content: TurnContent): TurnContent;
/**
 * 这里集中保存当前 DSH 页面结构的假设，方便上游 DOM 调整后只改一个地方。
 * 从 turn-tail 向前回溯到本轮 user 节点，同时收集 assistant-step、tool-call 和中途 steering。
 */
export declare function findTurnContent(tail: HTMLElement): TurnContent | undefined;
/** 从官方 assistant-actions 插槽渲染的按钮定位并收集当前轮内容。 */
export declare function findTurnContentFromAction(action: HTMLElement): TurnContent | undefined;
/** 收集当前会话页面中已经渲染并完成的轮次，按 DSH 原始 turn 排序。 */
export declare function findRenderedTurns(root: ParentNode): RenderedTurn[];
//# sourceMappingURL=dom.d.ts.map