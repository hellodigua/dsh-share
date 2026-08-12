export declare const TURN_TAIL_SELECTOR = "[data-turn-tail]";
export declare const TURN_FLOW_SELECTOR = "[data-chat-flow-kind=\"turn-tail\"]";
export declare const SHARE_BUTTON_SELECTOR = "[data-dsh-share-button]";
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
/** 找到复制、分支和时间所在的按钮行。 */
export declare function findActionRow(tail: HTMLElement): HTMLElement | undefined;
//# sourceMappingURL=dom.d.ts.map