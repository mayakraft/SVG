/**
 * SVG (c) Robby Kraft
 */

import K from "../environment/keys";

export const attachClipMaskMakers = function (element, primitives) {
  if (element.clipPath === undefined) {
    element.clipPath = (...args) => {
      const c = primitives.clipPath(...args);
      element.appendChild(c);
      return c;
    };
  }
  if (element.mask === undefined) {
    element.mask = (...args) => {
      const m = primitives.mask(...args);
      element.appendChild(m);
      return m;
    };
  }
};

// for the clip-path and mask values. looks for the ID as a "url(#id-name)" string
const findIdURL = function (arg) {
  if (arg == null) { return undefined; }
  if (typeof arg === K.string) {
    return arg.slice(0, 3) === "url"
      ? arg
      : `url(#${arg})`;
  }
  if (arg.getAttribute != null) {
    const idString = arg.getAttribute(K.id);
    return `url(#${idString})`;
  }
  return "url(#)";
};

export const attachClipMaskAttributes = function (element) {
  if (element.clipPath === undefined) {
    element.clipPath = function (parent) {
      const value = findIdURL(parent);
      if (value === undefined) { return element; }
      element.setAttribute("clip-path", value);
      return element;
    };
  }
  if (element.mask === undefined) {
    element.mask = function (parent) {
      const value = findIdURL(parent);
      if (value === undefined) { return element; }
      element.setAttribute("mask", value);
      return element;
    };
  }
};