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

// in most cases the key === value. "line": "line"
// but in the case of custom shapes, for example: "regularPolygon": "polygon"
const nodeNames = {};
Object.keys(Nodes).forEach(key => Nodes[key].forEach(nodeName => {
  nodeNames[nodeName] = nodeName;
}));

// incorporate CustomNodes throughout the library
// add these custom entries
Object.keys(CustomNodes).forEach(key => {
  nodeNames[key] = CustomNodes[key].nodeName;
});
Arguments.prepareCustomNodes(CustomNodes);
Methods.prepareCustomNodes(CustomNodes);

Debug.log(nodeNames);

const constructor = (nodeName, ...args) => Methods(nodeName, Arguments(
  nodeName,
  window.document.createElementNS(svgNS, nodeNames[nodeName]),
  ...args));

Methods.Constructor = constructor;

export default constructor;
