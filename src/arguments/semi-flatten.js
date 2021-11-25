/**
 * SVG (c) Robby Kraft
 */
import * as K from "../environment/keys";

const is_iterable = (obj) => {
  return obj != null && typeof obj[Symbol.iterator] === K._function;
};
/**
 * flatten only until the point of comma separated entities. recursive
 * @returns always an array
 */
export const semi_flatten_arrays = function () {
  switch (arguments.length) {
    case undefined:
    case 0: return Array.from(arguments);
    // only if its an array (is iterable) and NOT a string
    case 1: return is_iterable(arguments[0]) && typeof arguments[0] !== K._string
      ? semi_flatten_arrays(...arguments[0])
      : [arguments[0]];
    default:
      return Array.from(arguments).map(a => (is_iterable(a)
        ? [...semi_flatten_arrays(a)]
        : a));
  }
};

export default semi_flatten_arrays;
