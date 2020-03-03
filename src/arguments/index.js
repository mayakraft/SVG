/**
 * convert all user-supplied arguments into a flat array
 * to match the expected arguments ordered in "map"
 */

import window from "../environment/window";
import flatten from "./flatten";
import findCoordinates from "./coordinates";
import svgArguments from "./svg";
import textArguments from "./text";

const map = {
  line: ["x1", "y1", "x2", "y2"],
  rect: ["x", "y", "width", "height"],
  circle: ["cx", "cy", "r"],
  ellipse: ["cx", "cy", "rx", "ry"],
  polygon: ["points"],
  polyline: ["points"],
  path: ["d"],
};

const polyString = function (...numbers) {
  return Array.from(Array(Math.floor(numbers.length / 2)))
    .map((_, i) => `${numbers[i*2+0]},${numbers[i*2+1]}`)
    .join(" ");
};

const toArray = function (nodeName, ...args) {
  switch (nodeName) {
    case "line": return findCoordinates(...flatten(...args));
    case "polyline":
    case "polygon": return [polyString(...findCoordinates(...flatten(...args)))];
    default: break;
  }
  return args;
};

const Args = function (element, ...args) {
  const nodeName = element.nodeName;
  switch (nodeName) {
    case "svg": return svgArguments(element, ...args);
    case "text": return textArguments(element, ...args);
    default: break;
  }
  const keys = map[nodeName];
  if (keys === undefined) { return element; }
  const values = toArray(nodeName, ...args);
  keys.forEach((key, i) => {
    if (values[i] != null) {
      element.setAttribute(key, values[i]);
    }
  });
  return element;
};

export default Args;
