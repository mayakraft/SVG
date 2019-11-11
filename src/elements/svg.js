/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
import * as File from "../environment/file";
import Globalize from "../environment/globalize";
import Events from "../events/index";
import Controls from "../events/controls";
import { rect } from "./primitives";
import { svg, style } from "./root";
import { removeChildren } from "../attributes/DOM";
import {
  getViewBox,
  setViewBox
} from "../attributes/viewBox";

const findWindowBooleanParam = function (...params) {
  const objects = params
    .filter(arg => typeof arg === "object")
    .filter(o => typeof o.window === "boolean");
  return objects.reduce((a, b) => a.window || b.window, false);
};

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
  const viewBox = svgElement.getAttribute("viewBox");
  if (numbers.length >= 2) {
    svgElement.setAttributeNS(null, "width", numbers[0]);
    svgElement.setAttributeNS(null, "height", numbers[1]);
    setViewBox(svgElement, 0, 0, numbers[0], numbers[1]);
  } else if (viewBox == null) {
    // set a viewBox if viewBox doesn't yet exist
    const frame = svgElement.getBoundingClientRect();
    setViewBox(svgElement, 0, 0, frame.width, frame.height);
  } else if (viewBox.split(" ").filter(n => n === "0" || n === 0).length === 4) {
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
    setViewBox(element, 0, 0, ...args);
  } else if (args.length === 4
    && typeof args.map(a => typeof a === "number")
      .reduce((a, b) => a && b, true)
  ) {
    setViewBox(element, ...args);
  } else {
    // todo
  }
};

const getFrame = function (element) {
  let frame = [0, 0, 0, 0];
  if (element.viewBox != null) {
    const viewBox = element.viewBox.baseVal;
    frame = [viewBox.x, viewBox.y, viewBox.width, viewBox.height];
  } else if (typeof element.getBoundingClientRect === "function") {
    const rr = element.getBoundingClientRect();
    frame = [rr.x, rr.y, rr.width, rr.height];
  }
  return frame;
};

const background = function (element, color, setParent = false) {
  if (setParent === true) {
    const parent = element.parentElement;
    if (parent != null) {
      parent.setAttribute("style", `background-color: ${color}`);
    }
  }
  let backRect = Array.from(element.childNodes)
    .filter(child => child.getAttribute("class") === "svg-background-rectangle")
    .shift();
  if (backRect != null) {
    backRect.setAttribute("fill", color);
  } else {
    backRect = rect(...getFrame(element))
      .fill(color)
      .setClass("svg-background-rectangle");
    element.insertBefore(backRect, element.firstChild);
  }
};

const findStyleSheet = function (element) {
  const children = Array.from(element.childNodes);

  const topLevel = children
    .filter(child => child.getAttribute("tagName") === "style")
    .shift();
  if (topLevel) { return topLevel; }

  const defs = children
    .filter(child => child.getAttribute("tagName") === "defs")
    .shift();
  if (defs == null) { return defs; }

  const insideDefs = Array.from(defs.childNodes)
    .filter(child => child.getAttribute("tagName") === "style")
    .shift();
  if (insideDefs != null) { return insideDefs; }

  return undefined;
};

const stylesheet = function (element, textContent) {
  let styleSection = findStyleSheet(element);
  if (styleSection == null) {
    styleSection = style(textContent);
    element.insertBefore(styleSection, element.firstChild);
  } else {
    styleSection.setTextContent(textContent);
  }
  return styleSection;
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
  Events(element);
  element.controls = (...args) => Controls(element, ...args);
  element.getWidth = () => getWidth(element);
  element.getHeight = () => getHeight(element);
  element.setWidth = (...args) => setWidth(element, ...args);
  element.setHeight = (...args) => setHeight(element, ...args);
  element.background = (...args) => background(element, ...args);
  element.size = (...args) => size(element, ...args);
  element.save = function (filename = "image.svg") {
    return File.save(element, filename);
  };
  element.load = function (data, callback) {
    File.load(data, (newSVG, error) => {
      if (newSVG != null) { replaceWithSVG(element, newSVG); }
      if (callback != null) { callback(element, error); }
    });
  };//
  //
  /////////////////////////////////////
  element.stylesheet = textContent => stylesheet(element, textContent); // this needs to change////////s
  //////////// something ehre
  ///////////asifoaie fas
  //////////// / //////// / / ///////////// // /

  // initialize requires a loaded DOM to append
  const initialize = function () {
    const parent = findElementInParams(...params);
    if (parent != null) { parent.appendChild(element); }
    initSize(element, params);
    // accessibility modes
    if (findWindowBooleanParam(...params)) { // look for options { window: true }
      Globalize(element);
    }
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
