import type { TurnContent } from './dom.ts';
import { type ShareSettings } from './settings.ts';
export interface ShareCard {
    element: HTMLElement;
    dispose(): void;
}
export declare function createShareCard(document: Document, content: TurnContent, locale: 'zh' | 'en', settings?: ShareSettings): ShareCard;
//# sourceMappingURL=card.d.ts.map