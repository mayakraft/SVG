/**
 * SVG (c) Robby Kraft
 */

import Arguments from "../arguments/index";
import Debug from "../environment/debug";
import window from "../environment/window";
import svgNS from "../environment/namespace";
import CustomNodes from "./custom/index";
import Nodes from "./nodes";
import Methods from "../methods";

const nodeNames = {};
// const argsMethods = {};

Object.keys(Nodes).forEach(key => Nodes[key].forEach(nodeName => {
  nodeNames[nodeName] = nodeName;
  // argsMethods[nodeName] = (...args) => args;
}));

// custom nodes
Object.keys(CustomNodes).forEach(key => {
  nodeNames[key] = CustomNodes[key].nodeName;
  // argsMethods[key] = CustomNodes[key].arguments;
});
Arguments.prepareCustomNodes(CustomNodes);
Methods.prepareCustomNodes(CustomNodes);

Debug.log(nodeNames);
// Debug.log(argsMethods);

const constructor = function (nodeName, ...args) {
  return Methods(nodeName,
    Arguments(nodeName, window.document.createElementNS(svgNS, nodeNames[nodeName]), ...args)
  );
    // ...argsMethods[nodeName](...args)));
};

Methods.Constructor = constructor;

export default constructor;
