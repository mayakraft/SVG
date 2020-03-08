/**
 * SVG (c) Robby Kraft
 */

import Debug from "../../environment/debug";
import Transforms from "../view/transforms";
import Nodes from "../nodes";
import Setters from "./setters";
import CustomSetters from "./custom";
import DOM from "../dom/dom";

const makeExist = (obj, key) => {
  if (obj[key] === undefined) { obj[key] = {}; }
};

const nodeMethods = {};

// build a master lookup table, relating an element's attribute to a setter
//   circle: {
//     stroke: function () { ... },
//     fill: function () { ... },
//   },
//   svg: {
//     size: function () { ... },
//   }

// the most uniquely-defined methods
// 
Object.keys(CustomSetters).forEach(nodeName => {
  makeExist(nodeMethods, nodeName);
  Object.assign(nodeMethods[nodeName], CustomSetters[nodeName]);
});


// transforms "translate", "rotate"...
// all visible element types: text, visible drawings, group, svg
[Nodes.t, Nodes.v, Nodes.g, Nodes.s]
  .forEach(category => category.forEach(node => {
    makeExist(nodeMethods, node);
    Object.keys(Transforms).forEach(trans => {
      nodeMethods[node][trans] = Transforms[trans];
    });
  }));


// DOM methods, appendChild, removeChildren...
// text, drawings, group, svg, patterns, invisible, header, defs
[Nodes.t, Nodes.v, Nodes.g, Nodes.s, Nodes.p, Nodes.i, Nodes.h, Nodes.d]
  .forEach(category => category.forEach(node => {
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

Object.keys(Setters).forEach(nodeName => {
  makeExist(methods, nodeName);
  Object.keys(Setters[nodeName]).forEach(method => {
    const s = Setters[nodeName][method];
    // handle attribute(s) setters differently
    if (s.a !== undefined) {
      methods[nodeName][method] = (el, ...args) => {
        el.setAttribute(s.a, s.f(...args));
        return el;
      }
    }
    if (s.b !== undefined) {
      methods[nodeName][method] = (el, ...args) => {
        s.f(...args).forEach((v, i) => el.setAttribute(s.b[i], v));
        return el;
      }
    }
  });
});

Object.keys(nodeMethods).forEach(nodeName => {
  makeExist(methods, nodeName);
  Object.keys(nodeMethods[nodeName])
    .filter(method => methods[nodeName][method] === undefined)
    .forEach(method => {
      methods[nodeName][method] = (el, ...args) => nodeMethods[nodeName][method].call(methods, el, ...args);
    });
});

Debug.log(methods);

export default methods;
