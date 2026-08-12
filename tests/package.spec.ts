import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

describe('DSH 插件清单', () => {
  it('导出 Host、Client 和 bundle patch', async () => {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as {
      exports: Record<string, unknown>
      files: string[]
      dsh: { bundle: { patch: string }; client: { platform: string } }
    }

    expect(packageJson.exports).toHaveProperty('.')
    expect(packageJson.exports).toHaveProperty('./client')
    expect(packageJson.files).toContain('cordis.patch.yml')
    expect(packageJson.dsh.bundle.patch).toBe('./cordis.patch.yml')
    expect(packageJson.dsh.client.platform).toBe('web')
  })

  it('bundle patch 使用 DSH 所需的 insert 数组格式', async () => {
    const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
    expect(patch).toMatch(/- insert:\n\s+- id: dsh-share\n\s+name: '@dsh-external\/dsh-share'/)
  })

  it('构建配置把图片渲染库内联到浏览器 bundle', async () => {
    const config = await readFile(new URL('../tsdown.config.ts', import.meta.url), 'utf8')
    expect(config).toContain("onlyBundle: ['html-to-image']")
  })
})
