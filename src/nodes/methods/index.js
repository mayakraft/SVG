/**
 * SVG (c) Robby Kraft
 */

import SVG from "./svg";
import Path from "./path";

const nodeMethods = {
  svg: SVG,
  path: Path,
}

const methods = {};

Object.keys(nodeMethods).forEach(nodeName => {
  methods[nodeName] = {};
  Object.keys(nodeMethods[nodeName]).forEach(method => {
    methods[nodeName][method] = (el, ...args) => nodeMethods[nodeName][method].call(methods, el, ...args);
  });
});

export default methods;
