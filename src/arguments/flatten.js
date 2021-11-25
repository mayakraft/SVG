/**
 * SVG (c) Robby Kraft
 */
import * as K from "../environment/keys";
import semi_flatten from "./semi-flatten";

/**
 * totally flatten, recursive
 * @returns an array, always.
 */
const flatten_arrays = function () {
  return semi_flatten(arguments).reduce((a, b) => a.concat(b), []);
};

export default flatten_arrays;
