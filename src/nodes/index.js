/**
 * SVG (c) Robby Kraft
 */

import Constructor from "./constructor";
import NodeNames from "./nodeNames";

const elements = {};

Object.keys(NodeNames).forEach(key => NodeNames[key]
  .forEach((nodeName) => {
    elements[nodeName] = (...args) => Constructor(nodeName, ...args);
  }));

export default elements;
