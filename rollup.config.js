import cleanup from "rollup-plugin-cleanup";
import babel from "rollup-plugin-babel";
import minify from "rollup-plugin-babel-minify";

module.exports = [{
  input: "./src/index.js",
  output: {
    name: "SVG",
    file: "svg.js",
    format: "umd", // for npm and standalone <script src="">
    // format: "es", // for modules "import..from.."
    banner: "/* SVG (c) Robby Kraft, MIT License */",
  },
  plugins: [
    cleanup({
      comments: "none",
      maxEmptyLines: 0,
    }),
    babel({
      babelrc: false,
      presets: [["@babel/env", { modules: false }]],
    }),
  ],
},
{
  input: "src/index.js",
  output: {
    name: "SVG",
    file: "svg.min.js",
    format: "umd",
    // format: "es",
    banner: "/* SVG (c) Robby Kraft, MIT License */",
    bannerNewline: true,
  },
  plugins: [
    cleanup({ comments: "none" }),
    babel({
      babelrc: false,
      presets: [["@babel/env", { modules: false }]],
    }),
    minify({ mangle: { names: false } }),
  ],
},
];
