/**
 * SVG (c) Robby Kraft
 */

import attributes from "./svgAttributes";
import {
  removeChildren,
  addClass,
  removeClass,
  setClass,
  setID
} from "./DOM";
import {
  getViewBox,
  setViewBox,
  convertToViewBox,
  translateViewBox,
  scaleViewBox
} from "./viewBox";

// for the clip-path and mask values. looks for the ID as a "url(#id-name)" string
const findIdURL = function (arg) {
  if (arg == null) { return undefined; }
  if (typeof arg === "string") {
    return arg.slice(0, 3) === "url"
      ? arg
      : `url(#${arg})`;
  }
  if (arg.getAttribute != null) {
    const idString = arg.getAttribute("id");
    return `url(#${idString})`;
  }
  return "url(#)";
};

export const attachAppendableMethods = function (element, methods) {
  const el = element;
  Object.keys(methods).forEach((key) => {
    el[key] = function (...args) {
      const g = methods[key](...args);
      element.appendChild(g);
      return g;
    };
  });
};

export const attachClassMethods = function (element) {
  const el = element;
  [removeChildren, addClass, removeClass, setClass, setID].forEach((f) => {
    el.f = (...args) => f(element, ...args);
  });
};

export const attachAppendTo = function (element) {
  Object.defineProperty(element, "appendTo", {
    value: (parent) => {
      if (parent != null) {
        element.remove();
        parent.appendChild(element);
      }
      return element;
    }
  });
};

const toCamel = s => s
  .replace(/([-_][a-z])/ig, $1 => $1
    .toUpperCase()
    .replace("-", "")
    .replace("_", ""));

export const attachFunctionalSetters = function (element) {
  const el = element;
  // attributes.filter(attr => attr !== element.tagName).forEach((key) => {
  attributes.forEach((key) => {
    el[toCamel(key)] = (...args) => {
      el.setAttribute(key, ...args);
      return el;
    };
  });
};

export const attachClipMaskMakers = function (element, primitives) {
  const el = element;
  el.clipPath = (...args) => {
    const c = primitives.clipPath(...args);
    element.appendChild(c);
    return c;
  };
  el.mask = (...args) => {
    const m = primitives.mask(...args);
    element.appendChild(m);
    return m;
  };
};

export const attachClipMaskAttributes = function (element) {
  const el = element;
  el.clipPath = function (parent) {
    const value = findIdURL(parent);
    if (value === undefined) { return el; }
    el.setAttribute("clip-path", value);
    return el;
  };
  el.mask = function (parent) {
    const value = findIdURL(parent);
    if (value === undefined) { return el; }
    el.setAttribute("mask", value);
    return el;
  };
};

// these methods technically could work on all elements, but really
// only make sense for <svg> elements
export const attachViewBoxMethods = function (element) {
  const el = element;
  [setViewBox,
    getViewBox,
    scaleViewBox,
    translateViewBox,
    convertToViewBox
  ].forEach((func) => { el[func.name] = (...args) => func(el, ...args); });
};
