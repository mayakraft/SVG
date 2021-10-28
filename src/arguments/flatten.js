/**
 * SVG (c) Robby Kraft
 */
import * as K from "../environment/keys";

const is_iterable = (obj) => {
  return obj != null && typeof obj[Symbol.iterator] === K._function;
};

/**
 * totally flatten, recursive
 * @returns an array, always.
 */
const flatten_arrays = function () {
  switch (arguments.length) {
    case undefined:
    case 0: return Array.from(arguments);
    // only if its an array (is iterable) and NOT a string
    case 1: return is_iterable(arguments[0]) && typeof arguments[0] !== K.string
      ? flatten_arrays(...arguments[0])
      : [arguments[0]];
    default:
      return Array.from(arguments).map(a => (is_iterable(a)
        ? [...flatten_arrays(a)]
        : a)).reduce((a, b) => a.concat(b), []);
  }
};

export default flatten_arrays;
