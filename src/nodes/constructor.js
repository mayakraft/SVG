/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
import svgNS from "../environment/namespace";
import Args from "./arguments/index";
// import CustomNodes from "./custom/index";
import NodeNames from "./nodeNames";

const nodeNames = {};
const argsMethods = {};

Object.keys(NodeNames).forEach(key => NodeNames[key].forEach(nodeName => {
  nodeNames[nodeName] = nodeName;
  argsMethods[nodeName] = (...args) => args;
}));

// this needs to be re-written. ordere shuffled around
// Object.keys(CustomNodes.names).forEach(customName => {
//   nodeNames[customName] = CustomNodes.names[customName];
//   argsMethods[customName] = CustomNodes.arguments[customName];
// });

// system used to be this

// const nodes = {
//   names: {
//     arc: K.path,
//     wedge: K.path,
//     parabola: "polyline",
//     regularPolygon: "polygon",
//     roundRect: K.path,
//   },
//   arguments: {
//     arc: arcArguments,
//     wedge: wedgeArguments,
//     parabola: parabolaArguments,
//     regularPolygon: regularPolygonArguments,
//     roundRect: roundRectArguments,
//   }
// };

// export default nodes;


const constructor = function (nodeName, ...args) {
  return Args(
    window.document.createElementNS(svgNS, nodeNames[nodeName]),
    ...argsMethods[nodeName](...args)
  );
};

export default constructor;
