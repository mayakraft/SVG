import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleanup from "rollup-plugin-cleanup";

module.exports = [{
  input: "src/index.js",
  output: {
    name: "SVG",
    file: "svg.js",
    format: "umd",
    banner: "/* SVG (c) Robby Kraft, MIT License */",
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
