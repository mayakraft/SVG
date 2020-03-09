/**
 * SVG (c) Robby Kraft
 */

import Debug from "../environment/debug";
import Constructor from "./constructor";
import Nodes from "./nodes";

const elements = {};

Object.keys(Nodes).forEach(key => Nodes[key]
  .forEach(nodeName => {
    elements[nodeName] = function (...args) {
      return Constructor(nodeName, ...args);
    }
  }));

Debug.log(elements);

// the placeholder constructor. create any element type in the SVG namespace
// const createElement = function (tagName) {
//   return window.document.createElementNS(svgNS, tagName);
// };

export default elements;
