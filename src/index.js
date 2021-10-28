/**
 * SVG (c) Robby Kraft
 */
import SVG, { SVG_Constructor } from "./library";
import Nodes from "./nodes/index";
import Constructor from "./nodes/constructor";
import window from "./environment/window";
import NS from "./environment/namespace";
import * as K from "./environment/keys";
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

const initialize = function (svg, ...args) {
  args.filter(arg => typeof arg === K._function)
    .forEach(func => func.call(svg, svg));
};

SVG_Constructor.init = function () {
  const svg = Constructor(K.svg, ...arguments);
  // call initialize as soon as possible. check if page has loaded
  if (window.document.readyState === "loading") {
    window.document.addEventListener("DOMContentLoaded", () => initialize(svg, ...arguments));
  } else {
    initialize(svg, ...arguments);
  }
  return svg;
};

// const SVG = function () {
//   const svg = Constructor(K.svg, ...arguments);
//   // call initialize as soon as possible. check if page has loaded
//   if (window.document.readyState === "loading") {
//     window.document.addEventListener("DOMContentLoaded", () => initialize(svg, ...arguments));
//   } else {
//     initialize(svg, ...arguments);
//   }
//   return svg;
// };

SVG.NS = NS;
SVG.linker = linker.bind(SVG);
SVG.use = use.bind(SVG);
Object.assign(SVG, Nodes);
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

export default SVG;
