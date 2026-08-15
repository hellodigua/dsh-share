export type ShareLocale = 'zh' | 'en'

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
  download: string
  downloadMarkdown: string
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
  hideProcess: string
  phone: string
  tablet: string
  desktop: string
  normal: string
  large: string
  xlarge: string
}
export function getDocumentLocale(document: Document): ShareLocale {
  return document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
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
      download: '下载图片',
      downloadMarkdown: '下载 Markdown',
      downloadMarkdownCompact: '下载MD',
      copied: '图片已复制',
      copyUnsupported: '当前浏览器不支持复制图片，请下载 PNG。',
      copyFailed: '复制失败，请下载 PNG。',
      renderFailed: '图片生成失败，请稍后重试。',
      updating: '正在更新预览…',
      updateFailed: '更新失败，当前仍为上一张预览。',
      close: '关闭',
      width: '宽度',
      fontSize: '字号',
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
    download: 'Download image',
    downloadMarkdown: 'Download Markdown',
    downloadMarkdownCompact: 'Markdown',
    copied: 'Image copied',
    copyUnsupported: 'Image clipboard is unavailable. Please download the PNG.',
    copyFailed: 'Could not copy the image. Please download the PNG.',
    renderFailed: 'Could not generate the image. Please try again.',
    updating: 'Updating preview…',
    updateFailed: 'Update failed. The previous preview is still shown.',
    close: 'Close',
    width: 'Width',
    fontSize: 'Size',
    hideProcess: 'Hide process',
    phone: 'Phone',
    tablet: 'Tablet',
    desktop: 'Desktop',
    normal: 'Normal',
    large: 'Large',
    xlarge: 'Extra Large',
  }
}
