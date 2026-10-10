import { describe, expect, it } from 'vitest'
import { crc32 } from 'node:zlib'
import { createPagesZip } from '../src/client/zip.ts'

describe('分页 ZIP', () => {
  it('保留全部页面顺序、UTF-8 文件名、原始字节与 CRC', async () => {
    const contents = [new TextEncoder().encode('123456789'), new Uint8Array([137, 80, 78, 71]), new Uint8Array(1100000).fill(17)]
    const zip = await createPagesZip(contents.map(bytes => new Blob([bytes])), '中文 😀', new Date(2026, 9, 10))
    expect(zip.type).toBe('application/zip')
    const bytes = new Uint8Array(await zip.arrayBuffer())
    const view = new DataView(bytes.buffer)
    const end = bytes.length - 22
    expect(view.getUint32(end, true)).toBe(0x06054b50)
    expect(view.getUint16(end + 10, true)).toBe(3)
    let directory = view.getUint32(end + 16, true)
    expect(directory + view.getUint32(end + 12, true)).toBe(end)
    let offset = 0
    for (const [i, data] of contents.entries()) {
      const size = view.getUint16(offset + 26, true)
      const name = new TextDecoder().decode(bytes.subarray(offset + 30, offset + 30 + size))
      expect(name).toBe(`dsh-中文 😀-0${i + 1}.png`)
      expect(view.getUint32(offset, true)).toBe(0x04034b50)
      expect(view.getUint16(offset + 6, true)).toBe(0x800)
      expect(view.getUint16(offset + 8, true)).toBe(0)
      expect(view.getUint32(offset + 14, true)).toBe(crc32(data))
      expect(view.getUint32(offset + 18, true)).toBe(data.length)
      expect(bytes.subarray(offset + 30 + size, offset + 30 + size + data.length)).toEqual(data)
      expect(view.getUint32(directory, true)).toBe(0x02014b50)
      expect(view.getUint32(directory + 42, true)).toBe(offset)
      expect(view.getUint32(directory + 16, true)).toBe(crc32(data))
      expect(new TextDecoder().decode(bytes.subarray(directory + 46, directory + 46 + size))).toBe(name)
      directory += 46 + size
      offset += 30 + size + data.length
    }
    expect(directory).toBe(end)
  })
  it('对空集合、过多页面和过大归档显式失败', async () => {
    await expect(createPagesZip([])).rejects.toThrow('budget')
    await expect(createPagesZip(Array(10001).fill(new Blob()))).rejects.toThrow('budget')
    await expect(createPagesZip([{ size: 512 * 1024 * 1024 + 1 } as Blob])).rejects.toThrow('budget')
  })
  it('读取失败不返回残缺归档，取消后停止打包', async () => {
    const broken = { size: 10, slice: () => ({ arrayBuffer: async () => { throw new Error('read failed') } }) } as unknown as Blob
    await expect(createPagesZip([broken])).rejects.toThrow('read failed')
    const controller = new AbortController()
    controller.abort()
    await expect(createPagesZip([new Blob(['page'])], undefined, new Date(), controller.signal)).rejects.toThrow()
  })
})
