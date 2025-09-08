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
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'kittycad-vite-'))
  process.chdir(dir)

  const pkg = { name: 'vite-smoke', private: true, type: 'module' }
  await fs.writeFile('package.json', JSON.stringify(pkg, null, 2))

  const useYarn = await hasCmd('yarn')
  if (useYarn) {
    await run('yarn', ['add', '-D', 'vite'])
    await run('yarn', ['add', tarball])
  } else {
    await run('npm', ['install', '-D', 'vite'])
    await run('npm', ['install', tarball])
  }

  await fs.mkdir('src')
  await fs.writeFile(
    'index.html',
    `<!doctype html>\n<html>\n<head><meta charset="utf-8" /><title>smoke</title></head>\n<body>\n<script type="module" src="/src/main.ts"></script>\n</body>\n</html>\n`
  )
  await fs.writeFile(
    'src/main.ts',
    `import { Client, meta } from '@kittycad/lib'\nconsole.log(typeof Client === 'function' && typeof meta === 'object' ? 'ok' : 'bad')\n`
  )

  await run('npx', ['vite', 'build', '--logLevel', 'warn'])
  await fs.stat('dist')
  console.log('vite smoke OK')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
