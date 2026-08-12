import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

describe('DSH 插件清单', () => {
  it('导出 Host、Client 和 bundle patch', async () => {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as {
      exports: Record<string, unknown>
      files: string[]
      repository: { url: string }
      scripts: Record<string, string>
      license: string
      dsh: { bundle: { patch: string }; client: { inject: string[]; platform: string } }
      peerDependencies: Record<string, string>
    }

    expect(packageJson.exports).toHaveProperty('.')
    expect(packageJson.exports).toHaveProperty('./client')
    expect(packageJson.files).toContain('cordis.patch.yml')
    expect(packageJson.files).toContain('THIRD_PARTY_LICENSES.md')
    expect(packageJson.repository.url).toBe('git+https://github.com/hellodigua/dsh-share.git')
    expect(packageJson.scripts.verify).toContain('pnpm typecheck')
    expect(packageJson.license).toBe('MIT')
    expect(packageJson.dsh.bundle.patch).toBe('./cordis.patch.yml')
    expect(packageJson.dsh.client.platform).toBe('web')
    expect(packageJson.dsh.client.inject).toEqual([
      '@deepseek-ai/dsh-client-runtime',
      '@deepseek-ai/dsh-client-ui-conversation',
    ])
    expect(packageJson.peerDependencies.react).toBe('^18.2.0')
  })

  it('不依赖本机 DSH checkout 就能安装开发依赖', async () => {
    const packageJson = await readFile(new URL('../package.json', import.meta.url), 'utf8')
    expect(packageJson).not.toContain('link:../')
    expect(packageJson).not.toContain('file:/Users/')
  })

  it('bundle patch 使用 DSH 所需的 insert 数组格式', async () => {
    const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
    expect(patch).toMatch(/- insert:\n\s+- id: dsh-share\n\s+name: '@dsh-external\/dsh-share'/)
  })

  it('构建配置把图片渲染库内联到浏览器 bundle', async () => {
    const config = await readFile(new URL('../tsdown.config.ts', import.meta.url), 'utf8')
    expect(config).toContain("onlyBundle: ['html-to-image']")
  })

  it('README 说明正式插槽和剩余的 DOM 兼容边界', async () => {
    const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8')
    expect(readme).toContain('conversation.chat.assistant-actions')
    expect(readme).toContain('不再扫描或修改按钮栏 DOM')
    expect(readme).not.toContain('暂时没有为消息操作区提供正式插件插槽')
  })
})
