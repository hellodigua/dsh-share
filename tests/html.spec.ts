// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createShareHtml } from '../src/client/html.ts'
import type { ShareMessage } from '../src/client/content.ts'
import { DEFAULT_SHARE_SETTINGS } from '../src/client/settings.ts'
import { snapshotElements } from '../src/client/dom.ts'
import { HTML_STYLE } from '../src/client/html-style.ts'

function message(html: string, role: 'user' | 'assistant' = 'user'): ShareMessage {
  const element = document.createElement('div')
  element.innerHTML = html
  return { elements: [element], role, turn: 1, order: 1, omittedBefore: 0 }
}

afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = '' })

describe('独立 HTML 导出', () => {
  it('使用轻量会话布局，不加入大卡片标题和角色标题', async () => {
    const result = await createShareHtml(document, [message('<p>问题</p>'), message('<p>回答</p>', 'assistant')], 'zh', DEFAULT_SHARE_SETTINGS)
    const parsed = new DOMParser().parseFromString(result.html, 'text/html')
    expect(parsed.querySelector('main > h1')).toBeNull()
    expect(parsed.querySelector('.speaker')).toBeNull()
    expect(parsed.querySelector('section.user')!.getAttribute('aria-label')).toBe('用户')
    expect(parsed.querySelector('section.assistant')!.getAttribute('aria-label')).toBe('DeepSeek')
    expect(HTML_STYLE.length).toBeLessThan(6000)
    expect(HTML_STYLE).toContain('justify-content:flex-end')
  })

  it('保存主题快照后仍可离线还原深色配色，排除资源型主题值', async () => {
    const entry = message('<p>主题内容</p>')
    const element = entry.elements[0]!
    element.style.setProperty('--dsw-alias-bg-base', '#151517')
    element.style.setProperty('--dsw-alias-label-primary', '#eee')
    element.style.setProperty('--dsw-specific-bubble', '#29292d')
    element.style.setProperty('--dsw-alias-link', 'url(https://secret.invalid)')
    element.style.setProperty('--private-session', 'secret')
    document.body.append(element)
    const elements = snapshotElements([element])
    element.remove()
    const result = await createShareHtml(document, [{ ...entry, elements }], 'zh', DEFAULT_SHARE_SETTINGS)
    const parsed = new DOMParser().parseFromString(result.html, 'text/html')
    expect(parsed.body.style.getPropertyValue('--dsw-alias-bg-base')).toBe('#151517')
    expect(parsed.body.style.getPropertyValue('--dsw-specific-bubble')).toBe('#29292d')
    expect(result.html).not.toContain('secret')
  })

  it('保留代码块语义和安全的高亮颜色，表格使用独立滚动容器', async () => {
    const entry = message('<div class="md-code-block"><div data-code-block-banner>TS<button>复制</button></div><pre><code><span style="color:rgb(10, 20, 30);background:url(https://bad.invalid)">const</span> x = 1</code></pre></div><table><tr><td>内容</td></tr></table>', 'assistant')
    const result = await createShareHtml(document, [entry], 'en', DEFAULT_SHARE_SETTINGS)
    const parsed = new DOMParser().parseFromString(result.html, 'text/html')
    expect(parsed.querySelector('.code-banner')!.textContent).toBe('TS')
    expect(parsed.querySelector('pre span')!.getAttribute('style')).toBe('color: rgb(10, 20, 30);')
    expect(parsed.querySelector('.table-scroll > table')).not.toBeNull()
    expect(result.html).not.toContain('bad.invalid')
    expect(parsed.querySelector('button')).toBeNull()
  })
  it('保留语义排版、角色和省略提示，不修改源节点', async () => {
    const first = message('<p>你好<br>第二行</p><pre><code>&lt;script&gt;code&lt;/script&gt;</code></pre><table><tr><td colspan="2">单元格</td></tr></table>')
    const second = { ...message('<p>回答</p>', 'assistant'), omittedBefore: 2 }
    const before = first.elements[0]!.outerHTML
    const result = await createShareHtml(document, [first, second], 'zh', DEFAULT_SHARE_SETTINGS)
    const parsed = new DOMParser().parseFromString(result.html, 'text/html')
    expect(parsed.querySelectorAll('section')).toHaveLength(2)
    expect(parsed.querySelector('code')!.textContent).toBe('<script>code</script>')
    expect(parsed.querySelector('td')!.getAttribute('colspan')).toBe('2')
    expect(parsed.body.textContent).toContain('中间省略 2 组对话')
    expect(parsed.querySelector('style')).not.toBeNull()
    expect(first.elements[0]!.outerHTML).toBe(before)
  })

  it('移除可执行内容、宿主属性、认证链接和外部样式', async () => {
    const result = await createShareHtml(document, [message(`<script>evil()</script><iframe src="https://evil.test"></iframe><svg onload="evil()"></svg><style>body{background:url(https://evil.test)}</style><p id="private-session" data-secret="private-token" onclick="evil()" style="background:url(https://evil.test)">文本</p><a href="javascript:evil()">a</a><a href="http://127.0.0.1/session/private">b</a><a href="https://example.org/?token=private-token">c</a><a href="https://example.org/docs">正常链接</a><img src="file:///private/secret">`)], 'en', DEFAULT_SHARE_SETTINGS)
    expect(result.html).not.toMatch(/evil|private-session|private-token|file:\/\/\/private/)
    const parsed = new DOMParser().parseFromString(result.html, 'text/html')
    expect(parsed.querySelectorAll('script,iframe,svg,[onclick],[data-secret]')).toHaveLength(0)
    expect(parsed.querySelectorAll('a[href]')).toHaveLength(1)
    expect(parsed.querySelector('meta[http-equiv]')!.getAttribute('content')).toContain("default-src 'none'")
    expect(result.missingImages).toBe(1)
  })

  it('内嵌并复用栅格图片，移除srcset和请求凭据', async () => {
    const fetcher = vi.fn(async () => new Response(new Uint8Array([1, 2, 3]), { headers: { 'content-type': 'image/png' } }))
    vi.stubGlobal('fetch', fetcher)
    const result = await createShareHtml(document, [message('<p>表情<img src="https://example.org/a.png" height="24" onerror="evil()" srcset="secret"><img src="https://example.org/a.png"></p>')], 'zh', DEFAULT_SHARE_SETTINGS)
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(fetcher.mock.calls[0]).toEqual(['https://example.org/a.png', expect.objectContaining({ credentials: 'omit', referrerPolicy: 'no-referrer', redirect: 'error' })])
    expect(result.html).toContain('data:image/png;base64,AQID')
    expect(result.html).toContain('class="emoji"')
    expect(result.html).not.toMatch(/https:\/\/example.org\/a|srcset|onerror/)
    expect(result.missingImages).toBe(0)
  })

  it.each(['image/svg+xml', 'text/html'])('拒绝非栅格资源 %s 并保留明确占位', async type => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('untrusted', { headers: { 'content-type': type } })))
    const result = await createShareHtml(document, [message('<img src="https://example.org/a">')], 'en', DEFAULT_SHARE_SETTINGS)
    expect(result.missingImages).toBe(1)
    expect(result.html).toContain('[Image could not be embedded]')
    expect(result.html).not.toContain('untrusted')
  })

  it('超出单图预算时停止读取并降级为占位', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(new Uint8Array(8 * 1024 * 1024 + 1), { headers: { 'content-type': 'image/png' } })))
    const result = await createShareHtml(document, [message('<img src="https://example.org/large">')], 'zh', DEFAULT_SHARE_SETTINGS)
    expect(result.missingImages).toBe(1)
    expect(result.html).not.toContain('<img')
  })

  it('图片请求失败时仍导出正文，并标记缺失资源', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('Network unavailable') }))
    const result = await createShareHtml(document, [message('<p>保留正文</p><img src="https://example.org/image">')], 'zh', DEFAULT_SHARE_SETTINGS)
    expect(result.html).toContain('保留正文')
    expect(result.missingImages).toBe(1)
    expect(result.html).not.toContain('https://example.org/image')
  })

  it('遵守隐藏过程设置，并在异步读取前固定内容', async () => {
    const entry = message('<div data-variant="think">推理</div><p>最终回答</p>', 'assistant')
    entry.elements[0]!.dataset.chatFlowKind = 'assistant-step'
    const pending = createShareHtml(document, [entry], 'zh', { ...DEFAULT_SHARE_SETTINGS, hideProcess: true })
    entry.elements[0]!.textContent = '后续更新'
    const result = await pending
    expect(result.html).toContain('最终回答')
    expect(result.html).not.toMatch(/推理|后续更新/)
  })
})
