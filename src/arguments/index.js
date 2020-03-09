/**
 * SVG (c) Robby Kraft
 */

/**
 * convert all user-supplied arguments into a flat array
 * to match the expected arguments ordered in "attributes"
 */
import window from "../environment/window";
import svgNS from "../environment/namespace";
import K from "../environment/keys";

import flatten from "./flatten";
import coordinates from "./coordinates";

import svgArguments from "./svg";
import textArguments from "./text";

import attributes from "../attributes/attributes";

import viewBox from "./viewBox";

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

const UUID = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

const makeIDString = (...args) => args
  .filter(a => typeof a === K.string || a instanceof String)
  .shift() || UUID();

// sort incoming arguments to match the order of attributes in the master list
const sortArgs = (nodeName, ...args) => {
  switch (nodeName) {
    case "svg": return [viewBox(...args)].filter(a => a !== undefined);
    case "text": return coordinates(...flatten(...args)).slice(0, 2);
    case "line": return coordinates(...flatten(...args));
    case "polyline":
    case "polygon": return [polyString(...coordinates(...flatten(...args)))];
    case "mask":
    case "clipPath":
    case "symbol":
    case "marker": return [makeIDString(...args)];
    default: break;
  }
  return args;
};

export default (element, ...args) => {
  const nodeName = element.nodeName;

  // required attributes for elements like <svg>, <style>
  if (typeof RequiredAttributes[nodeName] === K.object && RequiredAttributes[nodeName] !== null) {
    Object.keys(RequiredAttributes[nodeName])
      .forEach(key => element.setAttribute(key, RequiredAttributes[nodeName][key]));
  }
  // custom initializers for anything that ISN'T an attribute=value pair.
  // for example: append the SVG to a parent.
  switch (nodeName) {
    case "svg": svgArguments(element, ...args); break;
    case "text": textArguments(element, ...args); break;
    default: break;
  }

  // set attribute=value pair, if they exist, and if the user supplied arguments
  const keys = attributes[nodeName];
  if (keys === undefined) { return element; }
  sortArgs(nodeName, ...args).forEach((v, i) => {
    if (keys[i] != null) {
      element.setAttribute(keys[i], v);
    }
  })
  return element;
};
