/**
 * SVG (c) Robby Kraft
 */

const is_iterable = obj => obj != null
  && typeof obj[Symbol.iterator] === "function";

export const flatten_input = function (...args) {
  switch (args.length) {
    case undefined:
    case 0: return args;
    // only if its an array (is iterable) and NOT a string
    case 1: return is_iterable(args[0]) && typeof args[0] !== "string"
      ? flatten_input(...args[0])
      : [args[0]];
    default:
      return Array.from(args)
        .map(a => (is_iterable(a)
          ? [...flatten_input(a)]
          : a))
        .reduce((a, b) => a.concat(b), []);
  }
};
