import type { ShareMessage } from './content.ts';
import type { ShareSettings } from './settings.ts';
/** 将与 PNG 相同的可见内容导出为按原会话顺序排列的 GFM Markdown。 */
export declare function createShareMarkdown(messages: readonly ShareMessage[], locale: 'zh' | 'en', settings: ShareSettings): string;
//# sourceMappingURL=markdown.d.ts.map