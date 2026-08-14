import type { ShareMessage } from './content.ts';
import { type ShareSettings } from './settings.ts';
export interface ShareCard {
    element: HTMLElement;
    dispose(): void;
}
export declare function cloneShareMessage(source: HTMLElement, locale: 'zh' | 'en', hideReasoning?: boolean): HTMLElement;
/** 与图片和 Markdown 共用的回答过程过滤规则。 */
export declare function visibleAssistantElements(elements: readonly HTMLElement[], hideProcess: boolean): HTMLElement[];
export declare function createShareCard(document: Document, messages: readonly ShareMessage[], locale: 'zh' | 'en', settings?: ShareSettings): ShareCard;
//# sourceMappingURL=card.d.ts.map