import { toBlob } from 'html-to-image'
import { t, type ShareLocale, type Translation } from './i18n.ts'
import {
  loadShareSettings,
  saveShareSettings,
  WIDTH_PRESETS,
  type FontSizePreset,
  type ShareSettings,
  type WidthPreset,
} from './settings.ts'

const TRANSPARENT_IMAGE_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

export type ImageRenderer = (element: HTMLElement) => Promise<Blob>

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

export function downloadMarkdownFile(document: Document, markdown: string): void {
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

export class PreviewDialog {
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
