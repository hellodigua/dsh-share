import type { ShareMessage } from './content.ts';
import type { ShareSettings } from './settings.ts';
/** 生成无脚本的独立阅读文档；只复制允许的标签和属性。 */
export declare function createShareHtml(document: Document, messages: readonly ShareMessage[], locale: 'zh' | 'en', settings: ShareSettings): Promise<{
    html: string;
    missingImages: number;
}>;
//# sourceMappingURL=html.d.ts.map