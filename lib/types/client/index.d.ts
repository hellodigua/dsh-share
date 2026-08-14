import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import { type ReactElement } from 'react';
export declare const name = "@dsh-external/dsh-share/client";
export declare const inject: string[];
export type ImageRenderer = (element: HTMLElement) => Promise<Blob>;
export interface InstallOptions {
    renderImage?: ImageRenderer;
}
export declare function renderShareImage(element: HTMLElement): Promise<Blob>;
export interface ShareRuntime {
    readonly document: Document;
    openFromAction(action: HTMLButtonElement): void;
    dispose(): void;
}
export declare function createShareRuntime(document: Document, options?: InstallOptions): ShareRuntime;
interface ShareRuntimeInjected {
    shareRuntime: ShareRuntime;
}
export interface ShareActionProps extends ShareRuntimeInjected {
    messageId: string;
}
/** 官方 assistant-actions 插槽中的分享入口。 */
export declare function ShareAction({ shareRuntime }: ShareActionProps): ReactElement;
export declare function apply(ctx: ClientContext): void;
export { createShareCard } from './card.ts';
export { findTurnContent, findTurnContentFromAction } from './dom.ts';
export { DEFAULT_SHARE_SETTINGS, FONT_SIZE_PRESETS, loadShareSettings, saveShareSettings, WIDTH_PRESETS, type FontSizePreset, type ShareSettings, type WidthPreset, } from './settings.ts';
//# sourceMappingURL=index.d.ts.map