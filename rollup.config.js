import cleanup from "rollup-plugin-cleanup";
import terser from "@rollup/plugin-terser";

const input = "src/index.js";
const name = "svg";
const banner = "/* svg (c) Kraft, MIT License */";

export default [{
	input,
	output: {
		name,
		file: "svg.js",
		format: "umd",
		banner,
	},
	// plugins: [cleanup(), terser()],
	plugins: [cleanup()],
}, {
	input,
	output: {
		name,
		file: "svg.module.js",
		format: "es",
		banner,
	},
	plugins: [cleanup()],
}, {
	input,
	output: {
		name,
		dir: "module/",
		format: "es",
		banner,
		preserveModules: true,
		generatedCode: {
			constBindings: true,
			objectShorthand: true,
		},
	},
	plugins: [cleanup()],
}, {
	input,
	output: {
		name,
		file: "svg.module.comments.js",
		format: "es",
		banner,
	},
	plugins: [],
}];
