/**
 * SVG (c) Kraft
 */
import * as S from "../environment/strings";
import svg_semi_flatten from "./semi-flatten";

/**
 * totally flatten, recursive
 * @returns an array, always.
 */
const svg_flatten_arrays = function () {
	return svg_semi_flatten(arguments).reduce((a, b) => a.concat(b), []);
};

export default svg_flatten_arrays;
