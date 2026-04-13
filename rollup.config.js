import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import pkg from './package.json'

const extensions = ['.js', '.ts']

// TODO: STOP doing this. This is the purpose of peerDependencies!
const deps = Object.keys(pkg.dependencies || {}).filter(
  (x) => !['bson', '@msgpack/msgpack'].includes(x)
)

const peers = Object.keys(pkg.peerDependencies || {})

const plugins = [
  json(),
  nodeResolve({ extensions, browser: false, preferBuiltins: true }),
  commonjs(),
  webWorkerLoader(),
  babel({ extensions }),
  terser(),
]

// ESM + CJS only; no UMD bundle
const externals = [deps, peers].flat()
const isExternal = (id) =>
  externals.some((d) => id === d || id.startsWith(`${d}/`))

export default {
  input: 'src/index.ts',
  external: isExternal,
  output: [
    { file: pkg.module, format: 'esm' },
    { file: pkg.main, format: 'cjs' },
  ],
  plugins,
}
