import { readFile, readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { satisfies } from 'semver'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const scope = new URL('../node_modules/@deepseek-ai/', import.meta.url)

describe('Cordis dependency compatibility', () => {
  it('installed DSH and Cordis packages resolve compatible Cordis peers', async () => {
    const failures: string[] = []
    let checked = 0
    for (const name of await readdir(scope)) {
      if (!name.startsWith('dsh-') && !name.startsWith('cordis')) continue
      const path = new URL(`${name}/package.json`, scope)
      const manifest = JSON.parse(await readFile(path, 'utf8'))
      const resolveFromPackage = createRequire(path)
      for (const [peer, range] of Object.entries(manifest.peerDependencies ?? {})) {
        if (!peer.startsWith('@deepseek-ai/cordis')) continue
        const installed = JSON.parse(await readFile(resolveFromPackage.resolve(`${peer}/package.json`), 'utf8'))
        checked += 1
        if (!satisfies(installed.version, String(range))) {
          failures.push(`${manifest.name}: ${peer}@${installed.version} does not satisfy ${range}`)
        }
      }
    }
    expect(checked).toBeGreaterThan(0)
    expect(failures).toEqual([])
  })

  it('declares a Cordis floor compatible with the development baseline', async () => {
    const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
    const installed = JSON.parse(await readFile(require.resolve('@deepseek-ai/cordis/package.json'), 'utf8'))
    expect(manifest.devDependencies['@deepseek-ai/cordis']).toBe(installed.version)
    expect(satisfies(installed.version, manifest.peerDependencies['@deepseek-ai/cordis'])).toBe(true)
    expect(satisfies('4.0.2', manifest.peerDependencies['@deepseek-ai/cordis'])).toBe(false)
  })
})
