import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const extensions = ['.js', '.ts'];

const plugins = [
  json(),
  nodeResolve({ extensions }),
  commonjs(),
  babel({
    extensions,
  }),
  terser(),
];

export default [
  {
    input: 'src/index.ts',
    external: [
      Object.keys(pkg.dependencies || {}),
      Object.keys(pkg.peerDependencies || {}),
    ].flat(),
    output: [
      {
        file: pkg.module,
        format: 'esm',
      },
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        name: pkg.name,
        file: pkg.browser,
        format: 'umd',
      },
    ],
    plugins,
  },
];
