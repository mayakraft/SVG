// import minify from 'rollup-plugin-babel-minify';
import cleanup from "rollup-plugin-cleanup";

module.exports = {
	input: './src/index.js',
	output: {
		name: 'SVG',
		file: 'svg.js',
		format: 'umd',    // for npm and standalone <script src="">
		// format: 'es',  // for modules "import..from.."
		banner: "/* SVG (c) Robby Kraft, MIT License */"
	},
	plugins: [
		cleanup({
			comments: "none",
			maxEmptyLines: 0
		}),
		// minify( {
		// 	bannerNewLine: true,
		// 	comments: false
		// } )
	]
};
