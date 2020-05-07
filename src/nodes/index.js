/**
 * SVG (c) Robby Kraft
 */

import Debug from "../environment/debug";
import Constructor from "./constructor";
import NodeNames from "./nodeNames";

const elements = {};

Object.keys(NodeNames).forEach(key => NodeNames[key]
  .forEach((nodeName) => {
    elements[nodeName] = (...args) => Constructor(nodeName, ...args);
  }));

Debug.log(elements);

export default elements;
