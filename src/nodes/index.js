/**
 * SVG (c) Robby Kraft
 */

import Constructor from "./constructor";
import NodeNames from "./nodeNames";
import Prepare from "./prepare";

const elements = {};

// is there some way to inject the custom primitives in here?

Object.keys(NodeNames).forEach(key => NodeNames[key]
  .forEach(nodeName => {
    elements[nodeName] = function (...args) {
      return Prepare(Constructor(nodeName, ...args));
    }
  }));

// the placeholder constructor. create any element type in the SVG namespace
// const createElement = function (tagName) {
//   return window.document.createElementNS(svgNS, tagName);
// };

export default elements;
