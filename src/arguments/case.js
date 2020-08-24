/**
 * SVG (c) Robby Kraft
 */

// as of now, this library is not using camel->kebab case
export default {
  toCamel: s => s
    .replace(/([-_][a-z])/ig, $1 => $1
    .toUpperCase()
    .replace("-", "")
    .replace("_", "")),
  // toKebab: s => s
  //   .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  //   .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
  //   .toLowerCase(),
  capitalized: s => s
    .charAt(0).toUpperCase() + s.slice(1)
};
