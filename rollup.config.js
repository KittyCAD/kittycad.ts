import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const extensions = ['.js', '.ts']
const deps = Object.keys(pkg.dependencies || {})
const peers = Object.keys(pkg.peerDependencies || {})

const plugins = [
  json(),
  nodeResolve({ extensions, browser: false, preferBuiltins: true }),
  commonjs(),
  babel({ extensions }),
  terser(),
]

// ESM + CJS only; no UMD bundle
export default {
  input: 'src/index.ts',
  external: [deps, peers].flat(),
  output: [
    { file: pkg.module, format: 'esm' },
    { file: pkg.main, format: 'cjs' },
  ],
  plugins,
}
