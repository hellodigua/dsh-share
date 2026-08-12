import { rm } from 'node:fs/promises'

await rm(new URL('../lib', import.meta.url), { force: true, recursive: true })
