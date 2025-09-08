#!/usr/bin/env node
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', shell: false, ...opts })
    p.once('error', (e) => reject(e))
    p.once('exit', (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${cmd} ${args.join(' ')} -> ${code}`))
    )
  })
}

async function hasCmd(cmd) {
  try {
    await run(cmd, ['--version'], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

async function main() {
  const tarball = path.resolve(process.argv[2] || 'pkg.tgz')
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'kittycad-esm-'))
  process.chdir(dir)

  const pkg = { name: 'esm-smoke', private: true, type: 'module' }
  await fs.writeFile('package.json', JSON.stringify(pkg, null, 2))

  const useYarn = await hasCmd('yarn')
  if (useYarn) {
    await run('yarn', ['add', tarball])
  } else {
    await run('npm', ['install', tarball])
  }

  const test = `
import { Client, meta } from '@kittycad/lib'
const okTypes = typeof Client === 'function' && typeof meta === 'object'
if (!okTypes) { console.error('bad: types'); process.exit(1) }
try {
  const res = await meta.ping()
  if (!res) throw new Error('no response')
  console.log('esm smoke OK')
} catch (e) {
  console.error('bad: request failed', e?.message || e)
  process.exit(1)
}
`
  await fs.writeFile('test.mjs', test)
  await run('node', ['test.mjs'])
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
