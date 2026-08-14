import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

describe('DSH 插件清单', () => {
  it('导出 Host、Client 和 bundle patch', async () => {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as {
      name: string
      version: string
      private?: boolean
      author: string
      exports: Record<string, unknown>
      files: string[]
      repository: { url: string }
      publishConfig: { access: string; registry: string }
      scripts: Record<string, string>
      license: string
      dsh: { bundle: { patch: string }; client: { inject: string[]; platform: string } }
      peerDependencies: Record<string, string>
      devDependencies: Record<string, string>
    }

    expect(packageJson.name).toBe('dsh-share')
    expect(packageJson.version).toBe('0.2.0')
    expect(packageJson.private).toBeUndefined()
    expect(packageJson.author).toBe('hellodigua')
    expect(packageJson.publishConfig).toEqual({
      access: 'public',
      registry: 'https://registry.npmjs.org/',
    })
    expect(packageJson.exports).toHaveProperty('.')
    expect(packageJson.exports).toHaveProperty('./client')
    expect(packageJson.files).toContain('cordis.patch.yml')
    expect(packageJson.files).toContain('THIRD_PARTY_LICENSES.md')
    expect(packageJson.files).toContain('README.md')
    expect(packageJson.files).toContain('README.en.md')
    expect(packageJson.files).toContain('assets/readme')
    expect(packageJson.repository.url).toBe('git+https://github.com/hellodigua/dsh-share.git')
    expect(packageJson.scripts.verify).toContain('pnpm typecheck')
    expect(packageJson.scripts.prepack).toBe('pnpm run build')
    expect(packageJson.scripts['release:check']).toContain('scripts/check-package.mjs')
    expect(packageJson.license).toBe('MIT')
    expect(packageJson.dsh.bundle.patch).toBe('./cordis.patch.yml')
    expect(packageJson.dsh.client.platform).toBe('web')
    expect(packageJson.dsh.client.inject).toEqual([
      '@deepseek-ai/dsh-client-runtime',
      '@deepseek-ai/dsh-client-ui-conversation',
      '@deepseek-ai/dsh-client-ui-primitives',
    ])
    expect(packageJson.peerDependencies.react).toBe('^18.2.0')
    for (const name of packageJson.dsh.client.inject) {
      expect(packageJson.peerDependencies[name]).toBe('^0.1.0-rc.6')
      expect(packageJson.devDependencies[name]).toBe('0.1.0-rc.6')
    }
  })

  it('不依赖本机 DSH checkout 就能安装开发依赖', async () => {
    const packageJson = await readFile(new URL('../package.json', import.meta.url), 'utf8')
    expect(packageJson).not.toContain('link:../')
    expect(packageJson).not.toContain('file:/Users/')
  })

  it('bundle patch 使用 DSH 所需的 insert 数组格式', async () => {
    const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
    expect(patch).toMatch(/- insert:\n\s+- id: dsh-share\n\s+name: dsh-share/)
  })

  it('Bundle、Host、Client 和构建配置统一使用 npm 包名', async () => {
    const identityFiles = [
      '../cordis.patch.yml',
      '../src/index.ts',
      '../src/client/index.ts',
      '../tsdown.config.ts',
    ]
    for (const file of identityFiles) {
      const source = await readFile(new URL(file, import.meta.url), 'utf8')
      expect(source).not.toContain('@dsh-external/dsh-share')
    }
  })

  it('构建配置把图片与 Markdown 渲染库内联到浏览器 bundle', async () => {
    const config = await readFile(new URL('../tsdown.config.ts', import.meta.url), 'utf8')
    expect(config).toContain("onlyBundle: ['html-to-image', 'turndown', 'turndown-plugin-gfm']")
    expect(config).toContain(
      "neverBundle: ['react', '@deepseek-ai/dsh-client-ui-primitives', '@mixmark-io/domino']",
    )
  })

  it('默认中文 README 和英文 README 说明正式插槽及 DOM 兼容边界', async () => {
    const chineseReadme = await readFile(new URL('../README.md', import.meta.url), 'utf8')
    const englishReadme = await readFile(new URL('../README.en.md', import.meta.url), 'utf8')

    expect(chineseReadme).toContain('[English](./README.en.md)')
    expect(chineseReadme).toContain('dsh plugin --profile web add dsh-share')
    expect(chineseReadme).toContain('dsh-share@0.2.0')
    expect(chineseReadme).toContain('conversation.chat.assistant-actions')
    expect(chineseReadme).toContain('conversation.session.header.utilities')
    expect(chineseReadme).toContain('下载 PNG 或 Markdown')
    expect(chineseReadme).toContain('不扫描或修改按钮栏 DOM')
    expect(chineseReadme).toContain('data-chat-flow-kind')
    expect(chineseReadme).toContain('不依赖 CSS Module 生成的类名')
    expect(englishReadme).toContain('[简体中文](./README.md)')
    expect(englishReadme).toContain('dsh plugin --profile web add dsh-share')
    expect(englishReadme).toContain('dsh-share@0.2.0')
    expect(englishReadme).toContain('conversation.chat.assistant-actions')
    expect(englishReadme).toContain('conversation.session.header.utilities')
    expect(englishReadme).toContain('PNG download, and Markdown download')
    expect(englishReadme).toContain('do not scan or modify the action bar DOM')
    expect(englishReadme).toContain('data-chat-flow-kind')
    expect(englishReadme).toContain('does not depend on CSS Module class names')
    expect(`${chineseReadme}\n${englishReadme}`).not.toContain('@dsh-external/dsh-share')
    expect(`${chineseReadme}\n${englishReadme}`).not.toContain('v0.1.0')
  })
})
