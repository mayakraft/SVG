/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
import svgNS from "../environment/namespace";
import Args from "./arguments/index";
import CustomNodes from "./custom/index";
import NodeNames from "./nodeNames";

const nodeNames = {};
const argsMethods = {};

Object.keys(NodeNames).forEach(key => NodeNames[key].forEach(nodeName => {
  nodeNames[nodeName] = nodeName;
  argsMethods[nodeName] = (...args) => args;
}));

Object.keys(CustomNodes.names).forEach(customName => {
  nodeNames[customName] = CustomNodes.names[customName];
  argsMethods[customName] = CustomNodes.arguments[customName];
});

const constructor = function (nodeName, ...args) {
  return Args(
    window.document.createElementNS(svgNS, nodeNames[nodeName]),
    ...argsMethods[nodeName](...args)
  );
};

export default constructor;
