import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';

const input = 'lib/index';
const external = ['exenv', 'prop-types', 'react'];

const globals = {
  'prop-types': 'PropTypes',
  exenv: 'exenv',
  react: 'React',
};

const babelOptions = {
  babelrc: false,
  exclude: '**/node_modules/**',
  presets: [
    [
      'env',
      {
        modules: false,
      },
    ],
    'react',
    'stage-1',
  ],
  plugins: ['external-helpers', 'transform-class-properties'],
};

export default [
  {
    input,
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'ReactKeyHandler',
      globals,
    },
    external,
    plugins: [
      resolve(),
      babel(babelOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
    ],
  },

  {
    input,
    output: {
      file: 'dist/umd/index.min.js',
      format: 'umd',
      name: 'ReactKeyHandler',
      globals,
    },
    external,
    plugins: [
      resolve(),
      babel(babelOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      terser(),
    ],
  },
  {
    input,
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
    },
    external,
    plugins: [resolve(), babel(babelOptions), sizeSnapshot()],
  },

  {
    input,
    output: {
      file: 'dist/esm/index.js',
      format: 'esm',
    },
    external,
    plugins: [resolve(), babel(babelOptions), sizeSnapshot()],
  },
];
