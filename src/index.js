/**
 * SVG (c) Robby Kraft
 */

import Nodes from "./nodes/index";
import Constructor from "./nodes/constructor";
import window from "./environment/window";
import NS from "./environment/namespace";
import K from "./environment/keys";
import linker from "./environment/linker";
import use from "./environment/use";
import load from "./file/load";
import save from "./file/save";

// core methods
import Case from "./arguments/case";
import coordinates from "./arguments/coordinates";
import flatten from "./arguments/flatten";
import attributes from "./attributes/singleElements";
import cdata from "./environment/cdata";
import * as detect from "./environment/detect";
import classMethods from "./methods/classId";
import dom from "./methods/dom";
import * as math from "./methods/math";
import transforms from "./methods/transforms";
import * as viewBox from "./methods/viewBox";
import children from "./nodes/nodesChildren";

// for use()
// import NODES from "./nodes/nodes";

const initialize = function (svg, ...args) {
  args.filter(arg => typeof arg === K.function)
    .forEach(func => func.call(svg, svg));
};

const SVG = function () {
  const svg = Constructor(K.svg, ...arguments);
  // call initialize as soon as possible. check if page has loaded
  if (window.document.readyState === "loading") {
    window.document.addEventListener("DOMContentLoaded", () => initialize(svg, ...arguments));
  } else {
    initialize(svg, ...arguments);
  }
  return svg;
};

Object.assign(SVG, Nodes);
SVG.NS = NS;
SVG.linker = linker.bind(SVG);
SVG.use = use.bind(SVG);
SVG.core = Object.assign(Object.create(null), {
  load,
  save,
  coordinates,
  flatten,
  attributes,
  children,
  cdata,
  detect,
}, Case, classMethods, dom, math, transforms, viewBox);

// SVG.use = (library) => {
//   const oldInit = NODES.svg.init;
//   NODES.svg.init = function (element, ...args) {
//     // get the input from a string or an object
//     // const graph = get_object(arg);
//     const fold_object = getFoldObject(args);
//     if (fold_object) {
//       // options
//       const options = library.options(...args);
//       // render
//       library.render_into_svg(element, fold_object, options);
//       // return
//       // return element;
//     }
//     // const foldSVG = library(getFoldObject(args), { output: "svg" });
//     // const foldSVG = library.render_components(...args);
//     // if (foldSVG && foldSVG.childNodes) {
//     //   Array.from(foldSVG.childNodes).forEach(g => element.appendChild(g));
//     //   Array.from(foldSVG.attributes)
//     //     .forEach(attr => element.setAttribute(attr.nodeName, attr.nodeValue));
//     // }
//     return oldInit(element, ...args);
//   }
// };

export default SVG;
