/**
 * SVG (c) Robby Kraft
 */

import Debug from "../environment/debug";
import Nodes from "../nodes/nodes";
import DOM from "./dom";
import Setters from "./setters";
import ClipMask from "./clipMask";
import Transforms from "./transforms";
import CustomSetters from "./custom";

// import TouchEvents from "../events/touch";

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

// clipPath and Mask as attaching onto the object.
[Nodes.t, Nodes.v, Nodes.g].forEach(category => category.forEach(node => {
  Object.keys(ClipMask).forEach(method => {
    nodeMethods[node][method] = (el, ...args) => {
      ClipMask[method](el, ...args);
      return el;
    }
  });
}));

const toKebab = string => string
  .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
  .toLowerCase();

const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach(key => el.setAttribute(toKebab(key), attrs[key]));
  return el;
};

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
    nodeMethods[node].setAttributes = setAttributes;
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
