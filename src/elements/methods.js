/**
 * SVG in Javascript (c) Robby Kraft
 */

import * as DOM from "../DOM";
import * as ViewBox from "../viewBox";

export const attachClassMethods = function (element) {
  const el = element;
  el.removeChildren = () => DOM.removeChildren(element);
  el.addClass = (...args) => DOM.addClass(element, ...args);
  el.removeClass = (...args) => DOM.removeClass(element, ...args);
  el.setClass = (...args) => DOM.setClass(element, ...args);
  el.setID = (...args) => DOM.setID(element, ...args);
};

export const attachViewBoxMethods = function (element) {
  const el = element;
  ["setViewBox",
    "getViewBox",
    "scaleViewBox",
    "translateViewBox",
    "convertToViewBox"
  ].forEach((func) => { el[func] = (...args) => ViewBox[func](el, ...args); });
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

const attributes = [
  "accent-height",
  "accumulate",
  "additive",
  "alignment-baseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabic-form",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "BSection",
  "baseFrequency",
  "baseline-shift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "CSection",
  "calcMode",
  "cap-height",
  "class",
  "clip",
  // "clipPathUnits",
  // "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  // "cx",
  // "cy",
  "DSection",
  // "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominant-baseline",
  "dur",
  // "dx",
  // "dy",
  "ESection",
  "edgeMode",
  "elevation",
  "enable-background",
  "end",
  "exponent",
  "externalResourcesRequired",
  "FSection",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "filterRes",
  "filterUnits",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "format",
  "from",
  "fr",
  "fx",
  "fy",
  "GSection",
  "g1",
  "g2",
  "glyph-name",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "HSection",
  "hanging",
  // "height",
  "href",
  "hreflang",
  "horiz-adv-x",
  "horiz-origin-x",
  "ISection",
  // "id",
  "ideographic",
  "image-rendering",
  "in",
  "in2",
  "intercept",
  "KSection",
  "k",
  "k1",
  "k2",
  "k3",
  "k4",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "LSection",
  "lang",
  // "lengthAdjust",
  "letter-spacing",
  "lighting-color",
  "limitingConeAngle",
  "local",
  "MSection",
  "marker-end",
  "marker-mid",
  "marker-start",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  // "mask",
  // "maskContentUnits",
  // "maskUnits",
  "mathematical",
  "max",
  "media",
  "method",
  "min",
  "mode",
  "NSection",
  "name",
  "numOctaves",
  "OSection",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overline-position",
  "overline-thickness",
  "PSection",
  "panose-1",
  "paint-order",
  "path",
  // "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "ping",
  "pointer-events",
  // "points",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "RSection",
  // "r",
  "radius",
  "referrerPolicy",
  "refX",
  "refY",
  "rel",
  "rendering-intent",
  "repeatCount",
  "repeatDur",
  // "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  // "rotate",
  // "rx",
  // "ry",
  "SSection",
  "scale",
  "seed",
  "shape-rendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stop-color",
  "stop-opacity",
  "strikethrough-position",
  "strikethrough-thickness",
  "string",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  // "style",
  "surfaceScale",
  // "systemLanguage",
  "TSection",
  "tabindex",
  "tableValues",
  "target",
  "targetX",
  "targetY",
  "text-anchor",
  "text-decoration",
  "text-rendering",
  // "textLength",
  "to",
  // "transform",
  "type",
  "USection",
  "u1",
  "u2",
  "underline-position",
  "underline-thickness",
  "unicode",
  "unicode-bidi",
  "unicode-range",
  "units-per-em",
  "VSection",
  "v-alphabetic",
  "v-hanging",
  "v-ideographic",
  "v-mathematical",
  "values",
  "vector-effect",
  "version",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  "viewBox",
  "viewTarget",
  "visibility",
  "WSection",
  // "width",
  "widths",
  "word-spacing",
  "writing-mode",
  "XSection",
  // "x",
  "x-height",
  // "x1",
  // "x2",
  "xChannelSelector",
  // "xlink:actuate",
  // "xlink:arcrole",
  // "xlink:href",
  // "xlink:role",
  // "xlink:show",
  // "xlink:title",
  // "xlink:type",
  // "xml:base",
  // "xml:lang",
  // "xml:space",
  "YSection",
  // "y",
  // "y1",
  // "y2",
  "yChannelSelector",
  "ZSection",
  // "z",
  "zoomAndPan"
];

const toCamel = function (s) {
  return s.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase()
    .replace("-", "")
    .replace("_", ""));
};

// for the clip-path and mask values. looks for the ID as a "url(#id-name)" string
const findIdURL = function (arg) {
  if (arg == null) { return undefined; }
  if (typeof arg === "string") {
    return arg.slice(0, 3) === "url"
      ? arg
      : `url(#${arg})`;
  }
  const idString = arg.getAttribute("id");
  return `url(#${idString})`;
};

export const attachStyleMethods = function (element) {
  const el = element;
  // attributes.filter(attr => attr !== element.tagName).forEach((key) => {
  attributes.forEach((key) => {
    el[toCamel(key)] = (...args) => {
      element.setAttribute(key, ...args);
      return element;
    };
  });
  // additional appendTo function:
  el.appendTo = function (parent) {
    element.remove();
    if (parent != null) {
      parent.appendChild(element);
    }
    return el;
  };
  el.clipPath = function (parent) {
    const value = findIdURL(parent);
    if (value === undefined) { return; }
    el.setAttribute("clip-path", value);
  };
  el.mask = function (parent) {
    const value = findIdURL(parent);
    if (value === undefined) { return; }
    el.setAttribute("mask", value);
  };
};
