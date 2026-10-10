export type ShareLocale = 'zh' | 'en'

export function normalizeShareLocale(locale: string): ShareLocale {
  return locale.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export interface Translation {
  title: string
  selectedTitle(count: number): string
  share: string
  shareTooltip: string
  shareConversation: string
  cancelSelection: string
  createSelection: string
  createSelectionCompact: string
  selectAll: string
  selectedCount(count: number): string
  selectTurn: string
  unselectTurn: string
  loading: string
  copy: string
  copyPage: string
  downloadPage: string
  downloadAll: string
  downloadAllHint: string
  zipCreating: string
  zipFailed: string
  previousPage: string
  nextPage: string
  pageNumber(current: number, total: number): string
  download: string
  downloadMarkdown: string
  downloadHtml: string
  downloadFile: string
  downloadFormat: string
  htmlExporting: string
  htmlExportFailed: string
  htmlMissingImages: string
  downloadMarkdownCompact: string
  copied: string
  copyUnsupported: string
  copyFailed: string
  renderFailed: string
  updating: string
  updateFailed: string
  close: string
  width: string
  fontSize: string
  directSingleTurn: string
  hideProcess: string
  phone: string
  tablet: string
  desktop: string
  normal: string
  large: string
  xlarge: string
}
export function getDocumentLocale(document: Document): ShareLocale {
  return normalizeShareLocale(document.documentElement.lang)
}

export function t(locale: ShareLocale): Translation {
  if (locale === 'zh') {
    return {
      title: '分享当前问答',
      selectedTitle: () => '生成图片',
      share: '将当前问答分享为图片',
      shareTooltip: '分享',
      shareConversation: '分享对话',
      cancelSelection: '取消',
      createSelection: '生成分享图片',
      createSelectionCompact: '生成图片',
      selectAll: '全选',
      selectedCount: count => `已选择 ${count} 组对话`,
      selectTurn: '选择这组对话',
      unselectTurn: '取消选择这组对话',
      loading: '正在生成图片…',
      copy: '复制图片',
      copyPage: '复制当前页',
      downloadPage: '下载当前页',
      downloadAll: '下载全部',
      downloadAllHint: '包含多张图片，将下载为zip',
      zipCreating: '正在打包全部图片…',
      zipFailed: '打包失败或内容过大，请重试或下载当前页。',
      previousPage: '上一页',
      nextPage: '下一页',
      pageNumber: (current, total) => `第 ${current} / ${total} 张`,
      download: '下载图片',
      downloadMarkdown: '下载 Markdown',
      downloadHtml: '下载 HTML',
      downloadFile: '下载',
      downloadFormat: '下载格式',
      htmlExporting: '正在生成 HTML…',
      htmlExportFailed: 'HTML 生成失败，请重试。',
      htmlMissingImages: '部分图片无法内嵌，已在 HTML 中标记。',
      downloadMarkdownCompact: '下载MD',
      copied: '图片已复制',
      copyUnsupported: '当前浏览器不支持复制图片，请下载 PNG。',
      copyFailed: '复制失败，请下载 PNG。',
      renderFailed: '无法完整生成图片，请减小字号、减少内容或导出 Markdown。',
      updating: '正在更新预览…',
      updateFailed: '无法完整生成新图片，仍显示上次预览。请减小字号或减少内容。',
      close: '关闭',
      width: '宽度',
      fontSize: '字号',
      directSingleTurn: '分享直接生成图片',
      hideProcess: '不展示过程',
      phone: '手机',
      tablet: '平板',
      desktop: '电脑',
      normal: '标准',
      large: '大',
      xlarge: '超大',
    }
  }
  return {
    title: 'Share this Q&A',
    selectedTitle: () => 'Generate image',
    share: 'Share this Q&A as an image',
    shareTooltip: 'Share',
    shareConversation: 'Share conversation',
    cancelSelection: 'Cancel',
    createSelection: 'Create image',
    createSelectionCompact: 'Create image',
    selectAll: 'Select all',
    selectedCount: count => `${count} conversation ${count === 1 ? 'group' : 'groups'} selected`,
    selectTurn: 'Select this conversation group',
    unselectTurn: 'Unselect this conversation group',
    loading: 'Generating image…',
    copy: 'Copy image',
    copyPage: 'Copy current page',
    downloadPage: 'Download current page',
    downloadAll: 'Download all',
    downloadAllHint: 'Contains multiple images; downloads as a ZIP.',
    zipCreating: 'Packaging all images…',
    zipFailed: 'Could not package the images, or the export is too large. Retry or download the current page.',
    previousPage: 'Previous',
    nextPage: 'Next',
    pageNumber: (current, total) => `${current} / ${total}`,
    download: 'Download image',
    downloadMarkdown: 'Download Markdown',
    downloadHtml: 'Download HTML',
    downloadFile: 'Download',
    downloadFormat: 'Download format',
    htmlExporting: 'Generating HTML…',
    htmlExportFailed: 'Could not generate HTML. Please try again.',
    htmlMissingImages: 'Some images could not be embedded and are marked in the HTML.',
    downloadMarkdownCompact: 'Markdown',
    copied: 'Image copied',
    copyUnsupported: 'Image clipboard is unavailable. Please download the PNG.',
    copyFailed: 'Could not copy the image. Please download the PNG.',
    renderFailed: 'Could not generate the complete image. Reduce the font size or content, or export Markdown.',
    updating: 'Updating preview…',
    updateFailed: 'Could not generate the complete image. The previous preview is still shown. Reduce the font size or content.',
    close: 'Close',
    width: 'Width',
    fontSize: 'Size',
    directSingleTurn: 'Generate image on click',
    hideProcess: 'Hide process',
    phone: 'Phone',
    tablet: 'Tablet',
    desktop: 'Desktop',
    normal: 'Normal',
    large: 'Large',
    xlarge: 'Extra Large',
  }
}
