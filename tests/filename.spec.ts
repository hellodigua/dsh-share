import { describe, expect, it } from 'vitest'
import { createDownloadFilename } from '../src/client/filename.ts'

describe('下载文件名', () => {
  it.each(['md', 'html', 'png', 'zip'] as const)('使用中文与英文标题：%s', extension => {
    expect(createDownloadFilename(extension, '中文 title 😀')).toBe(`dsh-中文 title 😀.${extension}`)
  })
  it('清理非法字符、控制字符、首尾点与空白', () => {
    expect(createDownloadFilename('md', '.. A/B\\C:*?"<>|\n\u202e D... ')).toBe('dsh-A B C D.md')
  })
  it.each([undefined, '', '  ', '...'])('无有效标题时使用日期时间：%s', title => {
    expect(createDownloadFilename('html', title, undefined, new Date(2026, 9, 10, 9, 8, 7))).toBe('dsh-20261010-090807.html')
  })
  it('按 UTF-8 字节限制标题，不截断 Unicode 码点', () => {
    const name = createDownloadFilename('png', '😀'.repeat(100), 123)
    expect(name).toBe(`dsh-${'😀'.repeat(45)}-123.png`)
    expect(new TextEncoder().encode(name).length).toBeLessThan(255)
  })
  it('页码至少两位，保留标题中的扩展名', () => {
    expect(createDownloadFilename('png', '图片.png', 1)).toBe('dsh-图片.png-01.png')
    expect(createDownloadFilename('png', '图片.png', 100)).toBe('dsh-图片.png-100.png')
  })
})
