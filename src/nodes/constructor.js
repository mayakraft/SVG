/**
 * SVG (c) Robby Kraft
 */

import Debug from "../environment/debug";
import window from "../environment/window";
import svgNS from "../environment/namespace";
import Args from "./arguments/index";
import CustomNodes from "./custom/index";
import Nodes from "./nodes";
import Prepare from "./prepare";

const nodeNames = {};
const argsMethods = {};

Object.keys(Nodes).forEach(key => Nodes[key].forEach(nodeName => {
  nodeNames[nodeName] = nodeName;
  argsMethods[nodeName] = (...args) => args;
}));

Object.keys(CustomNodes).forEach(key => {
  nodeNames[key] = CustomNodes[key].tagName;
  argsMethods[key] = CustomNodes[key].arguments;
});

Debug.log(nodeNames);
Debug.log(argsMethods);

const constructor = function (nodeName, ...args) {
  return Prepare(
    Args(
      window.document.createElementNS(svgNS, nodeNames[nodeName]),
      ...argsMethods[nodeName](...args)
    )
  );
};

Prepare.Constructor = constructor;

export default constructor;
