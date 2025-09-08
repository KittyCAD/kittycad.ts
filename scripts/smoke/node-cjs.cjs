#!/usr/bin/env node
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const { spawn } = require('node:child_process')

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
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'kittycad-cjs-'))
  process.chdir(dir)

  const pkg = { name: 'cjs-smoke', private: true }
  await fs.writeFile('package.json', JSON.stringify(pkg, null, 2))

  const useYarn = await hasCmd('yarn')
  if (useYarn) {
    await run('yarn', ['add', tarball])
  } else {
    await run('npm', ['install', tarball])
  }

  const test = `
const lib = require('@kittycad/lib')
const ok = lib && typeof lib.meta === 'object' && typeof lib.Client === 'function'
if (!ok) { console.error('bad: types'); process.exit(1) }
(async () => {
  try {
    const res = await lib.meta.ping()
    if (!res) throw new Error('no response')
    console.log('cjs smoke OK')
    process.exit(0)
  } catch (e) {
    console.error('bad: request failed', e?.message || e)
    process.exit(1)
  }
})()
`
  await fs.writeFile('test.cjs', test)
  await run('node', ['test.cjs'])
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
