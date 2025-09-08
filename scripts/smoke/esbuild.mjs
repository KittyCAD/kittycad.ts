#!/usr/bin/env node
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts })
    p.on('exit', (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${cmd} ${args.join(' ')} -> ${code}`))
    )
  })
}

async function main() {
  const tarball = path.resolve(process.argv[2] || 'pkg.tgz')
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'kittycad-esbuild-'))
  process.chdir(dir)

  const pkg = { name: 'esbuild-smoke', private: true, type: 'module' }
  await fs.writeFile('package.json', JSON.stringify(pkg, null, 2))

  await run('yarn', ['add', 'esbuild', tarball])

  const entry = `
import { Client, meta } from '@kittycad/lib'
new Client('test')
void meta
`
  await fs.writeFile('entry.ts', entry)
  await run('npx', [
    'esbuild',
    'entry.ts',
    '--bundle',
    '--platform=browser',
    '--format=esm',
    '--outfile=out.mjs',
  ])
  // Verify output
  await fs.stat('out.mjs')
  console.log('esbuild smoke OK')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
