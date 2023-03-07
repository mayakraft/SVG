/**
 * SVG (c) Kraft
 */
import {
	str_function,
	str_string,
} from "../environment/strings.js";

const svgIsIterable = (obj) => obj != null
	&& typeof obj[Symbol.iterator] === str_function;
/**
 * @description flatten only until the point of comma separated entities.
 * This will preserve vectors (number[]) in an array of array of vectors.
 * @param {any[][]} args any array, intended to contain arrays of arrays.
 * @returns {array[]} a flattened copy, flattened up until the point before
 * combining arrays of elements.
 */
export const svgSemiFlattenArrays = function () {
	switch (arguments.length) {
	case 0: return Array.from(arguments);
	// only if its an array (is iterable) and NOT a string
	case 1: return svgIsIterable(arguments[0]) && typeof arguments[0] !== str_string
		? svgSemiFlattenArrays(...arguments[0])
		: [arguments[0]];
	default:
		return Array.from(arguments).map(a => (svgIsIterable(a)
			? [...svgSemiFlattenArrays(a)]
			: a));
	}
};
export default svgSemiFlattenArrays;
