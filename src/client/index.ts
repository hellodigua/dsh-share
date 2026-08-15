import { toBlob } from 'html-to-image'
import type { ClientContext, ObservableSnapshot } from '@deepseek-ai/dsh-client-runtime/client'
import type { LocaleSnapshot } from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import { IconShareOutline16, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { createElement, Fragment, type MouseEvent as ReactMouseEvent, type ReactElement } from 'react'
import { createShareCard } from './card.ts'
import {
  selectedTurnsToShareMessages,
  type SelectedTurn,
  type ShareMessage,
} from './content.ts'
import {
  findRenderedTurns,
  snapshotTurnContent,
  type TurnContent,
} from './dom.ts'
import { createShareMarkdown } from './markdown.ts'
import {
  loadShareSettings,
  saveShareSettings,
  WIDTH_PRESETS,
  type FontSizePreset,
  type ShareSettings,
  type WidthPreset,
} from './settings.ts'

export const name = 'dsh-share/client'
export const inject = ['slots', 'locale']

const STYLE_ID = 'dsh-share-style'
const TRANSPARENT_IMAGE_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

const STYLE_TEXT = `
[data-dsh-share-button] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 28px;
  color: var(--dsw-alias-label-tertiary, currentColor);
  cursor: pointer;
  display: inline-flex;
  height: 28px;
  justify-content: center;
  margin: 0;
  padding: 6px;
  width: 28px;
}
/* 官方 slot 固定在分支按钮前；只调整 flex 视觉顺序，不移动 React 管理的 DOM。 */
[data-dsh-share-button] { order: 1; }
[data-time-hover-root] > div:has([data-dsh-share-button]) > span:last-child { order: 2; }
[data-dsh-share-button]:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12));
  color: var(--dsw-alias-label-secondary, currentColor);
  opacity: 1;
}
[data-dsh-share-button]:disabled { cursor: wait; opacity: .38; }
[data-dsh-share-conversation] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 999px;
  color: var(--dsw-alias-label-primary, currentColor);
  cursor: pointer;
  display: inline-flex;
  height: 34px;
  justify-content: center;
  padding: 0;
  width: 34px;
}
[data-dsh-share-conversation]:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12)); }

/* DeepSeek 官网式选择模式：一轮问答作为一组，常规操作和输入区让位给底栏。 */
[data-conversation-scroll][data-dsh-share-selection] [data-composer-seat],
[data-conversation-scroll][data-dsh-share-selection] [data-chat-flow-kind="turn-tail"] {
  pointer-events: none !important;
  visibility: hidden !important;
}
[data-conversation-scroll][data-dsh-share-selection]
  [data-chat-flow-kind="user"] [data-time-hover-root] > :last-child:has(button),
[data-conversation-scroll][data-dsh-share-selection]
  [data-chat-flow-kind="steering"] [data-time-hover-root] > :last-child:has(button) {
  pointer-events: none !important;
  visibility: hidden !important;
}
[data-dsh-share-select-anchor],
[data-dsh-share-select-range-root] { position: relative !important; }
[data-conversation-scroll][data-dsh-share-selection] [data-dsh-share-select-content] {
  cursor: pointer !important;
}
[data-conversation-scroll][data-dsh-share-selection]
  [data-dsh-share-select-content] > :not([data-dsh-share-select-region]),
[data-conversation-scroll][data-dsh-share-selection]
  [data-dsh-share-select-content] > :not([data-dsh-share-select-region]) * {
  cursor: pointer !important;
  pointer-events: none !important;
}
[data-dsh-share-select-region="question"] {
  height: 44px;
  margin-bottom: -44px;
  pointer-events: none;
  position: sticky;
  top: 0;
  width: 0;
  z-index: 2;
}
[data-dsh-share-select-region="answer"] {
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 2;
}
[data-dsh-share-select-sticky] {
  height: 44px;
  pointer-events: none;
  position: sticky;
  top: 0;
  width: 0;
}
[data-dsh-share-turn-select] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 44px;
  justify-content: center;
  left: -42px;
  margin: 0;
  padding: 0;
  pointer-events: auto;
  position: absolute;
  top: 0;
  width: 18px;
  z-index: 2;
}
[data-dsh-share-turn-select-box],
[data-dsh-share-select-all-box] {
  align-items: center;
  border: 1.5px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, .48));
  border-radius: 6px;
  box-sizing: border-box;
  display: inline-flex;
  height: 18px;
  justify-content: center;
  position: relative;
  width: 18px;
}
[data-dsh-share-turn-select][aria-checked="true"] [data-dsh-share-turn-select-box],
[data-dsh-share-select-all][aria-checked="true"] [data-dsh-share-select-all-box] {
  background: var(--dsw-static-deepseek-500, #4d6bfe);
  border-color: var(--dsw-static-deepseek-500, #4d6bfe);
}
[data-dsh-share-turn-select][aria-checked="true"] [data-dsh-share-turn-select-box]::after,
[data-dsh-share-select-all][aria-checked="true"] [data-dsh-share-select-all-box]::after {
  border-bottom: 1.8px solid #fff;
  border-right: 1.8px solid #fff;
  content: '';
  height: 8px;
  transform: rotate(45deg) translate(-1px, -1px);
  width: 4px;
}
[data-dsh-share-turn-select]:focus-visible [data-dsh-share-turn-select-box],
[data-dsh-share-select-all]:focus-visible [data-dsh-share-select-all-box] {
  outline: 2px solid var(--dsw-alias-button-info-fill, #4d6bfe);
  outline-offset: 2px;
}
[data-dsh-share-selection-footer] {
  align-items: center;
  background: var(--dsw-alias-bg-base, #fff);
  border-top: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, .18));
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex: none;
  height: 66px;
  justify-content: center;
  margin-top: -66px;
  position: sticky;
  width: 100%;
  z-index: 9;
}
[data-dsh-share-selection-footer-inner] {
  align-items: center;
  display: flex;
  gap: 8px;
  max-width: 840px;
  width: min(840px, calc(100% - 64px));
}
[data-dsh-share-select-all] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--dsw-alias-label-primary, currentColor);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 13px;
  gap: 10px;
  height: 36px;
  padding: 0 2px;
}
[data-dsh-share-selection-divider] {
  background: var(--dsw-alias-border-l2, rgba(127, 127, 127, .24));
  height: 18px;
  margin: 0 8px 0 6px;
  width: 1px;
}
[data-dsh-share-selection-count] {
  color: var(--dsw-alias-label-primary, currentColor);
  flex: 1 1 auto;
  font-size: 14px;
  line-height: 22px;
}
[data-dsh-share-selection-cancel],
[data-dsh-share-selection-markdown],
[data-dsh-share-selection-create] {
  appearance: none;
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  height: 36px;
  line-height: 22px;
  padding: 6px 18px;
  white-space: nowrap;
}
[data-dsh-share-selection-cancel],
[data-dsh-share-selection-markdown] {
  background: transparent;
  border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, .4));
  color: var(--dsw-alias-label-primary, currentColor);
}
[data-dsh-share-selection-cancel] {
  min-width: 72px;
}
[data-dsh-share-selection-create] {
  align-items: center;
  background: var(--dsw-static-deepseek-500, #4d6bfe);
  border: 1px solid var(--dsw-static-deepseek-500, #4d6bfe);
  color: #fff;
  display: inline-flex;
  justify-content: center;
  min-width: 132px;
}
[data-dsh-share-selection-cancel]:hover,
[data-dsh-share-selection-markdown]:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12)); }
[data-dsh-share-selection-create]:hover:not(:disabled) { background: #405bea; border-color: #405bea; }
[data-dsh-share-selection-markdown]:disabled,
[data-dsh-share-selection-create]:disabled { cursor: not-allowed; opacity: .45; }
[data-dsh-share-label="compact"] { display: none; }
@media (max-width: 720px) {
  [data-dsh-share-selection-footer] {
    height: 108px;
    margin-top: -108px;
    padding: 10px 0;
  }
  [data-dsh-share-selection-footer-inner] {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, 36px);
    width: calc(100% - 32px);
  }
  [data-dsh-share-select-all] {
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
  }
  [data-dsh-share-selection-divider] { display: none; }
  [data-dsh-share-selection-count] {
    font-size: 13px;
    grid-column: 2 / 4;
    grid-row: 1;
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  [data-dsh-share-selection-cancel],
  [data-dsh-share-selection-markdown],
  [data-dsh-share-selection-create] {
    font-size: 13px;
    grid-row: 2;
    min-width: 0;
    padding-inline: 6px;
    width: 100%;
  }
  [data-dsh-share-selection-cancel] { grid-column: 1; }
  [data-dsh-share-selection-markdown] { grid-column: 2; }
  [data-dsh-share-selection-create] { grid-column: 3; }
  [data-dsh-share-label="wide"] { display: none; }
  [data-dsh-share-label="compact"] { display: inline; }
}
[data-dsh-share-dialog] {
  background: var(--dsw-alias-bg-base, #fff);
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .22));
  border-radius: 14px;
  box-shadow: 0 20px 64px rgba(0, 0, 0, .24);
  color: var(--dsw-alias-label-primary, #111827);
  max-height: min(86vh, 900px);
  max-width: calc(100vw - 32px);
  overflow: hidden;
  padding: 0;
  width: 960px;
}
[data-dsh-share-dialog][open] { display: flex; flex-direction: column; }
[data-dsh-share-dialog]::backdrop { background: rgba(0, 0, 0, .48); }
.dsh-share-dialog__header {
  align-items: center;
  border-bottom: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  font-size: 16px;
  font-weight: 650;
  justify-content: space-between;
  padding: 16px 18px;
}
.dsh-share-dialog__close {
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: inherit;
  cursor: pointer;
  font-size: 22px;
  height: 30px;
  line-height: 1;
  width: 30px;
}
.dsh-share-dialog__close:hover { background: rgba(127, 127, 127, .12); }
.dsh-share-dialog__controls {
  align-items: center;
  border-bottom: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  padding: 12px 18px;
}
.dsh-share-dialog__field {
  align-items: center;
  display: flex;
  gap: 8px;
}
.dsh-share-dialog__field-label {
  color: var(--dsw-alias-label-secondary, #6b7280);
  font-size: 13px;
  white-space: nowrap;
}
.dsh-share-dialog__toggle {
  align-items: center;
  color: var(--dsw-alias-label-secondary, #6b7280);
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  gap: 7px;
  margin-left: auto;
  user-select: none;
  white-space: nowrap;
}
.dsh-share-dialog__toggle input {
  accent-color: #4d6bfe;
  cursor: pointer;
  height: 15px;
  margin: 0;
  width: 15px;
}
.dsh-share-dialog__segmented {
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .24));
  border-radius: 8px;
  display: inline-flex;
  gap: 2px;
  padding: 3px;
}
.dsh-share-dialog__choice {
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: var(--dsw-alias-label-secondary, #6b7280);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  height: 28px;
  min-width: 38px;
  padding: 0 9px;
}
.dsh-share-dialog__choice:hover { background: rgba(127, 127, 127, .08); }
.dsh-share-dialog__choice[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .14));
  color: var(--dsw-alias-label-primary, #111827);
}
.dsh-share-dialog__body {
  align-items: start;
  display: grid;
  flex: 1 1 auto;
  justify-items: center;
  max-height: 62vh;
  min-height: 220px;
  min-width: 0;
  overflow: auto;
  padding: 18px;
}
.dsh-share-dialog__preview {
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  box-sizing: border-box;
  display: block;
  height: auto;
  max-width: 100%;
}
.dsh-share-dialog__message {
  align-self: center;
  color: var(--dsw-alias-label-secondary, #6b7280);
  text-align: center;
}
.dsh-share-dialog__footer {
  align-items: center;
  border-top: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  min-height: 68px;
  padding: 14px 18px;
}
.dsh-share-dialog__status { color: var(--dsw-alias-label-secondary, #6b7280); font-size: 13px; margin-right: auto; }
.dsh-share-dialog__action {
  background: transparent;
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .28));
  border-radius: 8px;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 8px 14px;
}
.dsh-share-dialog__action:hover { background: rgba(127, 127, 127, .10); }
.dsh-share-dialog__action--primary { background: #4d6bfe; border-color: #4d6bfe; color: #fff; }
.dsh-share-dialog__action--primary:hover { background: #405bea; }
.dsh-share-dialog__action:disabled { cursor: not-allowed; opacity: .45; }
[data-dsh-share-card] [data-dsh-share-message],
[data-dsh-share-card] [data-dsh-share-message] :where(div, span, p, li, table, blockquote, td, th) {
  font-size: var(--dsh-share-font-size) !important;
  line-height: 1.75 !important;
}
[data-dsh-share-card] [data-dsh-share-tool-summary],
[data-dsh-share-card] [data-dsh-share-tool-summary] :where(div, span) {
  font-size: 14px !important;
  line-height: 24px !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h1) {
  font-size: calc(var(--dsh-share-font-size) * 1.55) !important;
  line-height: 1.3 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h2) {
  font-size: calc(var(--dsh-share-font-size) * 1.28) !important;
  line-height: 1.35 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h3, h4, h5, h6) {
  font-size: calc(var(--dsh-share-font-size) * 1.12) !important;
  line-height: 1.4 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(pre, code, code *) {
  font-size: calc(var(--dsh-share-font-size) * .875) !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(pre) {
  max-width: 100% !important;
  overflow: visible !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(img, video, svg) { max-width: 100% !important; }
[data-dsh-share-card] [data-dsh-share-message] :where(table) {
  max-width: 100% !important;
  table-layout: fixed !important;
  width: 100% !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(th, td) {
  max-width: none !important;
  min-width: 0 !important;
  overflow-wrap: anywhere !important;
  padding: 8px 6px !important;
  word-break: break-word !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(div:has(> table)) {
  max-width: 100% !important;
  overflow: visible !important;
}
`

export type ImageRenderer = (element: HTMLElement) => Promise<Blob>
type ShareLocale = 'zh' | 'en'

export interface InstallOptions {
  getLocale?: () => ShareLocale
  renderImage?: ImageRenderer
}

interface RenderRequest {
  content: readonly ShareMessage[]
  epoch: number
  locale: 'zh' | 'en'
  preservePreview: boolean
  settings: ShareSettings
}

interface Translation {
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

function getDocumentLocale(document: Document): ShareLocale {
  return document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

function t(locale: ShareLocale): Translation {
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

export async function renderShareImage(element: HTMLElement): Promise<Blob> {
  const blob = await toBlob(element, {
    backgroundColor: getComputedStyle(element).backgroundColor,
    imagePlaceholder: TRANSPARENT_IMAGE_PLACEHOLDER,
    pixelRatio: 2,
    skipFonts: true,
  })
  if (!blob) throw new Error('html-to-image returned an empty blob')
  return blob
}

function createFilename(extension: 'png' | 'md', now = new Date()): string {
  const pad = (number: number): string => String(number).padStart(2, '0')
  return `dsh-share-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.${extension}`
}

function downloadMarkdownFile(document: Document, markdown: string): void {
  if (!markdown) return
  const objectUrl = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }))
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = createFilename('md')
  anchor.click()
  document.defaultView?.setTimeout(() => URL.revokeObjectURL(objectUrl), 0)
}

interface PreviewDialogOptions {
  getLocale(): ShareLocale
  onSettingsChange(settings: ShareSettings): void
  onDismiss(): void
}

class PreviewDialog {
  readonly element: HTMLDialogElement
  private readonly title: HTMLElement
  private readonly image: HTMLImageElement
  private readonly message: HTMLElement
  private readonly status: HTMLElement
  private readonly copyButton: HTMLButtonElement
  private readonly downloadButton: HTMLButtonElement
  private readonly hideProcessInput: HTMLInputElement
  private readonly choiceButtons: HTMLButtonElement[]
  private readonly storage?: Storage
  private currentSettings: ShareSettings
  private blob?: Blob
  private objectUrl?: string

  constructor(
    private readonly document: Document,
    private readonly options: PreviewDialogOptions,
  ) {
    const strings = t(options.getLocale())
    let storage: Storage | undefined
    try {
      storage = document.defaultView?.localStorage
    } catch {
      storage = undefined
    }
    this.storage = storage
    this.currentSettings = loadShareSettings(storage)

    const dialog = document.createElement('dialog')
    dialog.dataset.dshShareDialog = ''
    dialog.innerHTML = `
      <div class="dsh-share-dialog__header">
        <span data-dsh-share-title></span>
        <button class="dsh-share-dialog__close" data-dsh-share-close type="button"></button>
      </div>
      <div class="dsh-share-dialog__controls">
        <div class="dsh-share-dialog__field">
          <span class="dsh-share-dialog__field-label" data-dsh-share-width-label></span>
          <div class="dsh-share-dialog__segmented" data-dsh-share-width role="group"></div>
        </div>
        <div class="dsh-share-dialog__field">
          <span class="dsh-share-dialog__field-label" data-dsh-share-font-size-label></span>
          <div class="dsh-share-dialog__segmented" data-dsh-share-font-size role="group"></div>
        </div>
        <label class="dsh-share-dialog__toggle">
          <input data-dsh-share-hide-process type="checkbox" />
          <span data-dsh-share-hide-process-label></span>
        </label>
      </div>
      <div class="dsh-share-dialog__body">
        <p class="dsh-share-dialog__message" data-dsh-share-message role="status"></p>
        <img class="dsh-share-dialog__preview" data-dsh-share-preview hidden alt="" />
      </div>
      <div class="dsh-share-dialog__footer">
        <span class="dsh-share-dialog__status" data-dsh-share-status role="status"></span>
        <button class="dsh-share-dialog__action" data-dsh-share-download type="button"></button>
        <button class="dsh-share-dialog__action dsh-share-dialog__action--primary" data-dsh-share-copy type="button"></button>
      </div>`

    this.element = dialog
    this.title = dialog.querySelector('[data-dsh-share-title]') as HTMLElement
    this.image = dialog.querySelector('[data-dsh-share-preview]') as HTMLImageElement
    this.message = dialog.querySelector('[data-dsh-share-message]') as HTMLElement
    this.status = dialog.querySelector('[data-dsh-share-status]') as HTMLElement
    this.copyButton = dialog.querySelector('[data-dsh-share-copy]') as HTMLButtonElement
    this.downloadButton = dialog.querySelector('[data-dsh-share-download]') as HTMLButtonElement
    this.hideProcessInput = dialog.querySelector('[data-dsh-share-hide-process]') as HTMLInputElement

    const widthGroup = dialog.querySelector('[data-dsh-share-width]') as HTMLElement
    const fontSizeGroup = dialog.querySelector('[data-dsh-share-font-size]') as HTMLElement
    const widthChoices: Array<[WidthPreset, string]> = [
      ['phone', strings.phone],
      ['tablet', strings.tablet],
      ['desktop', strings.desktop],
    ]
    const fontSizeChoices: Array<[FontSizePreset, string]> = [
      ['normal', strings.normal],
      ['large', strings.large],
      ['xlarge', strings.xlarge],
    ]
    for (const [value, label] of widthChoices) {
      widthGroup.append(this.createChoice('width', value, label))
    }
    for (const [value, label] of fontSizeChoices) {
      fontSizeGroup.append(this.createChoice('font-size', value, label))
    }
    this.choiceButtons = Array.from(dialog.querySelectorAll<HTMLButtonElement>('[data-dsh-share-choice]'))

    const close = dialog.querySelector('[data-dsh-share-close]') as HTMLButtonElement
    const widthLabel = dialog.querySelector('[data-dsh-share-width-label]') as HTMLElement
    const fontSizeLabel = dialog.querySelector('[data-dsh-share-font-size-label]') as HTMLElement
    const hideProcessLabel = dialog.querySelector('[data-dsh-share-hide-process-label]') as HTMLElement
    this.title.textContent = strings.title
    widthLabel.textContent = strings.width
    fontSizeLabel.textContent = strings.fontSize
    hideProcessLabel.textContent = strings.hideProcess
    widthGroup.ariaLabel = strings.width
    fontSizeGroup.ariaLabel = strings.fontSize
    close.textContent = '×'
    close.title = strings.close
    close.ariaLabel = strings.close
    this.copyButton.textContent = strings.copy
    this.downloadButton.textContent = strings.download

    close.addEventListener('click', () => this.close())
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) this.close()
    })
    dialog.addEventListener('close', () => {
      this.clearResult()
      this.options.onDismiss()
    })
    this.copyButton.addEventListener('click', () => void this.copy())
    this.downloadButton.addEventListener('click', () => this.download())
    this.hideProcessInput.addEventListener('change', () => {
      const next = { ...this.currentSettings, hideProcess: this.hideProcessInput.checked }
      this.currentSettings = next
      saveShareSettings(this.storage, next)
      this.updateControlState()
      this.options.onSettingsChange(this.settings)
    })
    this.updateControlState()
    document.body.append(dialog)
  }

  get settings(): ShareSettings {
    return { ...this.currentSettings }
  }

  /** 弹窗会跨语言切换复用；每次显示前都从 DSH 官方 locale 刷新静态文案。 */
  private updateCopy(): Translation {
    const strings = t(this.options.getLocale())
    const widthGroup = this.element.querySelector<HTMLElement>('[data-dsh-share-width]')
    const fontSizeGroup = this.element.querySelector<HTMLElement>('[data-dsh-share-font-size]')
    const close = this.element.querySelector<HTMLButtonElement>('[data-dsh-share-close]')
    const labels: Record<string, string> = {
      phone: strings.phone,
      tablet: strings.tablet,
      desktop: strings.desktop,
      normal: strings.normal,
      large: strings.large,
      xlarge: strings.xlarge,
    }
    const widthLabel = this.element.querySelector<HTMLElement>('[data-dsh-share-width-label]')
    const fontSizeLabel = this.element.querySelector<HTMLElement>('[data-dsh-share-font-size-label]')
    const hideProcessLabel = this.element.querySelector<HTMLElement>('[data-dsh-share-hide-process-label]')
    if (widthLabel) widthLabel.textContent = strings.width
    if (fontSizeLabel) fontSizeLabel.textContent = strings.fontSize
    if (hideProcessLabel) hideProcessLabel.textContent = strings.hideProcess
    if (widthGroup) widthGroup.ariaLabel = strings.width
    if (fontSizeGroup) fontSizeGroup.ariaLabel = strings.fontSize
    if (close) {
      close.title = strings.close
      close.ariaLabel = strings.close
    }
    for (const button of this.choiceButtons) {
      button.textContent = labels[button.dataset.value ?? ''] ?? button.textContent
    }
    this.copyButton.textContent = strings.copy
    this.downloadButton.textContent = strings.download
    return strings
  }

  showLoading(
    turnCount: number,
    preservePreview = false,
    selectionExport = false,
  ): void {
    const strings = this.updateCopy()
    const canPreserve = preservePreview && this.blob !== undefined && this.objectUrl !== undefined
    this.title.textContent = selectionExport ? strings.selectedTitle(turnCount) : strings.title
    this.element.ariaBusy = 'true'
    this.copyButton.disabled = true
    this.downloadButton.disabled = true

    if (canPreserve) {
      this.message.hidden = true
      this.image.hidden = false
      this.status.textContent = strings.updating
      this.open()
      return
    }

    this.clearImageResult()
    this.message.hidden = false
    this.message.textContent = strings.loading
    this.image.hidden = true
    this.status.textContent = ''
    this.open()
  }

  /** 设置连续变化时先保留当前预览，只更新轻量状态；图片稍后统一重算。 */
  showPendingUpdate(): void {
    const strings = this.updateCopy()
    const canPreserve = this.blob !== undefined && this.objectUrl !== undefined
    this.element.ariaBusy = 'true'
    this.copyButton.disabled = true
    this.downloadButton.disabled = true
    if (canPreserve) {
      this.message.hidden = true
      this.image.hidden = false
      this.status.textContent = strings.updating
    } else {
      this.message.hidden = false
      this.message.textContent = strings.loading
      this.image.hidden = true
      this.status.textContent = ''
    }
    this.open()
  }

  /** 先在独立 img 中完成解码，再原位替换当前预览，避免出现空白帧。 */
  async showResult(blob: Blob, isCurrent: () => boolean = () => true): Promise<boolean> {
    const nextObjectUrl = URL.createObjectURL(blob)
    try {
      const preloader = this.document.createElement('img')
      preloader.src = nextObjectUrl
      if (typeof preloader.decode === 'function') await preloader.decode()
      else await this.waitForImage(preloader)

      if (!isCurrent()) {
        URL.revokeObjectURL(nextObjectUrl)
        return false
      }
    } catch (error) {
      URL.revokeObjectURL(nextObjectUrl)
      throw error
    }

    const previousObjectUrl = this.objectUrl
    this.blob = blob
    this.objectUrl = nextObjectUrl
    this.image.src = nextObjectUrl
    this.image.style.width = `${WIDTH_PRESETS[this.currentSettings.width]}px`
    this.image.hidden = false
    this.message.hidden = true
    this.status.textContent = ''
    this.element.ariaBusy = 'false'
    this.copyButton.disabled = false
    this.downloadButton.disabled = false

    // 新图已进入解码缓存；延后一帧释放旧 URL，保证浏览器完成原位绘制。
    await this.nextFrame()
    if (previousObjectUrl) URL.revokeObjectURL(previousObjectUrl)
    return true
  }

  showError(preservePreview = false): void {
    const strings = t(this.options.getLocale())
    const canPreserve = preservePreview && this.blob !== undefined && this.objectUrl !== undefined
    this.element.ariaBusy = 'false'
    if (canPreserve) {
      this.message.hidden = true
      this.image.hidden = false
      this.status.textContent = strings.updateFailed
      this.copyButton.disabled = false
      this.downloadButton.disabled = false
      this.open()
      return
    }

    this.clearImageResult()
    this.message.hidden = false
    this.message.textContent = strings.renderFailed
    this.image.hidden = true
    this.copyButton.disabled = true
    this.downloadButton.disabled = true
    this.open()
  }

  private waitForImage(image: HTMLImageElement): Promise<void> {
    return new Promise((resolve, reject) => {
      image.addEventListener('load', () => resolve(), { once: true })
      image.addEventListener('error', () => reject(new Error('Failed to decode preview image')), { once: true })
    })
  }

  private nextFrame(): Promise<void> {
    const requestFrame = this.document.defaultView?.requestAnimationFrame
    if (!requestFrame) return Promise.resolve()
    return new Promise(resolve => requestFrame(() => resolve()))
  }

  destroy(): void {
    this.clearResult()
    this.element.remove()
  }

  private open(): void {
    if (this.element.open) return
    if (typeof this.element.showModal === 'function') this.element.showModal()
    else this.element.setAttribute('open', '')
  }

  private close(): void {
    if (typeof this.element.close === 'function') this.element.close()
    else {
      this.element.removeAttribute('open')
      this.clearResult()
      this.options.onDismiss()
    }
  }

  private createChoice(
    kind: 'width' | 'font-size',
    value: WidthPreset | FontSizePreset,
    label: string,
  ): HTMLButtonElement {
    const button = this.document.createElement('button')
    button.type = 'button'
    button.className = 'dsh-share-dialog__choice'
    button.dataset.dshShareChoice = kind
    button.dataset.value = value
    button.textContent = label
    button.addEventListener('click', () => {
      const next = kind === 'width'
        ? { ...this.currentSettings, width: value as WidthPreset }
        : { ...this.currentSettings, fontSize: value as FontSizePreset }
      if (next.width === this.currentSettings.width && next.fontSize === this.currentSettings.fontSize) return
      this.currentSettings = next
      saveShareSettings(this.storage, next)
      this.updateControlState()
      this.options.onSettingsChange(this.settings)
    })
    return button
  }

  private updateControlState(): void {
    for (const button of this.choiceButtons) {
      const selected = button.dataset.dshShareChoice === 'width'
        ? button.dataset.value === this.currentSettings.width
        : button.dataset.value === this.currentSettings.fontSize
      button.setAttribute('aria-pressed', String(selected))
    }
    this.hideProcessInput.checked = this.currentSettings.hideProcess
  }

  private clearResult(): void {
    this.clearImageResult()
  }

  private clearImageResult(): void {
    this.blob = undefined
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl)
    this.objectUrl = undefined
    this.image.removeAttribute('src')
    this.status.textContent = ''
    this.element.ariaBusy = 'false'
  }

  private async copy(): Promise<void> {
    if (!this.blob) return
    const strings = t(this.options.getLocale())
    const clipboard = this.document.defaultView?.navigator.clipboard
    const ClipboardItemConstructor = this.document.defaultView?.ClipboardItem
    if (!clipboard?.write || !ClipboardItemConstructor) {
      this.status.textContent = strings.copyUnsupported
      return
    }

    try {
      await clipboard.write([new ClipboardItemConstructor({ 'image/png': this.blob })])
      this.status.textContent = strings.copied
    } catch (error) {
      console.warn('[dsh-share] Failed to copy image', error)
      this.status.textContent = strings.copyFailed
    }
  }

  private download(): void {
    if (!this.objectUrl) return
    const anchor = this.document.createElement('a')
    anchor.href = this.objectUrl
    anchor.download = createFilename('png')
    anchor.click()
  }

}

export interface ShareSelectionSnapshot {
  active: boolean
  allSelected: boolean
  count: number
  selectedIds: ReadonlySet<string>
  total: number
}

interface SelectableTurn {
  answerAnchors: HTMLElement[]
  content: TurnContent
  id: string
  questionAnchor: HTMLElement
  turn: number
}

interface SessionSelection extends ObservableSnapshot<ShareSelectionSnapshot> {
  available: Map<string, SelectableTurn>
  contentClickHandler?: EventListener
  footer?: HTMLElement
  listeners: Set<() => void>
  observer?: MutationObserver
  refreshScheduled: boolean
  resizeObserver?: ResizeObserver
  scroll?: HTMLElement
  selected: Map<string, SelectedTurn>
  selectNewTurns: boolean
  sessionId: string
  snapshots: Map<string, SelectedTurn>
  snapshot: ShareSelectionSnapshot
}

export interface ShareRuntime {
  readonly document: Document
  getLocale(): ShareLocale
  selectionFor(sessionId: string): ObservableSnapshot<ShareSelectionSnapshot>
  enterSelection(sessionId: string, source?: HTMLElement, initialTurn?: number): void
  cancelSelection(sessionId: string): void
  toggleSelection(sessionId: string, turnId: string): void
  openSelected(sessionId: string): void
  dispose(): void
}

function selectableTurns(root: ParentNode): SelectableTurn[] {
  const turns: SelectableTurn[] = []
  for (const { content, turn } of findRenderedTurns(root)) {
    const questionAnchor = content.prompts[0]
    if (!questionAnchor || content.answers.length === 0) continue
    turns.push({
      answerAnchors: content.answers,
      content,
      id: String(turn),
      questionAnchor,
      turn,
    })
  }
  return turns.sort((left, right) => left.turn - right.turn)
}

const SELECTION_OWNED_SELECTOR = [
  '[data-dsh-share-selection-footer]',
  '[data-dsh-share-select-region]',
].join(',')

function isSelectionOwnedNode(node: Node): boolean {
  const element = node instanceof Element ? node : node.parentElement
  return Boolean(element?.matches(SELECTION_OWNED_SELECTOR) || element?.closest(SELECTION_OWNED_SELECTOR))
}

/** 插件自己的 footer、勾选框和文案更新不应再次触发整轮扫描。 */
function mutationNeedsSelectionRefresh(record: MutationRecord): boolean {
  if (isSelectionOwnedNode(record.target)) return false
  const changedNodes = [...record.addedNodes, ...record.removedNodes]
  return changedNodes.length === 0 || changedNodes.some(node => !isSelectionOwnedNode(node))
}

function makeButton(document: Document, dataName: string): HTMLButtonElement {
  const button = document.createElement('button')
  button.type = 'button'
  button.dataset[dataName] = ''
  return button
}

function appendResponsiveLabel(
  document: Document,
  button: HTMLButtonElement,
  wide: string,
  compact: string,
): void {
  const wideLabel = document.createElement('span')
  wideLabel.dataset.dshShareLabel = 'wide'
  wideLabel.textContent = wide
  const compactLabel = document.createElement('span')
  compactLabel.dataset.dshShareLabel = 'compact'
  compactLabel.textContent = compact
  button.ariaLabel = wide
  button.append(wideLabel, compactLabel)
}

export function createShareRuntime(document: Document, options: InstallOptions = {}): ShareRuntime {
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = STYLE_TEXT
  document.head.append(style)

  const renderImage = options.renderImage ?? renderShareImage
  const currentLocale = options.getLocale ?? (() => getDocumentLocale(document))
  let activeContent: readonly ShareMessage[] | undefined
  let activeGroupCount = 0
  let renderEpoch = 0
  let pendingRender: RenderRequest | undefined
  let renderRunning = false
  let settingsRenderTimer: number | undefined
  let dialog: PreviewDialog
  const selections = new Map<string, SessionSelection>()

  const preserveScrollPosition = (scroll: HTMLElement, scrollTop: number): void => {
    const previousOverflowAnchor = scroll.style.overflowAnchor
    scroll.style.overflowAnchor = 'none'
    scroll.scrollTop = scrollTop
    const requestFrame = document.defaultView?.requestAnimationFrame
    if (!requestFrame) {
      scroll.style.overflowAnchor = previousOverflowAnchor
      return
    }
    // React 插槽会在状态发布后再提交一次 DOM；跨两帧锁住位置，避开浏览器自动滚动锚定。
    requestFrame(() => {
      scroll.scrollTop = scrollTop
      requestFrame(() => {
        scroll.scrollTop = scrollTop
        scroll.style.overflowAnchor = previousOverflowAnchor
      })
    })
  }

  const selectionFor = (sessionId: string): SessionSelection => {
    const existing = selections.get(sessionId)
    if (existing) return existing
    const listeners = new Set<() => void>()
    const controller: SessionSelection = {
      available: new Map(),
      refreshScheduled: false,
      selected: new Map(),
      selectNewTurns: true,
      sessionId,
      snapshots: new Map(),
      snapshot: { active: false, allSelected: false, count: 0, selectedIds: new Set(), total: 0 },
      listeners,
      getSnapshot: () => controller.snapshot,
      subscribe: (listener) => {
        listeners.add(listener)
        return () => listeners.delete(listener)
      },
    }
    selections.set(sessionId, controller)
    return controller
  }

  const publishSelection = (controller: SessionSelection, active: boolean): void => {
    const total = controller.available.size
    controller.snapshot = {
      active,
      allSelected: total > 0 && controller.selected.size === total,
      count: controller.selected.size,
      selectedIds: new Set(controller.selected.keys()),
      total,
    }
    if (controller.scroll) {
      for (const button of controller.scroll.querySelectorAll<HTMLButtonElement>(
        '[data-dsh-share-turn-select]',
      )) {
        const id = button.dataset.turnId ?? ''
        const selected = controller.selected.has(id)
        button.setAttribute('aria-checked', String(selected))
        button.ariaLabel = selected ? t(currentLocale()).unselectTurn : t(currentLocale()).selectTurn
      }
    }
    if (controller.footer) {
      const strings = t(currentLocale())
      const all = controller.footer.querySelector<HTMLButtonElement>('[data-dsh-share-select-all]')
      const count = controller.footer.querySelector<HTMLElement>('[data-dsh-share-selection-count]')
      const markdown = controller.footer.querySelector<HTMLButtonElement>('[data-dsh-share-selection-markdown]')
      const create = controller.footer.querySelector<HTMLButtonElement>('[data-dsh-share-selection-create]')
      all?.setAttribute('aria-checked', String(controller.snapshot.allSelected))
      const nextCount = strings.selectedCount(controller.selected.size)
      // footer 位于被观察的会话区域内；仅在文案变化时写入，避免自身触发 MutationObserver 循环。
      if (count && count.textContent !== nextCount) count.textContent = nextCount
      if (markdown) markdown.disabled = controller.selected.size === 0
      if (create) create.disabled = controller.selected.size === 0
    }
    for (const listener of controller.listeners) listener()
  }

  const cleanupSelectionDom = (controller: SessionSelection): void => {
    const scroll = controller.scroll
    const scrollTop = scroll?.scrollTop
    controller.observer?.disconnect()
    controller.observer = undefined
    controller.resizeObserver?.disconnect()
    controller.resizeObserver = undefined
    controller.footer?.remove()
    controller.footer = undefined
    if (scroll) {
      if (controller.contentClickHandler) {
        scroll.removeEventListener('click', controller.contentClickHandler)
      }
      controller.contentClickHandler = undefined
      for (const region of scroll.querySelectorAll('[data-dsh-share-select-region]')) region.remove()
      for (const button of scroll.querySelectorAll('[data-dsh-share-turn-select]')) button.remove()
      for (const content of scroll.querySelectorAll<HTMLElement>('[data-dsh-share-select-content]')) {
        delete content.dataset.dshShareSelectContent
        delete content.dataset.dshShareSelectTurnId
      }
      for (const anchor of scroll.querySelectorAll<HTMLElement>('[data-dsh-share-select-anchor]')) {
        delete anchor.dataset.dshShareSelectAnchor
      }
      for (const root of scroll.querySelectorAll<HTMLElement>('[data-dsh-share-select-range-root]')) {
        delete root.dataset.dshShareSelectRangeRoot
      }
      delete scroll.dataset.dshShareSelection
      if (scrollTop !== undefined) {
        preserveScrollPosition(scroll, scrollTop)
      }
    }
    controller.scroll = undefined
    controller.refreshScheduled = false
  }

  const resetSelection = (controller: SessionSelection): void => {
    cleanupSelectionDom(controller)
    controller.available.clear()
    controller.selected.clear()
    controller.selectNewTurns = true
    controller.snapshots.clear()
    publishSelection(controller, false)
  }

  const snapshotTurn = (controller: SessionSelection, turn: SelectableTurn): SelectedTurn => {
    const existing = controller.snapshots.get(turn.id)
    if (existing) return existing
    const snapshot: SelectedTurn = {
      content: snapshotTurnContent(turn.content),
      id: turn.id,
      turn: turn.turn,
    }
    controller.snapshots.set(turn.id, snapshot)
    return snapshot
  }

  const toggleSelection = (controller: SessionSelection, turnId: string): void => {
    if (!controller.snapshot.active) return
    const turn = controller.available.get(turnId)
    if (!turn) return
    controller.selectNewTurns = false
    if (controller.selected.has(turnId)) controller.selected.delete(turnId)
    else controller.selected.set(turnId, snapshotTurn(controller, turn))
    publishSelection(controller, true)
  }

  const toggleAll = (controller: SessionSelection): void => {
    if (controller.snapshot.allSelected) {
      controller.selected.clear()
      controller.selectNewTurns = false
    } else {
      controller.selected = new Map(
        [...controller.available.values()].map(turn => [turn.id, snapshotTurn(controller, turn)]),
      )
      controller.selectNewTurns = true
    }
    publishSelection(controller, true)
  }

  const createTurnSelectionButton = (
    controller: SessionSelection,
    turn: SelectableTurn,
    kind: 'question' | 'answer',
  ): HTMLButtonElement => {
    const button = makeButton(document, 'dshShareTurnSelect')
    button.role = 'checkbox'
    button.dataset.turnId = turn.id
    button.dataset.dshShareTurnSelectKind = kind
    const box = document.createElement('span')
    box.dataset.dshShareTurnSelectBox = ''
    button.append(box)
    button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      toggleSelection(controller, button.dataset.turnId ?? '')
    })
    return button
  }

  const attachSelectionContent = (
    turn: SelectableTurn,
    anchor: HTMLElement,
    kind: 'question' | 'answer',
  ): void => {
    anchor.dataset.dshShareSelectContent = kind
    anchor.dataset.dshShareSelectTurnId = turn.id
  }

  const attachQuestionSelectionButton = (
    controller: SessionSelection,
    turn: SelectableTurn,
  ): void => {
    const anchor = turn.questionAnchor
    anchor.dataset.dshShareSelectAnchor = ''
    attachSelectionContent(turn, anchor, 'question')
    let region = [...anchor.children].find(child =>
      child instanceof HTMLElement && child.dataset.dshShareSelectRegion === 'question') as HTMLElement | undefined
    if (!region) {
      region = document.createElement('div')
      region.dataset.dshShareSelectRegion = 'question'
      region.append(createTurnSelectionButton(controller, turn, 'question'))
      anchor.prepend(region)
    }
    const button = region.querySelector<HTMLButtonElement>('[data-dsh-share-turn-select]')
    if (button) button.dataset.turnId = turn.id
  }

  /**
   * DSH 把思考、工具调用和最终回答渲染为多个兄弟节点。
   * 因此在共同父容器上建立一个覆盖整段回答的绝对定位区间，
   * 内层 sticky 按钮才能像官网一样在长回答中吸顶，并在本轮回答末尾被推走。
   */
  const attachAnswerSelectionButton = (
    controller: SessionSelection,
    turn: SelectableTurn,
  ): void => {
    const first = turn.answerAnchors[0]
    const last = turn.answerAnchors.at(-1)
    const root = first?.parentElement
    if (!first || !last || !root || last.parentElement !== root) return
    for (const anchor of turn.answerAnchors) attachSelectionContent(turn, anchor, 'answer')
    root.dataset.dshShareSelectRangeRoot = ''
    controller.resizeObserver?.observe(root)
    let region = [...root.children].find(child =>
      child instanceof HTMLElement
      && child.dataset.dshShareSelectRegion === 'answer'
      && child.dataset.turnId === turn.id) as HTMLElement | undefined
    if (!region) {
      region = document.createElement('div')
      region.dataset.dshShareSelectRegion = 'answer'
      region.dataset.turnId = turn.id
      const sticky = document.createElement('div')
      sticky.dataset.dshShareSelectSticky = ''
      sticky.append(createTurnSelectionButton(controller, turn, 'answer'))
      region.append(sticky)
      root.append(region)
    }
    const rootRect = root.getBoundingClientRect()
    const firstRect = first.getBoundingClientRect()
    const lastRect = last.getBoundingClientRect()
    region.style.top = `${Math.max(0, firstRect.top - rootRect.top)}px`
    region.style.height = `${Math.max(44, lastRect.bottom - firstRect.top)}px`
    const button = region.querySelector<HTMLButtonElement>('[data-dsh-share-turn-select]')
    if (button) button.dataset.turnId = turn.id
  }

  const attachSelectionButtons = (
    controller: SessionSelection,
    turn: SelectableTurn,
  ): void => {
    attachQuestionSelectionButton(controller, turn)
    attachAnswerSelectionButton(controller, turn)
  }

  const refreshSelection = (controller: SessionSelection): void => {
    const scroll = controller.scroll
    if (!scroll || !controller.snapshot.active) return
    for (const turn of selectableTurns(scroll)) {
      const isNew = !controller.available.has(turn.id)
      controller.available.set(turn.id, turn)
      if (isNew && controller.selectNewTurns) {
        controller.selected.set(turn.id, snapshotTurn(controller, turn))
      }
      attachSelectionButtons(controller, turn)
    }
    publishSelection(controller, true)
  }

  const scheduleRefresh = (controller: SessionSelection): void => {
    if (controller.refreshScheduled) return
    controller.refreshScheduled = true
    Promise.resolve().then(() => {
      controller.refreshScheduled = false
      refreshSelection(controller)
    })
  }

  const createSelectionFooter = (controller: SessionSelection): HTMLElement => {
    const strings = t(currentLocale())
    const footer = document.createElement('div')
    footer.dataset.dshShareSelectionFooter = ''
    const inner = document.createElement('div')
    inner.dataset.dshShareSelectionFooterInner = ''

    const selectAll = makeButton(document, 'dshShareSelectAll')
    selectAll.role = 'checkbox'
    selectAll.ariaLabel = strings.selectAll
    const selectAllBox = document.createElement('span')
    selectAllBox.dataset.dshShareSelectAllBox = ''
    const selectAllLabel = document.createElement('span')
    selectAllLabel.textContent = strings.selectAll
    selectAll.append(selectAllBox, selectAllLabel)
    selectAll.addEventListener('click', () => toggleAll(controller))

    const divider = document.createElement('span')
    divider.dataset.dshShareSelectionDivider = ''
    const count = document.createElement('span')
    count.dataset.dshShareSelectionCount = ''

    const cancel = makeButton(document, 'dshShareSelectionCancel')
    cancel.textContent = strings.cancelSelection
    cancel.addEventListener('click', () => resetSelection(controller))

    const markdown = makeButton(document, 'dshShareSelectionMarkdown')
    appendResponsiveLabel(
      document,
      markdown,
      strings.downloadMarkdown,
      strings.downloadMarkdownCompact,
    )
    markdown.addEventListener('click', () => {
      const messages = selectedTurnsToShareMessages(controller.selected.values())
      if (messages.length === 0) return
      downloadMarkdownFile(document, createShareMarkdown(messages, currentLocale(), dialog.settings))
    })

    const create = makeButton(document, 'dshShareSelectionCreate')
    appendResponsiveLabel(
      document,
      create,
      strings.createSelection,
      strings.createSelectionCompact,
    )
    create.addEventListener('click', () => {
      const messages = selectedTurnsToShareMessages(controller.selected.values())
      if (messages.length === 0) return
      activeContent = messages
      activeGroupCount = controller.selected.size
      void renderContent(messages, activeGroupCount)
    })

    inner.append(selectAll, divider, count, cancel, markdown, create)
    footer.append(inner)
    return footer
  }

  const clearSettingsRenderTimer = (): void => {
    if (settingsRenderTimer === undefined) return
    document.defaultView?.clearTimeout(settingsRenderTimer)
    settingsRenderTimer = undefined
  }

  const createRenderRequest = (
    content: readonly ShareMessage[],
    groupCount: number,
    preservePreview = false,
    epoch = ++renderEpoch,
  ): RenderRequest => {
    const locale = currentLocale()
    const settings = dialog.settings
    dialog.showLoading(groupCount, preservePreview, true)
    return { content, epoch, locale, preservePreview, settings }
  }

  const executeRender = async (request: RenderRequest): Promise<void> => {
    const card = createShareCard(document, request.content, request.locale, request.settings)
    try {
      const blob = await renderImage(card.element)
      if (request.epoch === renderEpoch) {
        await dialog.showResult(blob, () => request.epoch === renderEpoch)
      }
    } catch (error) {
      if (request.epoch === renderEpoch) {
        console.warn('[dsh-share] Failed to render conversation image', error)
        dialog.showError(request.preservePreview)
      }
    } finally {
      card.dispose()
    }
  }

  /** 图片生成不可取消，因此只允许一个画布任务运行；等待中的请求只保留最新一次。 */
  const drainRenderQueue = async (): Promise<void> => {
    if (renderRunning) return
    renderRunning = true
    try {
      while (pendingRender) {
        const request = pendingRender
        pendingRender = undefined
        await executeRender(request)
      }
    } finally {
      renderRunning = false
      if (pendingRender) void drainRenderQueue()
    }
  }

  const renderContent = (
    content: readonly ShareMessage[],
    groupCount: number,
    preservePreview = false,
  ): void => {
    clearSettingsRenderTimer()
    pendingRender = createRenderRequest(content, groupCount, preservePreview)
    void drainRenderQueue()
  }

  const scheduleSettingsRender = (
    content: readonly ShareMessage[],
    groupCount: number,
  ): void => {
    clearSettingsRenderTimer()
    pendingRender = undefined
    const epoch = ++renderEpoch
    dialog.showPendingUpdate()
    const window = document.defaultView
    if (!window) {
      pendingRender = createRenderRequest(content, groupCount, true, epoch)
      void drainRenderQueue()
      return
    }
    // 连续点击宽度、字号或过程开关时，只渲染用户最终停留的设置。
    settingsRenderTimer = window.setTimeout(() => {
      settingsRenderTimer = undefined
      if (epoch !== renderEpoch) return
      pendingRender = createRenderRequest(content, groupCount, true, epoch)
      void drainRenderQueue()
    }, 80)
  }

  const invalidateRenderQueue = (): void => {
    clearSettingsRenderTimer()
    pendingRender = undefined
    renderEpoch += 1
  }

  dialog = new PreviewDialog(document, {
    getLocale: currentLocale,
    onSettingsChange: () => {
      if (activeContent) scheduleSettingsRender(activeContent, activeGroupCount)
    },
    onDismiss: () => {
      activeContent = undefined
      activeGroupCount = 0
      invalidateRenderQueue()
    },
  })

  const enterSelection = (sessionId: string, source?: HTMLElement, initialTurn?: number): void => {
    for (const [id, other] of selections) {
      if (id !== sessionId && other.snapshot.active) resetSelection(other)
    }
    const controller = selectionFor(sessionId)
    if (controller.snapshot.active) return
    resetSelection(controller)
    const root = source?.closest<HTMLElement>('[data-phase]')
    const scroll = root?.querySelector<HTMLElement>('[data-conversation-scroll]')
      ?? document.querySelector<HTMLElement>('[data-conversation-scroll]')
    if (!scroll) return
    const scrollTop = scroll.scrollTop
    controller.scroll = scroll
    controller.selectNewTurns = initialTurn === undefined
    scroll.dataset.dshShareSelection = ''
    controller.contentClickHandler = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('[data-dsh-share-turn-select]')) return
      const content = target.closest<HTMLElement>('[data-dsh-share-select-content]')
      if (!content || !scroll.contains(content)) return
      event.preventDefault()
      event.stopPropagation()
      toggleSelection(controller, content.dataset.dshShareSelectTurnId ?? '')
    }
    scroll.addEventListener('click', controller.contentClickHandler)
    const ResizeObserverConstructor = document.defaultView?.ResizeObserver
    if (ResizeObserverConstructor) {
      controller.resizeObserver = new ResizeObserverConstructor(() => scheduleRefresh(controller))
      controller.resizeObserver.observe(scroll)
    }
    publishSelection(controller, true)
    refreshSelection(controller)
    if (initialTurn !== undefined) {
      const selected = controller.available.get(String(initialTurn))
      if (selected) controller.selected.set(selected.id, snapshotTurn(controller, selected))
    }
    controller.footer = createSelectionFooter(controller)
    scroll.append(controller.footer)
    publishSelection(controller, true)
    const MutationObserverConstructor = document.defaultView?.MutationObserver
    if (MutationObserverConstructor) {
      controller.observer = new MutationObserverConstructor((records) => {
        if (records.some(mutationNeedsSelectionRefresh)) scheduleRefresh(controller)
      })
      controller.observer.observe(scroll, { childList: true, subtree: true })
    }
    preserveScrollPosition(scroll, scrollTop)
  }

  let disposed = false
  return {
    document,
    getLocale: currentLocale,
    selectionFor,
    enterSelection,
    cancelSelection: (sessionId) => {
      resetSelection(selectionFor(sessionId))
    },
    toggleSelection: (sessionId, turnId) => toggleSelection(selectionFor(sessionId), turnId),
    openSelected: (sessionId) => {
      const controller = selectionFor(sessionId)
      const messages = selectedTurnsToShareMessages(controller.selected.values())
      if (messages.length === 0) return
      activeContent = messages
      activeGroupCount = controller.selected.size
      void renderContent(messages, activeGroupCount)
    },
    dispose: () => {
      if (disposed) return
      disposed = true
      activeContent = undefined
      activeGroupCount = 0
      invalidateRenderQueue()
      for (const controller of selections.values()) {
        cleanupSelectionDom(controller)
        controller.listeners.clear()
        controller.available.clear()
        controller.selected.clear()
        controller.snapshots.clear()
      }
      selections.clear()
      style.remove()
      dialog.destroy()
    },
  }
}

interface ShareRuntimeInjected {
  hooks: {
    shareLocale: ObservableSnapshot<LocaleSnapshot>
    shareSelection: ObservableSnapshot<ShareSelectionSnapshot>
  }
  shareRuntime: ShareRuntime
}

export type ShareActionProps =
  PropsRuntime<'conversation.chat.assistant-actions'>
  & InjectFace<ShareRuntimeInjected>

export type ShareConversationActionProps =
  PropsRuntime<'conversation.session.header.utilities'>
  & InjectFace<ShareRuntimeInjected>

/** 官方 assistant-actions 插槽中的分享入口。 */
export function ShareAction({
  messageId, sessionId, shareRuntime, useSession, useShareLocale, useShareSelection,
}: ShareActionProps): ReactElement {
  const strings = t(useShareLocale(snapshot => snapshot.active))
  const selection = useShareSelection(snapshot => snapshot)
  const turn = useSession((snapshot) => {
    for (const node of snapshot.chat.nodes.values()) {
      if (node.kind !== 'turn-tail') continue
      // rc.6 的公共 ChatNode 泛型在第三方包里仍把 data 暴露为 unknown；
      // 这里只读取官方 turn-tail 已稳定声明的两个字段。
      const data = node.data as {
        closing?: { finalNode: { messageId?: string } } | null
        turn: number
      }
      if (data.closing?.finalNode.messageId === messageId) return data.turn
    }
    return 0
  })
  if (selection.active) return createElement(Fragment)
  const button = createElement('button',
    {
      type: 'button',
      'data-dsh-share-button': '',
      'aria-label': strings.share,
      onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
        shareRuntime.enterSelection(String(sessionId), event.currentTarget, turn)
      },
    },
    createElement(IconShareOutline16, { size: 16 }),
  )
  return createElement(Tooltip, { label: strings.shareTooltip, side: 'bottom', children: button })
}

/** 官方 Session Header 右侧 utilities 插槽中的多轮分享入口。 */
export function ShareConversationAction({
  sessionId, shareRuntime, useShareLocale, useShareSelection,
}: ShareConversationActionProps): ReactElement {
  const strings = t(useShareLocale(snapshot => snapshot.active))
  const selection = useShareSelection(snapshot => snapshot)
  if (selection.active) return createElement(Fragment)
  const button = createElement('button', {
      type: 'button',
      'data-dsh-share-conversation': '',
      'aria-label': strings.shareConversation,
      onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
        shareRuntime.enterSelection(String(sessionId), event.currentTarget)
      },
    }, createElement(IconShareOutline16, { size: 16 }))
  return createElement(Tooltip, { label: strings.shareConversation, side: 'bottom', children: button })
}

export function apply(ctx: ClientContext): void {
  let sharedRuntime: ShareRuntime | undefined
  let registrations = 0
  const runtimeForRegistration = (): ShareRuntime => {
    sharedRuntime ??= createShareRuntime(document, {
      getLocale: () => ctx.locale.getLocale().active,
    })
    return sharedRuntime
  }
  const injectFace = (sessionId: unknown): ShareRuntimeInjected => {
    const runtime = runtimeForRegistration()
    return {
      hooks: {
        shareLocale: ctx.locale,
        shareSelection: runtime.selectionFor(String(sessionId)),
      },
      shareRuntime: runtime,
    }
  }
  const cleanup = (disposeRegistration: () => void): (() => void) => {
    registrations += 1
    return () => {
      disposeRegistration()
      registrations -= 1
      if (registrations === 0) {
        sharedRuntime?.dispose()
        sharedRuntime = undefined
      }
    }
  }
  ctx.slots.inject('conversation.chat.assistant-actions', () => {
    const disposeRegistration = ctx.slots.register({
      name: 'conversation.chat.assistant-actions',
      id: 'share',
      order: 20,
      inject: injectFace,
    }, ShareAction)
    return cleanup(disposeRegistration)
  })
  ctx.slots.inject('conversation.session.header.utilities', () => {
    const disposeRegistration = ctx.slots.register({
      name: 'conversation.session.header.utilities',
      id: 'share-conversation',
      order: -10,
      inject: injectFace,
    }, ShareConversationAction)
    return cleanup(disposeRegistration)
  })
}

export { createShareCard } from './card.ts'
export { createShareMarkdown } from './markdown.ts'
export { findTurnContent, findTurnContentFromAction } from './dom.ts'
export {
  DEFAULT_SHARE_SETTINGS,
  FONT_SIZE_PRESETS,
  loadShareSettings,
  saveShareSettings,
  WIDTH_PRESETS,
  type FontSizePreset,
  type ShareSettings,
  type WidthPreset,
} from './settings.ts'
