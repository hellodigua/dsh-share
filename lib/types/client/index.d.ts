export declare const name = "@dsh-external/dsh-share/client";
interface ClientContext {
    effect(callback: () => void | (() => void), label?: string): void;
}
export type ImageRenderer = (element: HTMLElement) => Promise<Blob>;
export interface InstallOptions {
    renderImage?: ImageRenderer;
}
export declare function renderShareImage(element: HTMLElement): Promise<Blob>;
export declare function installShareButton(document: Document, options?: InstallOptions): () => void;
export declare function apply(ctx: ClientContext): void;
export { createShareCard } from './card.ts';
export { findActionRow, findTurnContent } from './dom.ts';
export { DEFAULT_SHARE_SETTINGS, FONT_SIZE_PRESETS, loadShareSettings, saveShareSettings, WIDTH_PRESETS, type FontSizePreset, type ShareSettings, type WidthPreset, } from './settings.ts';
//# sourceMappingURL=index.d.ts.map