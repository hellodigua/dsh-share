export type ShareLocale = 'zh' | 'en';
export interface Translation {
    title: string;
    selectedTitle(count: number): string;
    share: string;
    shareTooltip: string;
    shareConversation: string;
    cancelSelection: string;
    createSelection: string;
    createSelectionCompact: string;
    selectAll: string;
    selectedCount(count: number): string;
    selectTurn: string;
    unselectTurn: string;
    loading: string;
    copy: string;
    download: string;
    downloadMarkdown: string;
    downloadMarkdownCompact: string;
    copied: string;
    copyUnsupported: string;
    copyFailed: string;
    renderFailed: string;
    updating: string;
    updateFailed: string;
    close: string;
    width: string;
    fontSize: string;
    hideProcess: string;
    phone: string;
    tablet: string;
    desktop: string;
    normal: string;
    large: string;
    xlarge: string;
}
export declare function getDocumentLocale(document: Document): ShareLocale;
export declare function t(locale: ShareLocale): Translation;
//# sourceMappingURL=i18n.d.ts.map