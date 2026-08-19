/** 无主题或亮色时的不透明分享图底色，对应卡片 `var()` 兜底 `#f7f8fa`。 */
export declare const SHARE_LIGHT_BACKGROUND = "rgb(247, 248, 250)";
/** 官方暗色 `--dsw-alias-bg-base` 的实色，避免皮肤把 token 设成 transparent。 */
export declare const SHARE_DARK_BACKGROUND = "rgb(21, 21, 23)";
export declare function shareFallbackBackground(document: Document): string;
/** 把计算色压成不透明实色。透明走主题兜底；半透明叠在兜底之上。无法解析的颜色原样返回。 */
export declare function flattenOpaqueBackground(color: string, fallback: string): string;
export declare function shareExportBackground(element: HTMLElement): string;
//# sourceMappingURL=background.d.ts.map