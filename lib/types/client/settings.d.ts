export type WidthPreset = 'phone' | 'tablet' | 'desktop';
export type FontSizePreset = 'normal' | 'large' | 'xlarge';
export interface ShareSettings {
    width: WidthPreset;
    fontSize: FontSizePreset;
}
export declare const WIDTH_PRESETS: Record<WidthPreset, number>;
export declare const FONT_SIZE_PRESETS: Record<FontSizePreset, number>;
export declare const DEFAULT_SHARE_SETTINGS: ShareSettings;
/** 读取失败时回到默认值，避免隐私模式下 localStorage 异常阻断分享功能。 */
export declare function loadShareSettings(storage?: Storage): ShareSettings;
export declare function saveShareSettings(storage: Storage | undefined, settings: ShareSettings): void;
//# sourceMappingURL=settings.d.ts.map