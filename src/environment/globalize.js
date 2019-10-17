/**
 * SVG (c) Robby Kraft
 */

import window from "./window";

// const { SVG } = window;

/**
 *
 * this creates a more accessible interface in the direction of Processing / p5.js
 *
 * only works for browser! no node.
 * this attaches an SVG to the document, and binds member functions to the window
 *
 */

const bindSVGMethodsTo = function (svg, environment) {
  // bind all member methods of window.svg to the environment
  Object.getOwnPropertyNames(svg)
    .filter(p => typeof svg[p] === "function")
    .forEach((name) => { environment[name] = svg[name].bind(svg); });
  // special case: SVG top level
  const forbidden = ["svg", "style", "setPoints", "setArc", "setEllipticalArc", "setBezier"];
  Object.keys(window.SVG)
    .filter(key => environment[key] === undefined)
    .filter(key => forbidden.indexOf(key) === -1)
    .forEach((key) => { environment[key] = window.SVG[key]; });
};

const globalize = function (svg, ...args) {
  let element = svg;
  if (element == null) {
    element = window.SVG(...args);
  }
  // attach methods to window
  bindSVGMethodsTo(element, window);
  return element;
};

export default globalize;
