import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
        },
        {
            file: "dist/index.min.js",
            format: "cjs",
            plugins: [terser()],
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
        },
    ],
    plugins: [commonjs(), typescript()],
};
