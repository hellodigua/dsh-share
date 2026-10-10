import { type ShareLocale } from './i18n.ts';
import { type ShareSettings } from './settings.ts';
export type ImageRenderer = (element: HTMLElement) => Promise<Blob | Blob[]>;
export declare function renderShareImage(element: HTMLElement): Promise<Blob | Blob[]>;
export declare function downloadMarkdownFile(document: Document, markdown: string, title?: string): void;
/** 下载独立HTML文档，给宿主留出读取Blob的时间。 */
export declare function downloadHtmlFile(document: Document, html: string, title?: string): void;
interface PreviewDialogOptions {
    getConversationTitle?(): string | undefined;
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
    private readonly downloadAllButton;
    private readonly directSingleTurnInput;
    private readonly hideProcessInput;
    private readonly choiceButtons;
    private readonly storage?;
    private currentSettings;
    private currentDirectSingleTurn;
    private blob?;
    private objectUrl?;
    private pages;
    private pageUrls;
    private pageIndex;
    private archiveJob?;
    private readonly pager;
    private readonly previousPage;
    private readonly nextPage;
    private readonly pageLabel;
    constructor(document: Document, options: PreviewDialogOptions);
    get settings(): ShareSettings;
    get directSingleTurn(): boolean;
    /** 弹窗会跨语言切换复用；每次显示前都从 DSH 官方 locale 刷新静态文案。 */
    private updateCopy;
    showLoading(turnCount: number, preservePreview?: boolean, selectionExport?: boolean): void;
    /** 设置连续变化时先保留当前预览，只更新轻量状态；图片稍后统一重算。 */
    showPendingUpdate(): void;
    /** 先在独立 img 中完成解码，再原位替换当前预览，避免出现空白帧。 */
    showResult(result: Blob | Blob[], isCurrent?: () => boolean): Promise<boolean>;
    private selectPage;
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
    private cancelArchive;
    /** 一次保存全部分页，避免多次自动下载被宿主丢弃。 */
    private downloadAll;
}
export {};
//# sourceMappingURL=preview-dialog.d.ts.map