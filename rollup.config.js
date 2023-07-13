import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs'
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm'
            }
        ],
        plugins: [commonjs(), typescript()]
    },
    {
        input: 'types/index.d.ts',
        output: [
            {
                file: 'dist/index.d.ts',
                format: 'esm'
            }
        ],
        plugins: [dts()]
    }
];
