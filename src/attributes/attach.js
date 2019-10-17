/**
 * SVG (c) Robby Kraft
 */

import attributes from "./svgAttributes";
import * as DOM from "./DOM";
import * as ViewBox from "./viewBox";
import * as Transform from "./transform";

export const attachAppendableMethods = function (element, methods) {
  const el = element;
  Object.keys(methods).filter(key => el[key] === undefined).forEach((key) => {
    el[key] = function (...args) {
      const g = methods[key](...args);
      element.appendChild(g);
      return g;
    };
  });
};

export const attachDOMMethods = function (element) {
  const el = element;
  Object.keys(DOM).filter(key => el[key] === undefined).forEach((key) => {
    el[key] = (...args) => DOM[key](element, ...args);
  });
};

export const attachTransformMethods = function (element) {
  const el = element;
  Object.keys(Transform).forEach((key) => {
    el[key] = (...args) => Transform[key](element, ...args);
  });
};

export const attachViewBoxMethods = function (element) {
  const el = element;
  Object.keys(ViewBox).filter(key => el[key] === undefined).forEach((key) => {
    el[key] = (...args) => ViewBox[key](element, ...args);
  });
};

const toCamel = s => s
  .replace(/([-_][a-z])/ig, $1 => $1
    .toUpperCase()
    .replace("-", "")
    .replace("_", ""));

export const attachFunctionalStyleSetters = function (element) {
  const el = element;
  // attributes.filter(attr => attr !== element.tagName).forEach((key) => {
  attributes.filter(key => el[toCamel(key)] === undefined).forEach((key) => {
    el[toCamel(key)] = (...args) => {
      el.setAttribute(key, ...args);
      return el;
    };
  });
};

export const attachClipMaskMakers = function (element, primitives) {
  const el = element;
  if (el.clipPath === undefined) {
    el.clipPath = (...args) => {
      const c = primitives.clipPath(...args);
      element.appendChild(c);
      return c;
    };
  }
  if (el.mask === undefined) {
    el.mask = (...args) => {
      const m = primitives.mask(...args);
      element.appendChild(m);
      return m;
    };
  }
};

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

export const attachClipMaskAttributes = function (element) {
  const el = element;
  if (el.clipPath === undefined) {
    el.clipPath = function (parent) {
      const value = findIdURL(parent);
      if (value === undefined) { return el; }
      el.setAttribute("clip-path", value);
      return el;
    };
  }
  if (el.mask === undefined) {
    el.mask = function (parent) {
      const value = findIdURL(parent);
      if (value === undefined) { return el; }
      el.setAttribute("mask", value);
      return el;
    };
  }
};
