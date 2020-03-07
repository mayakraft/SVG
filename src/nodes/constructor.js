/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
import svgNS from "../environment/namespace";
import Args from "./arguments/index";
// import CustomNodes from "./custom/index";
import Nodes from "./nodes";

const nodeNames = {};
const argsMethods = {};

Object.keys(Nodes).forEach(key => Nodes[key].forEach(nodeName => {
  nodeNames[nodeName] = nodeName;
  argsMethods[nodeName] = (...args) => args;
}));

// Object.keys(CustomNodes).forEach(key => {
//   nodeNames[key] = CustomNodes[key].tagName;
//   argsMethods[key] = CustomNodes[key].arguments;
// })

const constructor = function (nodeName, ...args) {
  return Args(
    window.document.createElementNS(svgNS, nodeNames[nodeName]),
    ...argsMethods[nodeName](...args)
  );
};

export default constructor;
