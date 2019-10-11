/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
import * as File from "../environment/file";
import Events from "../events/index";
import { svg, rect } from "./primitives";
import { removeChildren } from "../attributes/DOM";
import {
  getViewBox,
  setViewBox
} from "../attributes/viewBox";

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
    setViewBox(svgElement, 0, 0, numbers[0], numbers[1]);
  } else if (svgElement.getAttribute("viewBox") == null) {
    // set a viewBox if viewBox doesn't yet exist
    const frame = svgElement.getBoundingClientRect();
    setViewBox(svgElement, 0, 0, frame.width, frame.height);
  }
};

const getWidth = function (element) {
  const viewBox = getViewBox(element);
  if (viewBox == null) { return undefined; }
  return viewBox[2];
};

const getHeight = function (element) {
  const viewBox = getViewBox(element);
  if (viewBox == null) { return undefined; }
  return viewBox[3];
};

const setWidth = function (element, w) {
  const viewBox = getViewBox(element);
  viewBox[2] = w;
  return setViewBox(element, ...viewBox);
};

const setHeight = function (element, h) {
  const viewBox = getViewBox(element);
  viewBox[3] = h;
  return setViewBox(element, ...viewBox);
};

// const getWidthClient = function (svg) {
//   const w = parseFloat(svg.getAttributeNS(null, "width"), 10);
//   return w != null && !isNaN(w) ? w : svg.getBoundingClientRect().width;
// };
// const getHeightClient = function (svg) {
//   const h = parseFloat(svg.getAttributeNS(null, "height"), 10);
//   return h != null && !isNaN(h) ? h : svg.getBoundingClientRect().height;
// };

const size = function (element, ...args) {
// additional window functions
  if (args.length === 2
    && typeof args[0] === "number"
    && typeof args[1] === "number"
  ) {
    setViewBox(element, 0, 0, args[0], args[1]);
  } else if (args.length === 4
    && typeof args.map(a => typeof a === "number")
      .reduce((a, b) => a && b, true)
  ) {
    setViewBox(element, ...args);
  } else {
    // todo
  }
};

const background = function (element, color) {
  const parent = element.parentElement;
  if (parent != null) {
    parent.setAttribute("style", `background-color: ${color}`);
  }
  let backRect = element.querySelector("#svg-background-rectangle");
  if (backRect != null) {
    backRect.setAttribute("fill", color);
  } else {
    const viewBox = element.viewBox.baseVal;
    const frame = [viewBox.x, viewBox.y, viewBox.width - viewBox.x, viewBox.height - viewBox.y];
    backRect = rect(frame[0], frame[1], frame[2], frame[3])
      .fill(color);
    backRect.setAttribute("id", "svg-background-rectangle");
    element.prepend(backRect);
  }
};

const replaceWithSVG = function (oldSVG, newSVG) {
  // Part 1: reset old SVG
  // #1 clear attributes
  Array.from(oldSVG.attributes)
    .forEach(attr => oldSVG.removeAttribute(attr.name));
  // #2 clear contents
  removeChildren(oldSVG);
  // #3 add back important attributes, if they don't exist
  // let blankSVG = svg();
  // console.log(Array.from(blankSVG.attributes));

  // Part 2: copy contents over
  Array.from(newSVG.children).forEach((node) => {
    node.remove();
    oldSVG.appendChild(node);
  });
  Array.from(newSVG.attributes)
    .forEach(attr => oldSVG.setAttribute(attr.name, attr.value));
};

/**
 * the svg object
 *
 * @param: (number, number) width, height
 * @param: a DOM object or string DOM id. a parent to attach to
 * @param: a function that gets called after setup (callback)
 * @returns: an svg
 */
const SVG = function (...params) {
  // create a new SVG
  const element = svg();

  // setup that can occur immediately
  initSize(element, params);
  Events(element);
  element.getWidth = () => getWidth(element);
  element.getHeight = () => getHeight(element);
  element.setWidth = w => setWidth(element, w);
  element.setHeight = h => setHeight(element, h);
  element.background = color => background(element, color);
  element.size = (...args) => size(element, ...args);
  // element.events = Events(element);
  element.save = function (filename = "image.svg") {
    return File.save(element, filename);
  };
  element.load = function (data, callback) {
    File.load(data, (newSVG, error) => {
      if (newSVG != null) { replaceWithSVG(element, newSVG); }
      if (callback != null) { callback(element, error); }
    });
  };

  // initialize requires a loaded DOM to append
  const initialize = function () {
    initSize(element, params);
    const parent = findElementInParams(...params);
    if (parent != null) { parent.appendChild(element); }
    // maybe dangerous:
    // any function inside the arguments will get fired. with zero parameters.
    // a way of sending a callback to an unknown parameter list
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

  return element;
};

export default SVG;
