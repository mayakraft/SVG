/**
 * SVG (c) Robby Kraft
 */

import window from "./window";

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
    .filter(p => typeof svg[p] === "function")
    .forEach((name) => { environment[name] = svg[name].bind(svg); });
  // special case: SVG top level
  const forbidden = ["svg", "style", "setPoints", "setArc", "setEllipticalArc", "setBezier"];
  Object.keys(window.SVG)
    .filter(key => environment[key] === undefined)
    .filter(key => forbidden.indexOf(key) === -1)
    .forEach((key) => { environment[key] = window.SVG[key]; });
  // bind events
  // and other top level svg setters
  Object.defineProperty(window, "mousePressed", {
    set: (value) => { svg.mousePressed = value; },
    get: () => svg.mousePressed
  });
  Object.defineProperty(window, "mouseReleased", {
    set: (value) => { svg.mouseReleased = value; },
    get: () => svg.mouseReleased
  });
  Object.defineProperty(window, "mouseMoved", {
    set: (value) => { svg.mouseMoved = value; },
    get: () => svg.mouseMoved
  });
  Object.defineProperty(window, "scroll", {
    set: (value) => { svg.scroll = value; },
    get: () => svg.scroll
  });
  Object.defineProperty(window, "animate", {
    set: (value) => { svg.animate = value; },
    get: () => svg.animate
  });
  Object.defineProperty(window, "fps", {
    set: (value) => { svg.fps = value; },
    get: () => svg.fps
  });
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
