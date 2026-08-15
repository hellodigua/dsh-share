import type { ObservableSnapshot } from '@deepseek-ai/dsh-client-runtime/client'
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
import { getDocumentLocale, t, type ShareLocale } from './i18n.ts'
import { createShareMarkdown } from './markdown.ts'
import {
  PreviewDialog,
  downloadMarkdownFile,
  renderShareImage,
  type ImageRenderer,
} from './preview-dialog.ts'
import type { ShareSettings } from './settings.ts'
import { STYLE_ID, STYLE_TEXT } from './styles.ts'

export interface InstallOptions {
  getLocale?: () => ShareLocale
  renderImage?: ImageRenderer
  subscribeLocale?: (listener: () => void) => () => void
}

interface RenderRequest {
  content: readonly ShareMessage[]
  epoch: number
  locale: 'zh' | 'en'
  preservePreview: boolean
  settings: ShareSettings
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

function updateResponsiveLabel(
  button: HTMLButtonElement,
  wide: string,
  compact: string,
): void {
  if (button.ariaLabel !== wide) button.ariaLabel = wide
  const wideLabel = button.querySelector<HTMLElement>('[data-dsh-share-label="wide"]')
  const compactLabel = button.querySelector<HTMLElement>('[data-dsh-share-label="compact"]')
  if (wideLabel && wideLabel.textContent !== wide) wideLabel.textContent = wide
  if (compactLabel && compactLabel.textContent !== compact) compactLabel.textContent = compact
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
  let dialog: PreviewDialog | undefined
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

  const refreshSelectionCopy = (controller: SessionSelection): void => {
    const strings = t(currentLocale())
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
      const all = controller.footer.querySelector<HTMLButtonElement>('[data-dsh-share-select-all]')
      const allLabel = controller.footer.querySelector<HTMLElement>('[data-dsh-share-select-all-label]')
      const count = controller.footer.querySelector<HTMLElement>('[data-dsh-share-selection-count]')
      const cancel = controller.footer.querySelector<HTMLButtonElement>('[data-dsh-share-selection-cancel]')
      const markdown = controller.footer.querySelector<HTMLButtonElement>('[data-dsh-share-selection-markdown]')
      const create = controller.footer.querySelector<HTMLButtonElement>('[data-dsh-share-selection-create]')
      if (all) {
        all.setAttribute('aria-checked', String(controller.snapshot.allSelected))
        if (all.ariaLabel !== strings.selectAll) all.ariaLabel = strings.selectAll
      }
      if (allLabel && allLabel.textContent !== strings.selectAll) allLabel.textContent = strings.selectAll
      const nextCount = strings.selectedCount(controller.selected.size)
      // footer 位于被观察的会话区域内；仅在文案变化时写入，避免自身触发 MutationObserver 循环。
      if (count && count.textContent !== nextCount) count.textContent = nextCount
      if (cancel && cancel.textContent !== strings.cancelSelection) cancel.textContent = strings.cancelSelection
      if (markdown) {
        updateResponsiveLabel(markdown, strings.downloadMarkdown, strings.downloadMarkdownCompact)
      }
      if (create) {
        updateResponsiveLabel(create, strings.createSelection, strings.createSelectionCompact)
      }
      if (markdown) markdown.disabled = controller.selected.size === 0
      if (create) create.disabled = controller.selected.size === 0
    }
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
    refreshSelectionCopy(controller)
    for (const listener of controller.listeners) listener()
  }

  let unsubscribeLocale: (() => void) | undefined
  const subscribeSelectionLocale = (): void => {
    if (unsubscribeLocale || !options.subscribeLocale) return
    unsubscribeLocale = options.subscribeLocale(() => {
      for (const controller of selections.values()) {
        if (controller.snapshot.active) refreshSelectionCopy(controller)
      }
    })
  }
  const unsubscribeSelectionLocaleIfIdle = (): void => {
    if ([...selections.values()].some(controller => controller.snapshot.active)) return
    unsubscribeLocale?.()
    unsubscribeLocale = undefined
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
    unsubscribeSelectionLocaleIfIdle()
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
    selectAllLabel.dataset.dshShareSelectAllLabel = ''
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
      downloadMarkdownFile(document, createShareMarkdown(messages, currentLocale(), ensureDialog().settings))
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
    const preview = ensureDialog()
    const settings = preview.settings
    preview.showLoading(groupCount, preservePreview, true)
    return { content, epoch, locale, preservePreview, settings }
  }

  const executeRender = async (request: RenderRequest): Promise<void> => {
    const preview = ensureDialog()
    const card = createShareCard(document, request.content, request.locale, request.settings)
    try {
      const blob = await renderImage(card.element)
      if (request.epoch === renderEpoch) {
        await preview.showResult(blob, () => request.epoch === renderEpoch)
      }
    } catch (error) {
      if (request.epoch === renderEpoch) {
        console.warn('[dsh-share] Failed to render conversation image', error)
        preview.showError(request.preservePreview)
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
    dialog?.showPendingUpdate()
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

  function ensureDialog(): PreviewDialog {
    if (dialog) return dialog
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
    return dialog
  }

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
    subscribeSelectionLocale()
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
      unsubscribeLocale?.()
      unsubscribeLocale = undefined
      style.remove()
      dialog?.destroy()
      dialog = undefined
    },
  }
}
