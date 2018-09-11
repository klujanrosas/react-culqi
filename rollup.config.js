import babel from 'rollup-plugin-babel';
import bundleSize from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const input = './src/index.js';

const external = ['react'];

const plugins = [babel(), nodeResolve(), commonjs(), bundleSize()];

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    external,
    plugins,
  },

  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    external,
    plugins,
  },
];
