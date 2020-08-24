/**
 * SVG (c) Robby Kraft
 */

import N from "./nodeNames";
import Spec from "./spec/index";
// import CustomNodes from "./custom/index";

import Attributes from "../attributes/index";
import ManyElements from "../attributes/manyElements";

import flatten from "../arguments/flatten";
import classId from "../methods/classId";
import DOM from "../methods/dom";
import Transforms from "../methods/transforms";
import URLs from "../methods/urls";

const Nodes = {};

// assuming custom nodes are drawing-type, make them known to the library
// N.v.push(...Object.keys(CustomNodes));
// // assuming custom nodes are drawing-type, append presentation attributes
// Object.keys(CustomNodes).forEach((node) => {
//   CustomNodes[node].attributes = (CustomNodes[node].attributes === undefined
//     ? [...ManyElements.presentation]
//     : CustomNodes[node].attributes.concat(ManyElements.presentation));
// });
// incorporate custom nodes as if they are drawing primitives.
Object.assign(Nodes, Spec);//, CustomNodes);

// in most cases the key === value. "line": "line"
// except custom shapes: "regularPolygon": "polygon"
Object.keys(N)
  .forEach(key => N[key]
    .filter(nodeName => Nodes[nodeName] === undefined)
    .forEach((nodeName) => {
      Nodes[nodeName] = {};
    }));

const passthrough = function () { return Array.from(arguments); };

// complete the lookup table. empty entries where nothing existed
Object.keys(Nodes).forEach((key) => {
  if (!Nodes[key].nodeName) { Nodes[key].nodeName = key; }
  if (!Nodes[key].init) { Nodes[key].init = passthrough; }
  if (!Nodes[key].args) { Nodes[key].args = passthrough; }
  if (!Nodes[key].methods) { Nodes[key].methods = {}; }
  if (!Nodes[key].attributes) {
    Nodes[key].attributes = Attributes[key] || [];
  }
});

const assign = (groups, Methods) => {
  groups.forEach(n =>
    Object.keys(Methods).forEach((method) => {
      Nodes[n].methods[method] = function () {
        Methods[method](...arguments);
        return arguments[0];
      };
    }));
};

assign(flatten(N.t, N.v, N.g, N.s, N.p, N.i, N.h, N.d), classId);
assign(flatten(N.t, N.v, N.g, N.s, N.p, N.i, N.h, N.d), DOM);
assign(flatten(N.v, N.g, N.s), Transforms);
assign(flatten(N.t, N.v, N.g), URLs);

export default Nodes;
