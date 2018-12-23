import minify from 'rollup-plugin-babel-minify';

module.exports = {
	input: './src/index.js',
	output: {
		name: 'SVG',
		file: 'svg.js',
		format: 'umd',    // for standalone <script src="">
		// format: 'es',  // for modules "import..from.."
		banner: "/* SVG (c) Robby Kraft, MIT License */"
	},
	plugins: [
		minify( {
			bannerNewLine: true,
			comments: false
		} )
	]
};
