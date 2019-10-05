
import attributes from "./svgAttributes";
import * as File from "../environment/file";
import {
  removeChildren,
  getWidth,
  getHeight,
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
  methods.forEach((func) => {
    el[func.name] = function (...args) {
      const g = func(...args);
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

const attachAppendTo = function (element) {
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

export const prepareFunctionalSetters = function (element) {
  const el = element;
  // attributes.filter(attr => attr !== element.tagName).forEach((key) => {
  attributes.forEach((key) => {
    el[toCamel(key)] = (...args) => {
      el.setAttribute(key, ...args);
      return el;
    };
  });
};

const attachClipMaskMakers = function (element, primitives) {
  const el = element;
  const [clip, mask] = ["clipPath", "mask"].map(key => primitives
    .filter(p => p.name === key).shift());
  el.clipPath = (...args) => {
    const c = clip(...args);
    element.appendChild(c);
    return c;
  };
  el.mask = (...args) => {
    const m = mask(...args);
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

export const preparePrimitive = function (element, primitives) {
  attachClassMethods(element);
  prepareFunctionalSetters(element);
  attachAppendTo(element);
  attachClipMaskAttributes(element);
};

export const prepareSVG = function (element, primitives) {
  attachClassMethods(element);
  attachAppendableMethods(element, primitives);
  // prepareFunctionalSetters(element);
  attachClipMaskMakers(element, primitives);
};

export const prepareGroup = function (element, primitives) {
  attachClassMethods(element);
  attachAppendableMethods(element, primitives);
  prepareFunctionalSetters(element);
  attachClipMaskAttributes(element);
};

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateUUID = function (prefix) {
  let suffix = "";
  for (let i = 0; i < 10; i += 1) {
    suffix += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return `${prefix}${suffix}`;
};

export const prepareClipPath = function (element, primitives) {
  if (!element.id) { element.setAttribute("id", generateUUID("clip")); }
  attachAppendableMethods(element, primitives);
  prepareFunctionalSetters(element);
  attachClipMaskAttributes(element);
};

export const prepareMask = function (element, primitives) {
  if (!element.id) { element.setAttribute("id", generateUUID("mask")); }
  attachAppendableMethods(element, primitives);
  prepareFunctionalSetters(element);
  attachClipMaskAttributes(element);
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


export const attachSVGMethods = function (el) {
  const element = el;
  Object.defineProperty(element, "w", {
    get: () => getWidth(element),
    set: w => element.setAttributeNS(null, "width", w),
  });
  Object.defineProperty(element, "h", {
    get: () => getHeight(element),
    set: h => element.setAttributeNS(null, "height", h),
  });
  element.getWidth = () => getWidth(element);
  element.getHeight = () => getHeight(element);
  element.setWidth = w => element.setAttributeNS(null, "width", w);
  element.setHeight = h => element.setAttributeNS(null, "height", h);
  element.save = function (filename = "image.svg") {
    return File.save(element, filename);
  };
  element.background = (color) => {
    // const parent = element.parentElement;
    // if (parent != null) {
    //   parent.setAttribute("style", `background-color: ${color}`);
    // }
    // let backRect = element.querySelector("#svg-background-rectangle");
    // if (backRect != null) {
    //   backRect.setAttribute("fill", color);
    // } else {
    //   const viewBox = element.viewBox.baseVal;
    //   const rect = [viewBox.x, viewBox.y, viewBox.width - viewBox.x, viewBox.height - viewBox.y];
    //   backRect = rect(rect[0], rect[1], rect[2], rect[3])
    //     .fill(color);
    //   backRect.setAttribute("id", "background-rectangle");
    //   element.prepend(backRect);
    // }
  };
  element.size = (...args) => {
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
  element.setViewBox = element.size;
  // element.load = function (data, callback) {
  //   todo:
  //   make this reach one level inside the loaded <svg>, get its children,
  //   bring them over to the same svg, (having cleared it), and same with
  //   the attributes for <svg>
  //   DOM.load(data, (newSVG, error) => {
  //     if (newSVG != null) {
  //       const parent = element.parentNode;
  //       newSVG.events = element.events;
  //       setupSVG(newSVG);
  //       if (newSVG.events == null) {
  //         newSVG.events = Events(newSVG);
  //       } else {
  //         newSVG.events.setup(newSVG);
  //       }
  //       attachSVGMethods(newSVG);
  //       if (parent != null) { parent.insertBefore(newSVG, element); }
  //       element.remove();
  //       element = newSVG;
  //     }
  //     if (parent != null) { parent.appendChild(element); }
  //     if (callback != null) { callback(element, error); }
  //   });
  // };
};
