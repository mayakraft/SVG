/**
 * SVG (c) Robby Kraft
 */

import K from "../environment/keys";

const is_iterable = (obj) => {
  return obj != null && typeof obj[Symbol.iterator] === K.function;
};

const semi_flatten_arrays = function () {
  switch (arguments.length) {
    case undefined:
    case 0: return Array.from(arguments);
    // only if its an array (is iterable) and NOT a string
    case 1: return is_iterable(arguments[0]) && typeof arguments[0] !== "string"
      ? semi_flatten_arrays(...arguments[0])
      : [arguments[0]];
    default:
      return Array.from(arguments).map(a => (is_iterable(a)
        ? [...semi_flatten_arrays(a)]
        : a));
  }
};

/**
 * totally flatten, recursive
 * @returns an array, always.
 */
const flatten_arrays = function () {
  const arr = semi_flatten_arrays(arguments);
  return arr.length > 1
    ? arr.reduce((a, b) => a.concat(b), [])
    : arr;
};

export default flatten_arrays;
