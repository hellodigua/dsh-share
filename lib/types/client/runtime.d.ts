import type { ObservableSnapshot } from '@deepseek-ai/dsh-client-runtime/client';
import { type ShareLocale } from './i18n.ts';
import { type ImageRenderer } from './preview-dialog.ts';
export interface InstallOptions {
    getLocale?: () => ShareLocale;
    renderImage?: ImageRenderer;
    subscribeLocale?: (listener: () => void) => () => void;
}
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
//# sourceMappingURL=runtime.d.ts.map