/**
 * SVG in Javascript (c) Robby Kraft
 *
 * responsive, interactive SVG image with methods and handlers
 * @param: (number, number) width, height
 * @param: a DOM object or string DOM id. a parent to attach to
 * @param: a function that gets called after setup (callback)
 */

import * as ViewBox from "../attributes/viewBox";
import { svg } from "./primitives";
import Events from "../events/events";
import window from "../environment/window";
import { attachSVGMethods } from "../attributes/index";

const findElementInParams = function (...params) {
  const element = params.filter(arg => arg instanceof HTMLElement).shift();
  const idElement = params
    .filter(a => typeof a === "string" || a instanceof String)
    .map(str => window.document.getElementById(str))
    .shift();
  if (element != null) { return element; }
  return (idElement != null
    ? idElement
    : window.document.body);
};

const initSize = function (svgElement, params) {
  const numbers = params.filter(arg => !isNaN(arg));
  if (numbers.length >= 2) {
    svgElement.setAttributeNS(null, "width", numbers[0]);
    svgElement.setAttributeNS(null, "height", numbers[1]);
    ViewBox.setViewBox(svgElement, 0, 0, numbers[0], numbers[1]);
  } else if (svgElement.getAttribute("viewBox") == null) {
    // set a viewBox if viewBox doesn't yet exist
    const rect = svgElement.getBoundingClientRect();
    ViewBox.setViewBox(svgElement, 0, 0, rect.width, rect.height);
  }
};

// const prepareSVG = function (svgImage) {
//   attachClassMethods(svgImage);
//   attachViewBoxMethods(svgImage);
//   attachAppendableMethods(svgImage, drawMethods);
// };

const SVG = function (...params) {
  // create a new SVG
  const image = svg();

  // setup that can occur immediately
  initSize(image, params);
  attachSVGMethods(image);
  image.events = Events(image);

  const initialize = function () {
    // initialize that requires a loaded DOM. append to parent, run callback
    // process user options
    initSize(image, params);
    const parent = findElementInParams(...params);
    if (parent != null) { parent.appendChild(image); }
    // any function inside the arguments will get fired. with zero parameters.
    // a way of sending a callback to an unknown parameter #
    params.filter(arg => typeof arg === "function")
      .forEach(func => func());
  };

  // call initialize as soon as possible. check if page has loaded
  if (window.document.readyState === "loading") {
    // wait until after the <body> has rendered
    window.document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }

  return image;
};

export default SVG;
