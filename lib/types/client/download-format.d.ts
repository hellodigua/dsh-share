import { type ShareLocale } from './i18n.ts';
export type DownloadFormat = 'markdown' | 'html';
interface FormatProps {
    locale: ShareLocale;
    disabled: boolean;
    onChange(format: DownloadFormat): void;
}
/** 在独立节点挂载宿主React菜单，仅在输入变化时更新，避免观察器回环。 */
export declare function mountDownloadFormat(element: HTMLElement, onChange: FormatProps['onChange']): {
    update(locale: ShareLocale, disabled: boolean): void;
    dispose(): void;
};
export {};
//# sourceMappingURL=download-format.d.ts.map