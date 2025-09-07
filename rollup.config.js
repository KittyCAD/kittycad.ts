import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const extensions = ['.js', '.ts'];
const deps = Object.keys(pkg.dependencies || {});
const peers = Object.keys(pkg.peerDependencies || {});

const makePlugins = (browser) => [
  json(),
  nodeResolve({ extensions, browser, preferBuiltins: !browser }),
  commonjs(),
  babel({ extensions }),
  terser(),
];

// Node-targeted ESM + CJS (externalize all deps; Node loads them)
const nodeBundle = {
  input: 'src/index.ts',
  external: [deps, peers].flat(),
  output: [
    { file: pkg.module, format: 'esm' },
    { file: pkg.main.replace('.js', '.cjs'), format: 'cjs' },
  ],
  plugins: makePlugins(false),
};

// Browser-targeted UMD (bundle cross-fetch polyfill; leave bson external)
const browserExternals = deps.filter((d) => d !== 'cross-fetch').concat(peers);
const browserBundle = {
  input: 'src/index.ts',
  external: browserExternals,
  output: [
    {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      globals: { bson: 'BSON' },
    },
  ],
  plugins: makePlugins(true),
};

export default [nodeBundle, browserBundle];
