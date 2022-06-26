/**
 * SVG (c) Kraft
 */
import * as S from "../environment/strings";

const svg_is_iterable = (obj) => {
	return obj != null && typeof obj[Symbol.iterator] === S.str_function;
};
/**
 * flatten only until the point of comma separated entities. recursive
 * @returns always an array
 */
const svg_semi_flatten_arrays = function () {
	switch (arguments.length) {
		case undefined:
		case 0: return Array.from(arguments);
		// only if its an array (is iterable) and NOT a string
		case 1: return svg_is_iterable(arguments[0]) && typeof arguments[0] !== S.str_string
			? svg_semi_flatten_arrays(...arguments[0])
			: [arguments[0]];
		default:
			return Array.from(arguments).map(a => (svg_is_iterable(a)
				? [...svg_semi_flatten_arrays(a)]
				: a));
	}
};

export default svg_semi_flatten_arrays;
