/**
 * SVG (c) Robby Kraft
 */

import Debug from "../environment/debug";
import Constructor from "./constructor";
import Nodes from "./nodes";
import Prepare from "./prepare";

const elements = {};

// is there some way to inject the custom primitives in here?

Object.keys(Nodes).forEach(key => Nodes[key]
  .forEach(nodeName => {
    elements[nodeName] = function (...args) {
      return Prepare(Constructor(nodeName, ...args));
    }
  }));

Debug.log(elements);

// the placeholder constructor. create any element type in the SVG namespace
// const createElement = function (tagName) {
//   return window.document.createElementNS(svgNS, tagName);
// };

export default elements;
