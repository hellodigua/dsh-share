import type { ShareMessage } from './content.ts'
import {
  DEFAULT_SHARE_SETTINGS,
  FONT_SIZE_PRESETS,
  WIDTH_PRESETS,
  type ShareSettings,
} from './settings.ts'

export interface ShareCard {
  element: HTMLElement
  dispose(): void
}

function applyStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(element.style, styles)
}

function normalizeText(text: string | null): string {
  return text?.replace(/\s+/g, ' ').trim() ?? ''
}

/** 把摘要行里的交互控件转为静态元素，同时保留当前运行时的 class 和图标。 */
function makeToolSummaryStatic(row: HTMLElement): void {
  for (const button of row.querySelectorAll<HTMLButtonElement>('button')) {
    const replacement = row.ownerDocument.createElement('span')
    for (const attribute of button.attributes) {
      if (attribute.name === 'class' || attribute.name === 'style' || attribute.name.startsWith('data-')) {
        replacement.setAttribute(attribute.name, attribute.value)
      }
    }
    replacement.append(...button.childNodes)
    button.replaceWith(replacement)
  }
  for (const control of row.querySelectorAll('input, textarea, select, [role="tooltip"]')) {
    control.remove()
  }
  for (const element of [row, ...row.querySelectorAll<HTMLElement>('*')]) {
    element.removeAttribute('aria-expanded')
    element.removeAttribute('data-expandable')
    element.removeAttribute('role')
    element.removeAttribute('tabindex')
  }
}

/**
 * 工具卡片内部可能包含展开面板和终端输出；这里只克隆原生折叠摘要行。
 * 摘要的运行时 class、图标和内容结构会被保留，不依赖写死的 CSS Module 类名。
 */
function cloneToolCallSummary(
  source: HTMLElement,
  locale: 'zh' | 'en',
): HTMLElement {
  const clone = source.ownerDocument.createElement('div')
  clone.dataset.dshShareMessage = ''
  clone.dataset.dshShareToolCall = ''
  const summaryRows = source.querySelectorAll<HTMLElement>(
    '[data-disclosure-row], [data-sample="bash"]',
  )

  for (const summary of summaryRows) {
    if (!normalizeText(summary.textContent)) continue
    const row = summary.cloneNode(true) as HTMLElement
    row.dataset.dshShareToolSummary = ''
    makeToolSummaryStatic(row)
    clone.append(row)
  }

  if (clone.childElementCount === 0) {
    const fallback = source.ownerDocument.createElement('div')
    fallback.dataset.dshShareToolSummary = ''
    fallback.textContent = locale === 'zh' ? '工具调用' : 'Tool call'
    clone.append(fallback)
  }

  applyStyles(clone, {
    boxSizing: 'border-box',
    margin: '0',
    maxWidth: 'none',
    width: '100%',
  })
  return clone
}

export function cloneShareMessage(
  source: HTMLElement,
  locale: 'zh' | 'en',
  hideReasoning = false,
): HTMLElement {
  if (source.dataset.chatFlowKind === 'tool-call') {
    return cloneToolCallSummary(source, locale)
  }

  const clone = source.cloneNode(true) as HTMLElement
  clone.dataset.dshShareMessage = ''

  if (hideReasoning) {
    for (const reasoning of clone.querySelectorAll<HTMLElement>('[data-variant="think"]')) {
      reasoning.remove()
    }
  }

  // 删除 hover 操作区，避免复制、分支和本插件按钮出现在分享图里。
  for (const hoverRoot of clone.querySelectorAll<HTMLElement>('[data-time-hover-root]')) {
    const last = hoverRoot.lastElementChild
    if (last?.querySelector('button')) last.remove()
  }
  for (const element of clone.querySelectorAll<HTMLElement>(
    'button, input, textarea, select, [data-dsh-share-button], [role="tooltip"]',
  )) {
    element.remove()
  }

  clone.removeAttribute('data-chat-anchor-key')
  clone.removeAttribute('data-chat-flow-key')
  clone.removeAttribute('data-chat-flow-kind')
  applyStyles(clone, {
    boxSizing: 'border-box',
    margin: '0',
    maxWidth: 'none',
    width: '100%',
  })
  return clone
}

/** 与图片和 Markdown 共用的回答过程过滤规则。 */
export function visibleAssistantElements(
  elements: readonly HTMLElement[],
  hideProcess: boolean,
): HTMLElement[] {
  return hideProcess
    ? elements.filter(element => element.dataset.chatFlowKind === 'assistant-step').slice(-1)
    : [...elements]
}

function createBrandWordmark(document: Document): HTMLElement {
  const container = document.createElement('div')
  container.dataset.dshShareWordmark = ''
  applyStyles(container, {
    alignItems: 'center',
    color: 'var(--dsw-alias-label-primary, #111827)',
    display: 'inline-flex',
    height: '18px',
    justifyContent: 'center',
  })

  // 直接复用 DSH 侧边栏的完整 BrandWordmark，保持 Logo、字形和徽标完全一致。
  const source = [...document.querySelectorAll<SVGSVGElement>('svg')]
    .find(svg => svg.getAttribute('viewBox') === '0 0 182 24')
  if (source) {
    const invertedColor = document.defaultView
      ?.getComputedStyle(source)
      .getPropertyValue('--dsw-alias-label-primary-inverted')
      .trim()
    container.style.setProperty('--dsw-alias-label-primary-inverted', invertedColor || '#fff')
    const wordmark = source.cloneNode(true) as SVGSVGElement
    wordmark.removeAttribute('class')
    wordmark.setAttribute('width', '137')
    wordmark.setAttribute('height', '18')
    wordmark.setAttribute('aria-hidden', 'true')
    wordmark.style.display = 'block'
    container.append(wordmark)
    return container
  }

  // 侧边栏收起时完整字标会卸载；后备样式仍保留鲸鱼 Logo + 品牌名。
  container.innerHTML = `
    <svg aria-hidden="true" fill="none" height="13" viewBox="0 0 23.16 17.04" width="18">
      <path d="M22.9168 1.43018C22.6713 1.31018 22.5658 1.53918 22.4223 1.65519C22.3733 1.69269 22.3318 1.74169 22.2903 1.78669C21.9317 2.1697 21.5127 2.42121 20.9657 2.39121C20.1657 2.34621 19.4827 2.59771 18.8787 3.20973C18.7502 2.45521 18.3236 2.0047 17.6746 1.71569C17.3351 1.56568 16.9916 1.41518 16.7536 1.08867C16.5876 0.856163 16.5421 0.597155 16.4591 0.341647C16.4061 0.187643 16.3536 0.0301382 16.1761 0.00363739C15.9836 -0.0263635 15.9081 0.135141 15.8326 0.270145C15.5306 0.822162 15.4136 1.43018 15.4251 2.0462C15.4516 3.43174 16.0366 4.53527 17.1991 5.3203C17.3311 5.4103 17.3651 5.5003 17.3236 5.63181C17.2441 5.90231 17.1501 6.16482 17.0671 6.43533C17.0141 6.60784 16.9351 6.64584 16.7501 6.57033C16.1121 6.30383 15.5611 5.90931 15.074 5.4328C14.2475 4.63328 13.5 3.75075 12.568 3.05973C12.349 2.89822 12.13 2.74822 11.9034 2.60522C10.9524 1.68169 12.028 0.923165 12.277 0.833162C12.5375 0.739159 12.3675 0.41615 11.5259 0.42015C10.6844 0.42365 9.91439 0.705658 8.93286 1.08117C8.78935 1.13767 8.63835 1.17867 8.48384 1.21267C7.59332 1.04367 6.66829 1.00617 5.70226 1.11517C3.88321 1.31768 2.43016 2.1777 1.36213 3.64575C0.0790928 5.4103 -0.222916 7.41536 0.146595 9.50642C0.535106 11.7105 1.66014 13.535 3.38869 14.9616C5.18125 16.4406 7.24581 17.1657 9.60138 17.0266C11.0319 16.9441 12.6245 16.7526 14.421 15.2321C14.874 15.4576 15.3496 15.5476 16.1381 15.6151C16.7456 15.6716 17.3306 15.5851 17.7836 15.4911C18.4931 15.3411 18.4441 14.6841 18.1876 14.5636C16.1081 13.595 16.5646 13.9891 16.1496 13.67C17.2061 12.42 18.8202 10.1979 19.3182 7.17235C19.3672 6.83834 19.4297 6.36783 19.4222 6.09732C19.4182 5.93231 19.4562 5.86831 19.6447 5.84931C20.1657 5.78931 20.6712 5.64681 21.1357 5.3913C22.4833 4.65528 23.0268 3.44624 23.1548 1.9972C23.1738 1.77569 23.1508 1.54668 22.9168 1.43018ZM11.1749 14.4736C9.15936 12.889 8.18184 12.3675 7.77832 12.39C7.40081 12.4125 7.46881 12.8445 7.55182 13.126C7.63882 13.404 7.75182 13.5955 7.91033 13.8396C8.01983 14.0011 8.09533 14.2411 7.80083 14.4216C7.15181 14.8231 6.02327 14.2866 5.97027 14.2601C4.65673 13.4865 3.5587 12.4655 2.78467 11.069C2.03715 9.72493 1.60314 8.28289 1.53164 6.74384C1.51264 6.37233 1.62214 6.24082 1.99215 6.17332C2.47916 6.08332 2.98118 6.06432 3.46769 6.13582C5.52476 6.43633 7.27581 7.35586 8.74385 8.8129C9.58188 9.64243 10.2159 10.634 10.8689 11.6025C11.5634 12.631 12.3105 13.611 13.262 14.4146C13.598 14.6961 13.866 14.9101 14.1225 15.0681C13.349 15.1546 12.058 15.1731 11.1749 14.4746L11.1749 14.4736ZM12.141 8.25988C12.141 8.09488 12.273 7.96338 12.439 7.96338C12.4765 7.96338 12.5105 7.97088 12.541 7.98188C12.5825 7.99688 12.6205 8.01938 12.6505 8.05338C12.7035 8.10588 12.7335 8.18088 12.7335 8.25988C12.7335 8.42489 12.6015 8.55639 12.4355 8.55639C12.2695 8.55639 12.141 8.42489 12.141 8.25988ZM15.1415 9.79893C14.949 9.87793 14.7565 9.94544 14.5715 9.95294C14.2845 9.96794 13.9715 9.85143 13.8015 9.70893C13.5375 9.48742 13.3485 9.36342 13.2695 8.97691C13.2355 8.8119 13.2545 8.55639 13.2845 8.40989C13.3525 8.09438 13.277 7.89187 13.0545 7.70787C12.8735 7.55786 12.643 7.51636 12.39 7.51636C12.2955 7.51636 12.209 7.47486 12.1445 7.44136C12.039 7.38886 11.9519 7.25735 12.035 7.09585C12.0615 7.04335 12.19 6.91584 12.22 6.89334C12.5635 6.69784 12.9595 6.76184 13.326 6.90834C13.6655 7.04735 13.9225 7.30236 14.292 7.66287C14.6695 8.09838 14.7375 8.21838 14.9525 8.54539C15.1225 8.8009 15.277 9.06341 15.3831 9.36392C15.4471 9.55142 15.3641 9.70493 15.1415 9.79893Z" fill="currentColor"/>
    </svg>
    <span style="font-size:14px;font-weight:650;letter-spacing:-.02em">deepseek</span>
    <span style="background:currentColor;border-radius:2px;color:var(--dsw-alias-label-primary-inverted,#fff);font-size:8px;font-weight:700;letter-spacing:.08em;padding:1px 4px">HARNESS</span>`
  applyStyles(container, { gap: '6px' })
  return container
}

export function createShareCard(
  document: Document,
  messages: readonly ShareMessage[],
  locale: 'zh' | 'en',
  settings: ShareSettings = DEFAULT_SHARE_SETTINGS,
): ShareCard {
  const host = document.createElement('div')
  host.dataset.dshShareCardHost = ''
  applyStyles(host, {
    left: '-100000px',
    position: 'fixed',
    top: '0',
    zIndex: '-1',
  })

  const card = document.createElement('article')
  card.dataset.dshShareCard = ''
  card.style.setProperty('--dsh-share-font-size', `${FONT_SIZE_PRESETS[settings.fontSize]}px`)
  applyStyles(card, {
    background: 'var(--dsw-alias-bg-base, #f7f8fa)',
    boxSizing: 'border-box',
    color: 'var(--dsw-alias-label-primary, #111827)',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    overflowWrap: 'anywhere',
    padding: '28px 24px 24px',
    width: `${WIDTH_PRESETS[settings.width]}px`,
    wordBreak: 'break-word',
  })

  for (const [index, message] of messages.entries()) {
    if (message.omittedBefore > 0) {
      const omission = document.createElement('div')
      omission.dataset.dshShareOmission = ''
      omission.textContent = '···'
      applyStyles(omission, {
        color: 'var(--dsw-alias-label-tertiary, #9ca3af)',
        fontSize: '18px',
        letterSpacing: '8px',
        margin: '30px 0',
        textAlign: 'center',
      })
      card.append(omission)
    }

    const messageSection = document.createElement('section')
    messageSection.dataset.dshShareMessageGroup = message.role
    messageSection.dataset.dshShareTurn = String(message.turn)
    if (index > 0 && message.omittedBefore === 0) {
      const previous = messages[index - 1]
      applyStyles(messageSection, {
        borderTop: previous?.turn === message.turn
          ? '0'
          : '1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, 0.16))',
        marginTop: '30px',
        paddingTop: previous?.turn === message.turn ? '0' : '30px',
      })
    }

    const visible = message.role === 'assistant'
      ? visibleAssistantElements(message.elements, settings.hideProcess)
      : message.elements
    // 隐藏过程时，一条回答只保留最后一个 assistant-step，并从中移除 Think；
    // 工具调用和中间步骤不会进入图片，用户消息不受该开关影响。
    for (const element of visible) {
      messageSection.append(cloneShareMessage(
        element,
        locale,
        message.role === 'assistant' && settings.hideProcess,
      ))
    }
    card.append(messageSection)
  }

  const footer = document.createElement('footer')
  footer.append(createBrandWordmark(document))
  applyStyles(footer, {
    alignItems: 'center',
    borderTop: '1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, 0.2))',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    paddingTop: '14px',
  })
  card.append(footer)

  host.append(card)
  document.body.append(host)

  return {
    element: card,
    dispose: () => host.remove(),
  }
}
