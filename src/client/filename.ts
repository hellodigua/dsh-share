/** 清理跨平台文件名，并为缺少标题的会话生成时间兜底。 */
export function createDownloadFilename(extension: 'png' | 'md' | 'html' | 'zip', title?: string, page?: number, now = new Date()): string {
  const clean = (title ?? '').normalize('NFC')
    .replace(/[<>:"/\\|?*\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, ' ')
    .replace(/\s+/g, ' ').trim().replace(/^[. ]+|[. ]+$/g, '')
  let safe = ''
  let bytes = 0
  for (const character of clean) {
    const size = new TextEncoder().encode(character).length
    if (bytes + size > 180) break
    safe += character
    bytes += size
  }
  safe = safe.replace(/[. ]+$/g, '')
  const pad = (value: number): string => String(value).padStart(2, '0')
  const fallback = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  return `dsh-${safe || fallback}${page === undefined ? '' : `-${pad(page)}`}.${extension}`
}
