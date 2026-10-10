import { cloneShareMessage, visibleAssistantElements } from './card.ts'
import type { ShareMessage } from './content.ts'
import type { ShareSettings } from './settings.ts'
import { applyHtmlExportTheme } from './export-theme.ts'
import { HTML_STYLE } from './html-style.ts'

const TAGS = new Set('div p span br hr h1 h2 h3 h4 h5 h6 strong b em i u s del blockquote pre code ul ol li table thead tbody tfoot tr th td caption a sub sup details summary'.split(' '))
const DROP = new Set('script style link meta base iframe object embed form input button textarea select template svg canvas audio video source'.split(' '))
const IMAGE_TYPE = /^image\/(png|jpeg|gif|webp|avif)$/i
const MAX_IMAGE_BYTES = 8 * 1024 * 1024
const MAX_TOTAL_BYTES = 32 * 1024 * 1024

/** 只保留普通外部链接，排除宿主地址和携带认证参数的链接。 */
function publicLink(value: string): string | undefined {
  try {
    const url = new URL(value)
    if (!/^https?:$/.test(url.protocol) || url.username || url.password) return
    if (/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[|0\.)/i.test(url.hostname)
      || !url.hostname.includes('.') || /\.(local|internal)$/i.test(url.hostname)) return
    if ([...url.searchParams.keys()].some(key => /token|secret|auth|key|signature|credential/i.test(key))) return
    return url.href
  } catch { return }
}

/** 生成无脚本的独立阅读文档；只复制允许的标签和属性。 */
export async function createShareHtml(
  document: Document,
  messages: readonly ShareMessage[],
  locale: 'zh' | 'en',
  settings: ShareSettings,
): Promise<{ html: string, missingImages: number }> {
  const output = document.implementation.createHTMLDocument(locale === 'zh' ? '对话分享' : 'Shared conversation')
  output.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  const charset = output.createElement('meta')
  charset.setAttribute('charset', 'utf-8')
  const csp = output.createElement('meta')
  csp.httpEquiv = 'Content-Security-Policy'
  csp.content = "default-src 'none'; img-src data:; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"
  const viewport = output.createElement('meta')
  viewport.name = 'viewport'
  viewport.content = 'width=device-width, initial-scale=1'
  const style = output.createElement('style')
  style.textContent = HTML_STYLE
  output.head.prepend(charset, csp, viewport, style)
  const main = output.createElement('main')
  main.ariaLabel = output.title
  applyHtmlExportTheme(output.body, messages.flatMap(message => message.elements))
  output.body.append(main)
  // 在异步资源读取前固定选择内容，避免宿主更新改变导出结果。
  const snapshots = messages.map(message => ({
    role: message.role,
    omittedBefore: message.omittedBefore,
    elements: (message.role === 'assistant'
      ? visibleAssistantElements(message.elements, settings.hideProcess) : message.elements)
      .map(element => cloneShareMessage(element, locale, message.role === 'assistant' && settings.hideProcess)),
  }))
  let missingImages = 0
  let totalBytes = 0
  let imageCount = 0
  const deadline = Date.now() + 30000
  const cache = new Map<string, { data: string, size: number }>()

  /** 限时限量读取栅格图片，不携带跨站认证信息或保留资源地址。 */
  async function embedImage(source: Element): Promise<Node> {
    const image = output.createElement('img')
    image.alt = source.getAttribute('alt') ?? ''
    try {
      const raw = source.getAttribute('src') ?? ''
      const url = new URL(raw, document.baseURI)
      if (!raw || !['http:', 'https:', 'blob:', 'data:', 'dsh-app:'].includes(url.protocol)) throw new Error('Unsupported image')
      if (url.username || url.password || ++imageCount > 100) throw new Error('Image budget exceeded')
      let cached = cache.get(url.href)
      if (!cached) {
        const remaining = deadline - Date.now()
        if (remaining <= 0) throw new Error('Image deadline exceeded')
        const response = await fetch(url.href, { credentials: 'omit', referrerPolicy: 'no-referrer', redirect: 'error', signal: AbortSignal.timeout(Math.min(10000, remaining)) })
        const type = response.headers.get('content-type')?.split(';')[0] ?? ''
        if (!response.ok || !IMAGE_TYPE.test(type) || !response.body) throw new Error('Unsupported image')
        const reader = response.body.getReader()
        const chunks: Uint8Array<ArrayBuffer>[] = []
        let size = 0
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            size += value.byteLength
            if (size > MAX_IMAGE_BYTES || totalBytes + size > MAX_TOTAL_BYTES) throw new Error('Image budget exceeded')
            chunks.push(new Uint8Array(value))
          }
        } finally { await reader.cancel() }
        const blob = new Blob(chunks, { type })
        const data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(String(reader.result))
          reader.onerror = () => reject(new Error('Image encoding failed'))
          reader.readAsDataURL(blob)
        })
        cached = { data, size }
        cache.set(url.href, cached)
      }
      if (totalBytes + cached.size > MAX_TOTAL_BYTES) throw new Error('Image budget exceeded')
      totalBytes += cached.size
      image.src = cached.data
      const height = Number.parseFloat(source.getAttribute('height') ?? (source as HTMLElement).style?.height ?? '')
      if ((height > 0 && height <= 64) || source.getAttribute('src')?.includes('/api/dsh-emoji/assets/')) image.className = 'emoji'
      return image
    } catch {
      missingImages++
      const placeholder = output.createElement('span')
      placeholder.className = 'notice'
      placeholder.textContent = locale === 'zh' ? '[图片未能内嵌]' : '[Image could not be embedded]'
      return placeholder
    }
  }

  /** 从不复制宿主属性、内联样式或可执行节点。 */
  async function sanitize(node: Node): Promise<Node> {
    if (node.nodeType === 3) return output.createTextNode(node.textContent ?? '')
    if (node.nodeType !== 1) return output.createDocumentFragment()
    const source = node as Element
    const tag = source.localName.toLowerCase()
    if (DROP.has(tag)) return output.createDocumentFragment()
    if (tag === 'img') return embedImage(source)
    const result = TAGS.has(tag) ? output.createElement(tag) : output.createDocumentFragment()
    if (result.nodeType === 1) {
      const element = result as HTMLElement
      if (source.hasAttribute('data-code-block-banner')) element.className = 'code-banner'
      else if (source.classList.contains('md-code-block')) element.className = 'code-block'
      else if (source.getAttribute('data-variant') === 'think') element.className = 'reasoning'
      if (tag === 'span' && source.closest('pre')) {
        const color = (source as HTMLElement).style.color
        if (/^(?:#[\da-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i.test(color)) element.style.color = color
      }
    }
    if (tag === 'a' && result.nodeType === 1) {
      const href = publicLink(source.getAttribute('href') ?? '')
      if (href) (result as Element).setAttribute('href', href)
    }
    if (['td', 'th'].includes(tag)) {
      for (const attribute of ['colspan', 'rowspan']) {
        const value = source.getAttribute(attribute)
        if (value && /^\d{1,3}$/.test(value)) (result as Element).setAttribute(attribute, value)
      }
    }
    for (const child of source.childNodes) result.appendChild(await sanitize(child))
    if (tag === 'table') {
      const wrapper = output.createElement('div')
      wrapper.className = 'table-scroll'
      wrapper.append(result)
      return wrapper
    }
    return result
  }

  for (const message of snapshots) {
    if (message.omittedBefore > 0) {
      const omission = output.createElement('p')
      omission.className = 'notice'
      omission.textContent = locale === 'zh' ? `中间省略 ${message.omittedBefore} 组对话` : `${message.omittedBefore} conversation groups omitted`
      main.append(omission)
    }
    const section = output.createElement('section')
    section.className = message.role
    section.ariaLabel = message.role === 'user' ? locale === 'zh' ? '用户' : 'User' : 'DeepSeek'
    const content = output.createElement('div')
    content.className = 'content'
    for (const element of message.elements) content.append(await sanitize(element))
    section.append(content)
    main.append(section)
  }
  return { html: `<!doctype html>\n${output.documentElement.outerHTML}`, missingImages }
}
