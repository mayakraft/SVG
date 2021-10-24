import babel from "@rollup/plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';

const input = "src/index.js";
const name = "SVG";
const banner = "/* SVG (c) Robby Kraft, MIT License */";

module.exports = [{
  input,
  output: {
    name,
    file: "svg.es6.js",
    format: "es",
    banner,
  },
  plugins: [
    nodeResolve(),
    cleanup(),
  ],
}, {
  input,
  output: {
    name,
    file: "svg.js",
    format: "umd",
    banner,
  },
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"]
    }),
    cleanup(),
    terser(),
  ],
}];
