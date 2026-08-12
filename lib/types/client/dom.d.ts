export declare const TURN_TAIL_SELECTOR = "[data-turn-tail]";
export declare const TURN_FLOW_SELECTOR = "[data-chat-flow-kind=\"turn-tail\"]";
export interface TurnContent {
    prompts: HTMLElement[];
    answers: HTMLElement[];
    tail: HTMLElement;
}
/**
 * 这里集中保存当前 DSH 页面结构的假设，方便上游 DOM 调整后只改一个地方。
 * 从 turn-tail 向前回溯到本轮 user 节点，同时收集 assistant-step、tool-call 和中途 steering。
 */
export declare function findTurnContent(tail: HTMLElement): TurnContent | undefined;
/** 从官方 assistant-actions 插槽渲染的按钮定位并收集当前轮内容。 */
export declare function findTurnContentFromAction(action: HTMLElement): TurnContent | undefined;
//# sourceMappingURL=dom.d.ts.map