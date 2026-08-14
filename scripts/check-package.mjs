#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const EXPECTED_NAME = 'dsh-share'
const EXPECTED_REPOSITORY = 'git+https://github.com/hellodigua/dsh-share.git'
const NPM_REGISTRY = 'https://registry.npmjs.org/'
const MAX_TARBALL_SIZE = 1024 * 1024
const STABLE_SEMVER_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/
const root = resolve(import.meta.dirname, '..')

const REQUIRED_FILES = [
  'package.json',
  'lib/index.js',
  'lib/client.js',
  'lib/types/index.d.ts',
  'lib/types/client/index.d.ts',
  'cordis.patch.yml',
  'README.md',
  'README.en.md',
  'LICENSE',
  'THIRD_PARTY_LICENSES.md',
  'assets/readme/share-dialog.webp',
]

const FORBIDDEN_PREFIXES = ['src/', 'tests/', 'scripts/', '.github/', '.docs/']

function fail(message) {
  throw new Error(`[package] ${message}`)
}

export function validatePackageManifest(packageJson) {
  if (packageJson.name !== EXPECTED_NAME) fail(`package name 必须是 ${EXPECTED_NAME}`)
  if (!STABLE_SEMVER_PATTERN.test(packageJson.version)) {
    fail(`version 必须是稳定版 SemVer，当前为 ${packageJson.version}`)
  }
  if (packageJson.private !== undefined) fail('发布包不能声明 private')
  if (packageJson.author !== 'hellodigua') fail('package author 必须是 hellodigua')
  if (packageJson.license !== 'MIT') fail('package license 必须是 MIT')
  if (packageJson.repository?.url !== EXPECTED_REPOSITORY) {
    fail(`repository 必须是 ${EXPECTED_REPOSITORY}`)
  }
  if (packageJson.publishConfig?.access !== 'public') fail('publishConfig.access 必须是 public')
  if (packageJson.publishConfig?.registry !== NPM_REGISTRY) {
    fail(`publishConfig.registry 必须是 ${NPM_REGISTRY}`)
  }
  return packageJson
}

export function validatePackReport(raw, expectedVersion) {
  let report
  try {
    const jsonStart = raw.lastIndexOf('\n[')
    report = JSON.parse(jsonStart >= 0 ? raw.slice(jsonStart + 1) : raw)
  } catch {
    fail('npm pack 没有返回有效 JSON')
  }
  if (!Array.isArray(report) || report.length !== 1) fail('npm pack 必须只生成一个 tarball')

  const item = report[0]
  if (item.name !== EXPECTED_NAME || item.version !== expectedVersion) {
    fail(`tarball 身份不匹配：${item.name}@${item.version}`)
  }
  if (!item.filename || !Number.isFinite(item.size) || item.size > MAX_TARBALL_SIZE) {
    fail(`tarball 文件名或体积异常：${item.filename ?? 'unknown'} (${item.size ?? 'unknown'} bytes)`)
  }

  const paths = new Set((item.files ?? []).map(file => file.path))
  for (const path of REQUIRED_FILES) {
    if (!paths.has(path)) fail(`tarball 缺少 ${path}`)
  }
  for (const path of paths) {
    if (FORBIDDEN_PREFIXES.some(prefix => path.startsWith(prefix))) {
      fail(`tarball 不应包含 ${path}`)
    }
  }
  return item
}

export function calculateIntegrity(file) {
  return `sha512-${createHash('sha512').update(readFileSync(file)).digest('base64')}`
}

function packTo(directory) {
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const result = spawnSync(command, [
    'pack',
    '--json',
    '--ignore-scripts',
    '--pack-destination',
    directory,
  ], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  if (result.error) fail(`无法执行 npm pack：${result.error.message}`)
  if (result.status !== 0) fail(`npm pack 执行失败：${(result.stderr || result.stdout).trim()}`)
  return result.stdout
}

export function main() {
  const packageJson = validatePackageManifest(
    JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')),
  )
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'dsh-share-package-'))
  try {
    const pack = validatePackReport(packTo(temporaryDirectory), packageJson.version)
    const tarball = join(temporaryDirectory, pack.filename)
    console.log(
      `[package] ${pack.name}@${pack.version} 已校验：${pack.filename} `
      + `(${pack.size} bytes, ${calculateIntegrity(tarball)})`,
    )
  } finally {
    rmSync(temporaryDirectory, { force: true, recursive: true })
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  try {
    main()
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
