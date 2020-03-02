/**
 * SVG (c) Robby Kraft
 */

import attributes from "../attributes/svgAttributes";
import * as DOM from "./DOM";
import * as ViewBox from "./viewBox";
import * as Transform from "./transform";
import * as Path from "../elements/path";
import { setArrowPoints } from "./geometry";

export const attachStyleMethods = function (element) {
  element.appendTo = arg => DOM.appendTo(element, arg);
};

export const attachAppendableMethods = function (element, methods) {
  Object.keys(methods)
    .filter(key => element[key] === undefined)
    .forEach((key) => {
      element[key] = function (...args) {
        const g = methods[key](...args);
        element.appendChild(g);
        return g;
      };
    });
};

export const attachArrowMethods = function (element) {
  element.head = (options) => {
    if (typeof options === "object") {
      Object.assign(element.options.head, options);
      if (options.visible === undefined) {
        element.options.head.visible = true;
      }
    } else if (typeof options === "boolean") {
      element.options.head.visible = options;
    } else if (options == null) {
      element.options.head.visible = true;
    }
    setArrowPoints(element);
    return element;
  };
  element.tail = (options) => {
    if (typeof options === "object") {
      Object.assign(element.options.tail, options);
      if (options.visible === undefined) {
        element.options.tail.visible = true;
      }
      element.options.tail.visible = true;
    } else if (typeof options === "boolean") {
      element.options.tail.visible = options;
    } else if (options == null) {
      element.options.tail.visible = true;
    }
    setArrowPoints(element);
    return element;
  };
  element.curve = (amount) => {
    element.options.curve = amount;
    setArrowPoints(element);
    return element;
  };
  element.pinch = (amount) => {
    element.options.pinch = amount;
    setArrowPoints(element);
    return element;
  };
};

export const attachPathMethods = function (element) {
  Object.keys(Path).filter(key => element[key] === undefined).forEach((key) => {
    element[key] = (...args) => Path[key](element, ...args);
  });
};

export const attachDOMMethods = function (element) {
  Object.keys(DOM).filter(key => element[key] === undefined).forEach((key) => {
    element[key] = (...args) => DOM[key](element, ...args);
  });
};

export const attachTransformMethods = function (element) {
  Object.keys(Transform).filter(key => element[key] === undefined).forEach((key) => {
    element[key] = (...args) => Transform[key](element, ...args);
  });
};

export const attachViewBoxMethods = function (element) {
  Object.keys(ViewBox).filter(key => element[key] === undefined).forEach((key) => {
    element[key] = (...args) => ViewBox[key](element, ...args);
  });
};

const toCamel = s => s
  .replace(/([-_][a-z])/ig, $1 => $1
    .toUpperCase()
    .replace("-", "")
    .replace("_", ""));

export const attachFunctionalStyleSetters = function (element) {
  // attributes.filter(attr => attr !== element.tagName).forEach((key) => {
  attributes.filter(key => element[toCamel(key)] === undefined)
    .forEach((key) => {
      element[toCamel(key)] = (...args) => {
        element.setAttribute(key, ...args);
        return element;
      };
    });
};

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
