interface SharePages {
    elements: HTMLElement[];
    dispose(): void;
}
/** 以完整问答顺序分页；孤立短组合并相邻页，超高内容不裁切。 */
export declare function createSharePages(element: HTMLElement): Promise<SharePages>;
export {};
//# sourceMappingURL=pagination.d.ts.map