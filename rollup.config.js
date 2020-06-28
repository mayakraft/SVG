import cleanup from "rollup-plugin-cleanup";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

module.exports = [{
  input: "src/index.js",
  output: {
    name: "SVG",
    file: "svg.js",
    format: "umd",
    banner: "/* SVG (c) Robby Kraft, MIT License */",
    bannerNewline: true,
  },
  plugins: [
    cleanup({ comments: "none" }),
    babel({
      babelrc: false,
      presets: [["@babel/env", { modules: false }]],
    }),
    terser(),
  ],
},
// {
//   input: "./src/index.js",
//   output: {
//     name: "SVG",
//     file: "svg.js",
//     format: "es", // for modules "import..from.."
//     banner: "/* SVG (c) Robby Kraft, MIT License */",
//   },
//   plugins: [
//     cleanup({
//       comments: "none",
//       maxEmptyLines: 0,
//     }),
//   ],
// },
];
