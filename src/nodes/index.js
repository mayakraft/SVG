/**
 * SVG (c) Robby Kraft
 */

import Constructor from "./constructor";
import NodeNames from "./nodeNames";
import Prepare from "./prepare";

const elements = {};

Object.keys(NodeNames).forEach(key => NodeNames[key]
  .forEach(nodeName => {
    elements[nodeName] = function (...args) {
      return Prepare(Constructor(nodeName, ...args));
    }
  }));

export default elements;
