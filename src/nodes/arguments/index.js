/**
 * SVG (c) Robby Kraft
 */

/**
 * convert all user-supplied arguments into a flat array
 * to match the expected arguments ordered in "attributes"
 */
import window from "../../environment/window";
import svgNS from "../../environment/namespace";
import K from "../../environment/keys";
import flatten from "./flatten";
import coordinates from "./coordinates";

import svgArguments from "./svg";
import textArguments from "./text";
import nonVisibleArguments from "./nonVisible";

import attributes from "../attributes";

const RequiredAttributes = {
  svg: {
    version: "1.1",
    xmlns: svgNS,
  },
  style: {
    type: "text/css"
  }
};

const polyString = (...numbers) => Array
  .from(Array(Math.floor(numbers.length / 2)))
  .map((_, i) => `${numbers[i*2+0]},${numbers[i*2+1]}`)
  .join(" ");

const toArray = (nodeName, ...args) => {
  switch (nodeName) {
    case "line": return coordinates(...flatten(...args));
    case "polyline":
    case "polygon": return [polyString(...coordinates(...flatten(...args)))];
    default: break;
  }
  return args;
};

export default (element, ...args) => {
  const nodeName = element.nodeName;

  // assign necessary attributes to this element
  if (typeof RequiredAttributes[nodeName] === K.object && RequiredAttributes[nodeName] !== null) {
    Object.keys(RequiredAttributes[nodeName])
      .forEach(key => element.setAttribute(key, RequiredAttributes[nodeName][key]));
  }

  switch (nodeName) {
    case "svg": return svgArguments(element, ...args);
    case "text": return textArguments(element, ...args);
    case "mask":
    case "clipPath":
    case "symbol":
    case "marker": return nonVisibleArguments(element, ...args);
    default: break;
  }
  const keys = attributes[nodeName];
  if (keys === undefined) { return element; }
  const values = toArray(nodeName, ...args);
  keys.forEach((key, i) => {
    if (values[i] != null) {
      element.setAttribute(key, values[i]);
    }
  });
  return element;
};
