/**
 * SVG (c) Robby Kraft
 */

import SVG from "./svg";
import Path from "./path";
import Transforms from "../view/transforms";
import NodeNames from "../nodes";
import Set from "./setters";
import DOM from "../dom/dom";
import Debug from "../../environment/debug";

const nodeMethods = {
  svg: SVG,
  path: Path,
};

const makeExist = (obj, key) => {
  if (obj[key] === undefined) { obj[key] = {}; }
};

Object.keys(Set).forEach(nodeName => {
  makeExist(nodeMethods, nodeName);
  Object.assign(nodeMethods[nodeName], Set[nodeName]);
});

// apply to all visible element types
[NodeNames.text, NodeNames.drawings, NodeNames.group, NodeNames.svg]
  .forEach(category => category.forEach(node => {
    makeExist(nodeMethods, node);
    Object.keys(Transforms).forEach(trans => {
      nodeMethods[node][trans] = Transforms[trans];
    });
  }));

// anything that can act as a container
[NodeNames.text, NodeNames.drawings, NodeNames.group, NodeNames.svg, NodeNames.patterns,
 NodeNames.nonVisible, NodeNames.header, NodeNames.defs].forEach(category => category.forEach(node => {
    makeExist(nodeMethods, node);
    Object.keys(DOM).forEach(methodName => {
      nodeMethods[node][methodName] = (el, ...args) => {
        DOM[methodName](el, ...args);
        return el;
      }
    });
  }));

// build the export object
const methods = {};

Object.keys(nodeMethods).forEach(nodeName => {
  methods[nodeName] = {};
  Object.keys(nodeMethods[nodeName]).forEach(method => {
    methods[nodeName][method] = (el, ...args) => nodeMethods[nodeName][method].call(methods, el, ...args);
  });
});

Debug.log(methods);

export default methods;
