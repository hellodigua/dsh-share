import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  calculateIntegrity,
  validateChangelog,
  validatePackageManifest,
  validatePackReport,
  validateReleaseVersion,
} from '../scripts/check-package.mjs'

const temporaryDirectories: string[] = []
const FIXTURE_VERSION = '1.2.3-beta.1'

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
    version: FIXTURE_VERSION,
    ...overrides,
  }
}

function packReport(overrides: Record<string, unknown> = {}) {
  const files = [
    'package.json', 'lib/index.js', 'lib/client.js', 'lib/types/index.d.ts',
    'lib/types/client/index.d.ts', 'cordis.patch.yml', 'README.md',
    'README.en.md', 'CHANGELOG.md', 'LICENSE', 'THIRD_PARTY_LICENSES.md',
    'assets/readme/share-dialog.webp',
  ].map(path => ({ mode: 0o644, path, size: 1 }))
  return JSON.stringify([{
    filename: `dsh-share-${FIXTURE_VERSION}.tgz`,
    files,
    name: 'dsh-share',
    size: 128 * 1024,
    unpackedSize: 256 * 1024,
    version: FIXTURE_VERSION,
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
    expect(workflow).toContain('if [[ "$TAG_TYPE" != "tag" ]]')
    expect(workflow).toContain('Release tag $GITHUB_REF_NAME must be an annotated tag')
    expect(workflow).toContain('git merge-base --is-ancestor "$TAG_COMMIT" origin/main')
    expect(workflow).toContain('NPM_TAG="${PRERELEASE_ID%%.*}"')
    expect(workflow).toContain('npm publish "$TARBALL" --provenance --access public --tag "$NPM_TAG"')
    expect(workflow).toContain('RELEASE_ARGS+=(--prerelease)')
    expect(workflow).toContain('gh release create "${RELEASE_ARGS[@]}"')
  })

  it('接受公开的 dsh-share 稳定版和预发布版 manifest', () => {
    expect(validatePackageManifest(manifest({ version: '1.2.3' })).name).toBe('dsh-share')
    expect(validatePackageManifest(manifest()).version).toBe(FIXTURE_VERSION)
    expect(() => validatePackageManifest(manifest({ private: true }))).toThrow('不能声明 private')
    expect(() => validateReleaseVersion('1.2.3-01')).toThrow('不是可发布 SemVer')
  })

  it('要求 changelog 包含当前版本和发布日期', () => {
    expect(() => validateChangelog(`## [${FIXTURE_VERSION}] - 2026-08-15\n`, FIXTURE_VERSION)).not.toThrow()
    expect(() => validateChangelog('## [0.1.0] - 2026-08-15\n', FIXTURE_VERSION)).toThrow(
      `CHANGELOG.md 缺少 ${FIXTURE_VERSION} 的日期标题`,
    )
  })

  it('校验 tarball 身份、入口、文档、许可证和预览图', () => {
    expect(validatePackReport(packReport(), FIXTURE_VERSION).filename).toBe(`dsh-share-${FIXTURE_VERSION}.tgz`)
    expect(validatePackReport(`build output\n${packReport()}`, FIXTURE_VERSION).name).toBe('dsh-share')
    expect(() => validatePackReport(packReport({ name: 'other' }), FIXTURE_VERSION)).toThrow('身份不匹配')
    expect(() => validatePackReport(packReport({ size: 2 * 1024 * 1024 }), FIXTURE_VERSION)).toThrow('体积异常')
  })

  it('拒绝把源码、测试或发布脚本装入 npm 包', () => {
    const report = JSON.parse(packReport())
    report[0].files.push({ mode: 0o644, path: 'src/index.ts', size: 1 })
    expect(() => validatePackReport(JSON.stringify(report), FIXTURE_VERSION)).toThrow('不应包含 src/index.ts')
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
