/**
 * SVG (c) Robby Kraft
 */

import Debug from "../environment/debug";
import Constructor from "./constructor";
import Nodes from "./nodes";

const elements = {};

Object.keys(Nodes).forEach(key => Nodes[key]
  .forEach(nodeName => {
    elements[nodeName] = (...args) => Constructor(nodeName, ...args);
  }));

Debug.log(elements);

// the placeholder constructor. create any element type in the SVG namespace
// const createElement = function (nodeName) {
//   return window.document.createElementNS(svgNS, nodeName);
// };

export default elements;
