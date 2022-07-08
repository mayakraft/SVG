import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const input = "src/index.js";
const name = "SVG";
const banner = "/* SVG (c) Kraft, MIT License */";

export default [{
	input,
	output: {
		name,
		file: "svg.js",
		format: "umd",
		banner,
	},
	plugins: [nodeResolve(), cleanup(), terser()],
}, {
	input,
	output: {
		name,
		file: "svg.module.js",
		format: "es",
		banner,
	},
	plugins: [nodeResolve(), cleanup()],
}, {
	input,
	output: {
		name,
		file: "svg.module.comments.js",
		format: "es",
		banner,
	},
	plugins: [nodeResolve()],
}];
