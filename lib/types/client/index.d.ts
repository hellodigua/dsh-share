import type { ClientContext, ObservableSnapshot } from '@deepseek-ai/dsh-client-runtime/client';
import type { LocaleSnapshot } from '@deepseek-ai/dsh-client-locale/client';
import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import { type ReactElement } from 'react';
export declare const name = "dsh-share/client";
export declare const inject: string[];
export type ImageRenderer = (element: HTMLElement) => Promise<Blob>;
type ShareLocale = 'zh' | 'en';
export interface InstallOptions {
    getLocale?: () => ShareLocale;
    renderImage?: ImageRenderer;
    subscribeLocale?: (listener: () => void) => () => void;
}
export declare function renderShareImage(element: HTMLElement): Promise<Blob>;
export interface ShareSelectionSnapshot {
    active: boolean;
    allSelected: boolean;
    count: number;
    selectedIds: ReadonlySet<string>;
    total: number;
}
export interface ShareRuntime {
    readonly document: Document;
    getLocale(): ShareLocale;
    selectionFor(sessionId: string): ObservableSnapshot<ShareSelectionSnapshot>;
    enterSelection(sessionId: string, source?: HTMLElement, initialTurn?: number): void;
    cancelSelection(sessionId: string): void;
    toggleSelection(sessionId: string, turnId: string): void;
    openSelected(sessionId: string): void;
    dispose(): void;
}
export declare function createShareRuntime(document: Document, options?: InstallOptions): ShareRuntime;
interface ShareRuntimeInjected {
    hooks: {
        shareLocale: ObservableSnapshot<LocaleSnapshot>;
        shareSelection: ObservableSnapshot<ShareSelectionSnapshot>;
    };
    shareRuntime: ShareRuntime;
}
export type ShareActionProps = PropsRuntime<'conversation.chat.assistant-actions'> & InjectFace<ShareRuntimeInjected>;
export type ShareConversationActionProps = PropsRuntime<'conversation.session.header.utilities'> & InjectFace<ShareRuntimeInjected>;
/** 官方 assistant-actions 插槽中的分享入口。 */
export declare function ShareAction({ messageId, sessionId, shareRuntime, useSession, useShareLocale, useShareSelection, }: ShareActionProps): ReactElement;
/** 官方 Session Header 右侧 utilities 插槽中的多轮分享入口。 */
export declare function ShareConversationAction({ sessionId, shareRuntime, useShareLocale, useShareSelection, }: ShareConversationActionProps): ReactElement;
export declare function apply(ctx: ClientContext): void;
export { createShareCard } from './card.ts';
export { createShareMarkdown } from './markdown.ts';
export { findTurnContent, findTurnContentFromAction } from './dom.ts';
export { DEFAULT_SHARE_SETTINGS, FONT_SIZE_PRESETS, loadShareSettings, saveShareSettings, WIDTH_PRESETS, type FontSizePreset, type ShareSettings, type WidthPreset, } from './settings.ts';
//# sourceMappingURL=index.d.ts.map