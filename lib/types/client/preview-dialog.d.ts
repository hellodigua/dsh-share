import { type ShareLocale } from './i18n.ts';
import { type ShareSettings } from './settings.ts';
export type ImageRenderer = (element: HTMLElement) => Promise<Blob>;
export declare function renderShareImage(element: HTMLElement): Promise<Blob>;
export declare function downloadMarkdownFile(document: Document, markdown: string): void;
interface PreviewDialogOptions {
    getLocale(): ShareLocale;
    onSettingsChange(settings: ShareSettings): void;
    onDismiss(): void;
}
export declare class PreviewDialog {
    private readonly document;
    private readonly options;
    readonly element: HTMLDialogElement;
    private readonly title;
    private readonly image;
    private readonly message;
    private readonly status;
    private readonly copyButton;
    private readonly downloadButton;
    private readonly hideProcessInput;
    private readonly choiceButtons;
    private readonly storage?;
    private currentSettings;
    private blob?;
    private objectUrl?;
    constructor(document: Document, options: PreviewDialogOptions);
    get settings(): ShareSettings;
    /** 弹窗会跨语言切换复用；每次显示前都从 DSH 官方 locale 刷新静态文案。 */
    private updateCopy;
    showLoading(turnCount: number, preservePreview?: boolean, selectionExport?: boolean): void;
    /** 设置连续变化时先保留当前预览，只更新轻量状态；图片稍后统一重算。 */
    showPendingUpdate(): void;
    /** 先在独立 img 中完成解码，再原位替换当前预览，避免出现空白帧。 */
    showResult(blob: Blob, isCurrent?: () => boolean): Promise<boolean>;
    showError(preservePreview?: boolean): void;
    private waitForImage;
    private nextFrame;
    destroy(): void;
    private open;
    private close;
    private createChoice;
    private updateControlState;
    private clearResult;
    private clearImageResult;
    private copy;
    private download;
}
export {};
//# sourceMappingURL=preview-dialog.d.ts.map