/**
 * SVG (c) Kraft
 */
import flatten from "./flatten";
import coordinates from "./coordinates";

const viewBoxValue = function (x, y, width, height, padding = 0) {
	const scale = 1.0;
	const d = (width / scale) - width;
	const X = (x - d) - padding;
	const Y = (y - d) - padding;
	const W = (width + d * 2) + padding * 2;
	const H = (height + d * 2) + padding * 2;
	return [X, Y, W, H].join(" ");
};

/**
 * this will attempt to match a set of viewbox parameters
 * undefined, if it cannot build a string
 */
export default function () {
	const numbers = coordinates(...flatten(arguments));
	if (numbers.length === 2) { numbers.unshift(0, 0); }
	return numbers.length === 4 ? viewBoxValue(...numbers) : undefined;
}
