import { createDownloadFilename } from './filename.ts'

const CRC_TABLE = Uint32Array.from({ length: 256 }, (_, value) => {
  for (let bit = 0; bit < 8; bit++) value = (value >>> 1) ^ ((value & 1) ? 0xedb88320 : 0)
  return value >>> 0
})

/** 分块校验原图，避免同时读取所有分页到内存。 */
async function crc32(blob: Blob, signal?: AbortSignal): Promise<number> {
  let crc = 0xffffffff
  for (let offset = 0; offset < blob.size; offset += 1024 * 1024) {
    signal?.throwIfAborted()
    const bytes = new Uint8Array(await blob.slice(offset, offset + 1024 * 1024).arrayBuffer())
    for (const byte of bytes) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ byte) & 255]!
  }
  signal?.throwIfAborted()
  return (crc ^ 0xffffffff) >>> 0
}

/** 以 ZIP Store 保存已压缩的 PNG，保留原始字节、UTF-8 文件名和页序。 */
export async function createPagesZip(pages: readonly Blob[], title?: string, now = new Date(), signal?: AbortSignal): Promise<Blob> {
  // 限制常规 ZIP 的条目数与总大小，同时给浏览器内存留出余量。
  if (!pages.length || pages.length > 10000 || pages.reduce((sum, page) => sum + page.size, 0) > 512 * 1024 * 1024) {
    throw new Error('Archive exceeds export budget')
  }
  const local: BlobPart[] = []
  const central: Uint8Array<ArrayBuffer>[] = []
  const date = ((Math.min(2107, Math.max(1980, now.getFullYear())) - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()
  const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)
  let offset = 0
  let directorySize = 0
  for (const [index, page] of pages.entries()) {
    const name = new TextEncoder().encode(createDownloadFilename('png', title, index + 1, now))
    const crc = await crc32(page, signal)
    const header = new Uint8Array(30 + name.length)
    const view = new DataView(header.buffer)
    view.setUint32(0, 0x04034b50, true)
    view.setUint16(4, 20, true)
    view.setUint16(6, 0x800, true)
    view.setUint16(10, time, true)
    view.setUint16(12, date, true)
    view.setUint32(14, crc, true)
    view.setUint32(18, page.size, true)
    view.setUint32(22, page.size, true)
    view.setUint16(26, name.length, true)
    header.set(name, 30)
    const entry = new Uint8Array(46 + name.length)
    const entryView = new DataView(entry.buffer)
    entryView.setUint32(0, 0x02014b50, true)
    entryView.setUint16(4, 20, true)
    entry.set(header.subarray(4, 30), 6)
    entryView.setUint32(42, offset, true)
    entry.set(name, 46)
    local.push(header, page)
    central.push(entry)
    offset += header.length + page.size
    directorySize += entry.length
  }
  signal?.throwIfAborted()
  const end = new Uint8Array(22)
  const view = new DataView(end.buffer)
  view.setUint32(0, 0x06054b50, true)
  view.setUint16(8, pages.length, true)
  view.setUint16(10, pages.length, true)
  view.setUint32(12, directorySize, true)
  view.setUint32(16, offset, true)
  return new Blob([...local, ...central, end], { type: 'application/zip' })
}
