import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  calculateIntegrity,
  validatePackageManifest,
  validatePackReport,
} from '../scripts/check-package.mjs'

const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true })
  }
})

function manifest(overrides: Record<string, unknown> = {}) {
  return {
    author: 'hellodigua',
    license: 'MIT',
    name: 'dsh-share',
    publishConfig: {
      access: 'public',
      registry: 'https://registry.npmjs.org/',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/hellodigua/dsh-share.git',
    },
    version: '0.2.0',
    ...overrides,
  }
}

function packReport(overrides: Record<string, unknown> = {}) {
  const files = [
    'package.json', 'lib/index.js', 'lib/client.js', 'lib/types/index.d.ts',
    'lib/types/client/index.d.ts', 'cordis.patch.yml', 'README.md',
    'README.en.md', 'LICENSE', 'THIRD_PARTY_LICENSES.md',
    'assets/readme/share-dialog.webp',
  ].map(path => ({ mode: 0o644, path, size: 1 }))
  return JSON.stringify([{
    filename: 'dsh-share-0.2.0.tgz',
    files,
    name: 'dsh-share',
    size: 128 * 1024,
    unpackedSize: 256 * 1024,
    version: '0.2.0',
    ...overrides,
  }])
}

describe('npm 发布边界', () => {
  it('由版本 tag 自动发布 npm 包并创建 GitHub Release', () => {
    const workflow = readFileSync(
      new URL('../.github/workflows/release.yml', import.meta.url),
      'utf8',
    )

    expect(workflow).toMatch(/push:\n\s+tags:\n\s+- 'v\*'/)
    expect(workflow).toContain('contents: write')
    expect(workflow).toContain('id-token: write')
    expect(workflow).toContain('pnpm install --frozen-lockfile')
    expect(workflow).toContain('pnpm release:check')
    expect(workflow).toContain('git diff --exit-code')
    expect(workflow).toContain('GITHUB_REF_NAME#v')
    expect(workflow).toContain('git merge-base --is-ancestor "$GITHUB_SHA" origin/main')
    expect(workflow).toContain('npm publish "$TARBALL" --provenance --access public')
    expect(workflow).toContain('gh release create "$GITHUB_REF_NAME" "$TARBALL"')
  })

  it('接受公开的 dsh-share 稳定版 manifest', () => {
    expect(validatePackageManifest(manifest()).name).toBe('dsh-share')
    expect(() => validatePackageManifest(manifest({ private: true }))).toThrow('不能声明 private')
    expect(() => validatePackageManifest(manifest({ version: '0.2.0-beta.1' }))).toThrow('稳定版 SemVer')
  })

  it('校验 tarball 身份、入口、文档、许可证和预览图', () => {
    expect(validatePackReport(packReport(), '0.2.0').filename).toBe('dsh-share-0.2.0.tgz')
    expect(validatePackReport(`build output\n${packReport()}`, '0.2.0').name).toBe('dsh-share')
    expect(() => validatePackReport(packReport({ name: 'other' }), '0.2.0')).toThrow('身份不匹配')
    expect(() => validatePackReport(packReport({ size: 2 * 1024 * 1024 }), '0.2.0')).toThrow('体积异常')
  })

  it('拒绝把源码、测试或发布脚本装入 npm 包', () => {
    const report = JSON.parse(packReport())
    report[0].files.push({ mode: 0o644, path: 'src/index.ts', size: 1 })
    expect(() => validatePackReport(JSON.stringify(report), '0.2.0')).toThrow('不应包含 src/index.ts')
  })

  it('计算 npm registry 使用的 sha512 integrity', () => {
    const directory = mkdtempSync(join(tmpdir(), 'dsh-share-integrity-'))
    temporaryDirectories.push(directory)
    const file = join(directory, 'package.tgz')
    writeFileSync(file, 'dsh-share')
    expect(calculateIntegrity(file)).toMatch(/^sha512-[A-Za-z0-9+/]+=*$/)
    expect(calculateIntegrity(file)).toBe(calculateIntegrity(file))
  })
})
