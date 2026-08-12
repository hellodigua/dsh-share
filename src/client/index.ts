import { toBlob } from 'html-to-image'
import { createShareCard } from './card.ts'
import {
  findActionRow,
  findTurnContent,
  SHARE_BUTTON_SELECTOR,
  TURN_TAIL_SELECTOR,
  type TurnContent,
} from './dom.ts'
import {
  loadShareSettings,
  saveShareSettings,
  WIDTH_PRESETS,
  type FontSizePreset,
  type ShareSettings,
  type WidthPreset,
} from './settings.ts'

export const name = '@dsh-external/dsh-share/client'

interface ClientContext {
  effect(callback: () => void | (() => void), label?: string): void
}

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
  opacity: .72;
  padding: 6px;
  width: 28px;
}
[data-dsh-share-button]:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12));
  color: var(--dsw-alias-label-secondary, currentColor);
  opacity: 1;
}
[data-dsh-share-button]:disabled { cursor: wait; opacity: .38; }
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

const SHARE_ICON = `
<svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
  <circle cx="4" cy="8" r="1.75" stroke="currentColor" stroke-width="1.4"/>
  <circle cx="12" cy="4" r="1.75" stroke="currentColor" stroke-width="1.4"/>
  <circle cx="12" cy="12" r="1.75" stroke="currentColor" stroke-width="1.4"/>
  <path d="m5.55 7.23 4.9-2.45M5.55 8.77l4.9 2.45" stroke="currentColor" stroke-linecap="round" stroke-width="1.4"/>
</svg>`

export type ImageRenderer = (element: HTMLElement) => Promise<Blob>

export interface InstallOptions {
  renderImage?: ImageRenderer
}

interface Translation {
  title: string
  share: string
  loading: string
  copy: string
  download: string
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

function getLocale(document: Document): 'zh' | 'en' {
  return document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

function t(document: Document): Translation {
  if (getLocale(document) === 'zh') {
    return {
      title: '分享当前问答',
      share: '将当前问答分享为图片',
      loading: '正在生成图片…',
      copy: '复制图片',
      download: '下载 PNG',
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
    share: 'Share this Q&A as an image',
    loading: 'Generating image…',
    copy: 'Copy image',
    download: 'Download PNG',
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

function createFilename(now = new Date()): string {
  const pad = (number: number): string => String(number).padStart(2, '0')
  return `dsh-share-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.png`
}

interface PreviewDialogOptions {
  onSettingsChange(settings: ShareSettings): void
  onDismiss(): void
}

class PreviewDialog {
  readonly element: HTMLDialogElement
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
    const strings = t(document)
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

    const title = dialog.querySelector('[data-dsh-share-title]') as HTMLElement
    const close = dialog.querySelector('[data-dsh-share-close]') as HTMLButtonElement
    const widthLabel = dialog.querySelector('[data-dsh-share-width-label]') as HTMLElement
    const fontSizeLabel = dialog.querySelector('[data-dsh-share-font-size-label]') as HTMLElement
    const hideProcessLabel = dialog.querySelector('[data-dsh-share-hide-process-label]') as HTMLElement
    title.textContent = strings.title
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

  showLoading(preservePreview = false): void {
    const strings = t(this.document)
    const canPreserve = preservePreview && this.blob !== undefined && this.objectUrl !== undefined
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

    this.clearResult()
    this.message.hidden = false
    this.message.textContent = strings.loading
    this.image.hidden = true
    this.status.textContent = ''
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
    const strings = t(this.document)
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

    this.clearResult()
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
    this.blob = undefined
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl)
    this.objectUrl = undefined
    this.image.removeAttribute('src')
    this.status.textContent = ''
    this.element.ariaBusy = 'false'
  }

  private async copy(): Promise<void> {
    if (!this.blob) return
    const strings = t(this.document)
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
    anchor.download = createFilename()
    anchor.click()
  }
}

interface Runtime {
  owners: number
  dispose(): void
}

const installations = new WeakMap<Document, Runtime>()

export function installShareButton(document: Document, options: InstallOptions = {}): () => void {
  const current = installations.get(document)
  if (current) {
    current.owners += 1
    return createRelease(document, current)
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = STYLE_TEXT
  document.head.append(style)

  const renderImage = options.renderImage ?? renderShareImage
  let activeContent: TurnContent | undefined
  let renderEpoch = 0
  let dialog: PreviewDialog

  const renderContent = async (
    content: TurnContent,
    sourceButton?: HTMLButtonElement,
    preservePreview = false,
  ): Promise<void> => {
    const epoch = ++renderEpoch
    if (sourceButton) sourceButton.disabled = true
    dialog.showLoading(preservePreview)
    const card = createShareCard(document, content, getLocale(document), dialog.settings)
    try {
      const blob = await renderImage(card.element)
      if (epoch === renderEpoch) {
        await dialog.showResult(blob, () => epoch === renderEpoch)
      }
    } catch (error) {
      if (epoch === renderEpoch) {
        console.warn('[dsh-share] Failed to render conversation image', error)
        dialog.showError(preservePreview)
      }
    } finally {
      card.dispose()
      if (sourceButton) sourceButton.disabled = false
    }
  }

  dialog = new PreviewDialog(document, {
    onSettingsChange: () => {
      if (activeContent) void renderContent(activeContent, undefined, true)
    },
    onDismiss: () => {
      activeContent = undefined
      renderEpoch += 1
    },
  })

  const attach = (tail: HTMLElement): void => {
    const row = findActionRow(tail)
    if (!row) return

    const existing = tail.querySelector<HTMLButtonElement>(SHARE_BUTTON_SELECTOR)
    if (existing) {
      existing.title = t(document).share
      existing.ariaLabel = t(document).share
      return
    }

    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.dshShareButton = ''
    button.innerHTML = SHARE_ICON
    button.title = t(document).share
    button.ariaLabel = t(document).share
    button.addEventListener('click', () => {
      const content = findTurnContent(tail)
      if (!content) {
        dialog.showError()
        return
      }

      activeContent = content
      void renderContent(content, button)
    })

    const lastNativeButton = Array.from(row.querySelectorAll<HTMLButtonElement>('button')).at(-1)
    lastNativeButton?.insertAdjacentElement('afterend', button)
  }

  const scan = (root: ParentNode): void => {
    if (root instanceof HTMLElement && root.matches(TURN_TAIL_SELECTOR)) attach(root)
    for (const tail of root.querySelectorAll<HTMLElement>(TURN_TAIL_SELECTOR)) attach(tail)
  }

  const MutationObserverConstructor = document.defaultView?.MutationObserver
  if (!MutationObserverConstructor) throw new Error('MutationObserver is unavailable')
  const observer = new MutationObserverConstructor((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        scan(document)
        continue
      }
      if (mutation.target instanceof HTMLElement) scan(mutation.target)
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) scan(node)
      }
    }
  })
  observer.observe(document.documentElement, {
    attributeFilter: ['lang'],
    attributes: true,
    childList: true,
    subtree: true,
  })
  scan(document)

  const runtime: Runtime = {
    owners: 1,
    dispose: () => {
      activeContent = undefined
      renderEpoch += 1
      observer.disconnect()
      for (const button of document.querySelectorAll(SHARE_BUTTON_SELECTOR)) button.remove()
      document.getElementById(STYLE_ID)?.remove()
      dialog.destroy()
    },
  }
  installations.set(document, runtime)
  return createRelease(document, runtime)
}

function createRelease(document: Document, runtime: Runtime): () => void {
  let released = false
  return () => {
    if (released) return
    released = true
    release(document, runtime)
  }
}

function release(document: Document, runtime: Runtime): void {
  runtime.owners -= 1
  if (runtime.owners > 0) return
  runtime.dispose()
  installations.delete(document)
}

export function apply(ctx: ClientContext): void {
  ctx.effect(() => installShareButton(document), 'dsh-share: web UI')
}

export { createShareCard } from './card.ts'
export { findActionRow, findTurnContent } from './dom.ts'
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
