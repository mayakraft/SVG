/**
 * SVG (c) Robby Kraft
 */

import findCoordinates from "./coordinates";
import flatten from "./flatten";
import K from "../../environment/keys";

const textArguments = function (element, ...args) {
  const point = findCoordinates(...flatten(...args));
  const text = args.filter(a => typeof a === K.string);
  if (text) {
    element.innerHTML = text;
  }
  if (point.length > 1) {
    ["x", "y"].forEach((key, i) => element.setAttribute(key, point[i]));
  }
  return element;
};

export default textArguments;