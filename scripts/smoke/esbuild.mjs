#!/usr/bin/env node
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

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
  let tarball = path.resolve(process.argv[2] || 'pkg.tgz')
  const yarnSpec =
    process.platform === 'win32' ? tarball.replace(/\\/g, '/') : tarball
  const fileSpec = yarnSpec.startsWith('file:') ? yarnSpec : `file:${yarnSpec}`
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'kittycad-esbuild-'))
  process.chdir(dir)

  const pkg = { name: 'esbuild-smoke', private: true, type: 'module' }
  await fs.writeFile('package.json', JSON.stringify(pkg, null, 2))

  const useYarn = await hasCmd('yarn')
  if (useYarn) {
    await run('yarn', ['add', 'esbuild', fileSpec])
  } else {
    await run('npm', ['install', 'esbuild', tarball])
  }

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
