
const isIterable = function (obj) {
  return obj != null && typeof obj[Symbol.iterator] === "function";
};

const flatten = function (...args) {
  switch (args.length) {
    case undefined:
    case 0: return args;
    // only if its an array (is iterable) and NOT a string
    case 1: return isIterable(args[0]) && typeof args[0] !== "string"
      ? flatten(...args[0])
      : [args[0]];
    default:
      return Array.from(args)
        .map(a => (isIterable(a)
          ? [...flatten(a)]
          : a))
        .reduce((a, b) => a.concat(b), []);
  }
};

export default flatten;
