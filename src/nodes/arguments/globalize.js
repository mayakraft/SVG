/**
 * SVG (c) Robby Kraft
 */

import window from "./window";
import K from "../../environment/keys";

// const { SVG } = window;

/**
 * this creates a more accessible interface for beginner coders.
 * similar to the structure of Processing / p5.js
 *
 * only works for browser! no node.
 * this attaches an SVG to the document, and binds member functions to the window
 */
const bindSVGMethodsTo = function (svg, environment) {
  // bind all member methods of window.svg to the environment
  Object.getOwnPropertyNames(svg)
    .filter(p => typeof svg[p] === K.function)
    .forEach((name) => { environment[name] = svg[name].bind(svg); });
  // special case: SVG top level
  const forbidden = [K.svg, K.style, "setPoints", "setArc", "setEllipticalArc", "setBezier"];
  Object.keys(window.SVG)
    .filter(key => environment[key] === undefined)
    .filter(key => forbidden.indexOf(key) === -1)
    .forEach((key) => { environment[key] = window.SVG[key]; });
  // bind events
  // and other top level svg setters
  ["mousePressed", "mouseReleased", "mouseMoved", "scroll", "animate", "fps"]
    .forEach(key => Object.defineProperty(window, key, {
      set: (value) => { svg[key] = value; },
      get: () => svg[key]
    }));
};

export default (svg, ...args) => {
  let element = svg;
  if (element == null) {
    element = window.SVG(...args);
  }
  // attach methods to window
  bindSVGMethodsTo(element, window);
  return element;
};
