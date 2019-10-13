/* SVG (c) Robby Kraft, MIT License */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SVG = factory());
}(this, function () { 'use strict';

  var namespace = "http://www.w3.org/2000/svg";

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
  var isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
  var isWebWorker = (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";

  var htmlString = "<!DOCTYPE html><title> </title>";
  var win = {};

  if (isNode) {
    var _require = require("xmldom"),
        DOMParser$1 = _require.DOMParser,
        XMLSerializer$1 = _require.XMLSerializer;

    win.DOMParser = DOMParser$1;
    win.XMLSerializer = XMLSerializer$1;
    win.document = new DOMParser$1().parseFromString(htmlString, "text/html");
  } else if (isBrowser) {
    win.DOMParser = window.DOMParser;
    win.XMLSerializer = window.XMLSerializer;
    win.document = window.document;
  }

  var attributes = ["accumulate", "additive", "alignment-baseline", "allowReorder", "amplitude", "attributeName", "autoReverse", "azimuth", "BSection", "baseFrequency", "baseline-shift", "baseProfile", "bbox", "begin", "bias", "by", "CSection", "calcMode", "cap-height", "class", "clip", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "contentScriptType", "contentStyleType", "cursor", "DSection", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominant-baseline", "dur", "ESection", "edgeMode", "elevation", "enable-background", "end", "exponent", "externalResourcesRequired", "FSection", "fill", "fill-opacity", "fill-rule", "filter", "filterRes", "filterUnits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "format", "from", "fr", "fx", "fy", "GSection", "g1", "g2", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "glyphRef", "gradientTransform", "gradientUnits", "HSection", "hanging", "href", "hreflang", "horiz-adv-x", "horiz-origin-x", "ISection", "ideographic", "image-rendering", "in", "in2", "intercept", "KSection", "k", "k1", "k2", "k3", "k4", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "LSection", "lang", "letter-spacing", "lighting-color", "limitingConeAngle", "local", "MSection", "marker-end", "marker-mid", "marker-start", "markerHeight", "markerUnits", "markerWidth", "mathematical", "max", "media", "method", "min", "mode", "NSection", "name", "numOctaves", "OSection", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overline-position", "overline-thickness", "PSection", "panose-1", "paint-order", "path", "patternContentUnits", "patternTransform", "patternUnits", "ping", "pointer-events", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "RSection", "radius", "referrerPolicy", "refX", "refY", "rel", "rendering-intent", "repeatCount", "repeatDur", "requiredFeatures", "restart", "result", "SSection", "scale", "seed", "shape-rendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "string", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "surfaceScale", "TSection", "tabindex", "tableValues", "target", "targetX", "targetY", "text-anchor", "text-decoration", "text-rendering", "to", "transform-origin", "type", "USection", "u1", "u2", "underline-position", "underline-thickness", "unicode", "unicode-bidi", "unicode-range", "units-per-em", "VSection", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "values", "vector-effect", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "viewBox", "viewTarget", "visibility", "WSection", "widths", "word-spacing", "writing-mode", "XSection", "x-height", "xChannelSelector", "YSection", "yChannelSelector", "ZSection", "zoomAndPan"];

  var removeChildren = function removeChildren(parent) {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  };
  var appendTo = function appendTo(element, parent) {
    if (parent != null) {
      element.remove();
      parent.appendChild(element);
    }

    return element;
  };

  var toKebab = function toKebab(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2").toLowerCase();
  };

  var setAttributes = function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (key) {
      element.setAttribute(toKebab(key), attributes[key]);
    });
    return element;
  };

  var getClassList = function getClassList(xmlNode) {
    var currentClass = xmlNode.getAttribute("class");
    return currentClass == null ? [] : currentClass.split(" ").filter(function (s) {
      return s !== "";
    });
  };

  var addClass = function addClass(xmlNode, newClass) {
    if (xmlNode == null) {
      return xmlNode;
    }

    var classes = getClassList(xmlNode).filter(function (c) {
      return c !== newClass;
    });
    classes.push(newClass);
    xmlNode.setAttributeNS(null, "class", classes.join(" "));
    return xmlNode;
  };
  var removeClass = function removeClass(xmlNode, removedClass) {
    if (xmlNode == null) {
      return xmlNode;
    }

    var classes = getClassList(xmlNode).filter(function (c) {
      return c !== removedClass;
    });
    xmlNode.setAttributeNS(null, "class", classes.join(" "));
    return xmlNode;
  };
  var setClass = function setClass(xmlNode, className) {
    xmlNode.setAttributeNS(null, "class", className);
    return xmlNode;
  };
  var setID = function setID(xmlNode, idName) {
    xmlNode.setAttributeNS(null, "id", idName);
    return xmlNode;
  };

  var DOM = /*#__PURE__*/Object.freeze({
    __proto__: null,
    removeChildren: removeChildren,
    appendTo: appendTo,
    setAttributes: setAttributes,
    addClass: addClass,
    removeClass: removeClass,
    setClass: setClass,
    setID: setID
  });

  var getViewBox = function getViewBox(svg) {
    var vb = svg.getAttribute("viewBox");
    return vb == null ? undefined : vb.split(" ").map(function (n) {
      return parseFloat(n);
    });
  };
  var setViewBox = function setViewBox(svg, x, y, width, height) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var scale = 1.0;
    var d = width / scale - width;
    var X = x - d - padding;
    var Y = y - d - padding;
    var W = width + d * 2 + padding * 2;
    var H = height + d * 2 + padding * 2;
    var viewBoxString = [X, Y, W, H].join(" ");
    svg.setAttributeNS(null, "viewBox", viewBoxString);
  };

  var setDefaultViewBox = function setDefaultViewBox(svg) {
    var size = svg.getBoundingClientRect();
    var width = size.width === 0 ? 640 : size.width;
    var height = size.height === 0 ? 480 : size.height;
    setViewBox(svg, 0, 0, width, height);
  };

  var convertToViewBox = function convertToViewBox(svg, x, y) {
    var pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    var svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    var array = [svgPoint.x, svgPoint.y];
    array.x = svgPoint.x;
    array.y = svgPoint.y;
    return array;
  };
  var translateViewBox = function translateViewBox(svg, dx, dy) {
    var viewBox = getViewBox(svg);

    if (viewBox == null) {
      setDefaultViewBox(svg);
    }

    viewBox[0] += dx;
    viewBox[1] += dy;
    svg.setAttributeNS(null, "viewBox", viewBox.join(" "));
  };
  var scaleViewBox = function scaleViewBox(svg, scale) {
    var origin_x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var origin_y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (Math.abs(scale) < 1e-8) {
      scale = 0.01;
    }

    var matrix = svg.createSVGMatrix().translate(origin_x, origin_y).scale(1 / scale).translate(-origin_x, -origin_y);
    var viewBox = getViewBox(svg);

    if (viewBox == null) {
      setDefaultViewBox(svg);
    }

    var top_left = svg.createSVGPoint();
    var bot_right = svg.createSVGPoint();

    var _viewBox = _slicedToArray(viewBox, 2);

    top_left.x = _viewBox[0];
    top_left.y = _viewBox[1];
    bot_right.x = viewBox[0] + viewBox[2];
    bot_right.y = viewBox[1] + viewBox[3];
    var new_top_left = top_left.matrixTransform(matrix);
    var new_bot_right = bot_right.matrixTransform(matrix);
    setViewBox(svg, new_top_left.x, new_top_left.y, new_bot_right.x - new_top_left.x, new_bot_right.y - new_top_left.y);
  };

  var ViewBox = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getViewBox: getViewBox,
    setViewBox: setViewBox,
    convertToViewBox: convertToViewBox,
    translateViewBox: translateViewBox,
    scaleViewBox: scaleViewBox
  });

  var setTransform = function setTransform(element, transform) {
    if (_typeof(transform) === "object") {
      element.setAttribute("transform", transform.join(" "));
    } else if (typeof transform === "string") {
      element.setAttribute("transform", transform);
    }
  };

  var getTransform = function getTransform(element) {
    var trans = element.getAttribute("transform");
    return trans == null ? undefined : trans.split(" ");
  };

  var translate = function translate(element, tx, ty) {
    var trans = getTransform(element) || [];
    trans.push("translate(".concat(tx, ", ").concat(ty, ")"));
    setTransform(element, trans);
    return element;
  };
  var rotate = function rotate(element, angle) {
    var trans = getTransform(element) || [];
    trans.push("rotate(".concat(angle, ")"));
    setTransform(element, trans);
    return element;
  };
  var scale = function scale(element, sx, sy) {
    var trans = getTransform(element) || [];
    trans.push("scale(".concat(sx, ", ").concat(sy, ")"));
    setTransform(element, trans);
    return element;
  };

  var Transform = /*#__PURE__*/Object.freeze({
    __proto__: null,
    translate: translate,
    rotate: rotate,
    scale: scale
  });

  var attachAppendableMethods = function attachAppendableMethods(element, methods) {
    var el = element;
    Object.keys(methods).filter(function (key) {
      return el[key] === undefined;
    }).forEach(function (key) {
      el[key] = function () {
        var g = methods[key].apply(methods, arguments);
        element.appendChild(g);
        return g;
      };
    });
  };
  var attachDOMMethods = function attachDOMMethods(element) {
    var el = element;
    Object.keys(DOM).filter(function (key) {
      return el[key] === undefined;
    }).forEach(function (key) {
      el[key] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return DOM[key].apply(DOM, [element].concat(args));
      };
    });
  };
  var attachTransformMethods = function attachTransformMethods(element) {
    var el = element;
    Object.keys(Transform).forEach(function (key) {
      el[key] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return Transform[key].apply(Transform, [element].concat(args));
      };
    });
  };
  var attachViewBoxMethods = function attachViewBoxMethods(element) {
    var el = element;
    Object.keys(ViewBox).filter(function (key) {
      return el[key] === undefined;
    }).forEach(function (key) {
      el[key] = function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return ViewBox[key].apply(ViewBox, [element].concat(args));
      };
    });
  };

  var toCamel = function toCamel(s) {
    return s.replace(/([-_][a-z])/ig, function ($1) {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  };

  var attachFunctionalSetters = function attachFunctionalSetters(element) {
    var el = element;
    attributes.filter(function (key) {
      return el[toCamel(key)] === undefined;
    }).forEach(function (key) {
      el[toCamel(key)] = function () {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        el.setAttribute.apply(el, [key].concat(args));
        return el;
      };
    });
  };
  var attachClipMaskMakers = function attachClipMaskMakers(element, primitives) {
    var el = element;

    if (el.clipPath === undefined) {
      el.clipPath = function () {
        var c = primitives.clipPath.apply(primitives, arguments);
        element.appendChild(c);
        return c;
      };
    }

    if (el.mask === undefined) {
      el.mask = function () {
        var m = primitives.mask.apply(primitives, arguments);
        element.appendChild(m);
        return m;
      };
    }
  };

  var findIdURL = function findIdURL(arg) {
    if (arg == null) {
      return undefined;
    }

    if (typeof arg === "string") {
      return arg.slice(0, 3) === "url" ? arg : "url(#".concat(arg, ")");
    }

    if (arg.getAttribute != null) {
      var idString = arg.getAttribute("id");
      return "url(#".concat(idString, ")");
    }

    return "url(#)";
  };

  var attachClipMaskAttributes = function attachClipMaskAttributes(element) {
    var el = element;

    if (el.clipPath === undefined) {
      el.clipPath = function (parent) {
        var value = findIdURL(parent);

        if (value === undefined) {
          return el;
        }

        el.setAttribute("clip-path", value);
        return el;
      };
    }

    if (el.mask === undefined) {
      el.mask = function (parent) {
        var value = findIdURL(parent);

        if (value === undefined) {
          return el;
        }

        el.setAttribute("mask", value);
        return el;
      };
    }
  };

  var preparePrimitive = function preparePrimitive(element) {
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachFunctionalSetters(element);
    attachClipMaskAttributes(element);
  };

  var prepareText = function prepareText(element) {
    attachDOMMethods(element);
    attachFunctionalSetters(element);
    attachClipMaskAttributes(element);
  };

  var prepareSVG = function prepareSVG(element, primitives) {
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachAppendableMethods(element, primitives);
    attachViewBoxMethods(element);
    attachClipMaskMakers(element, primitives);
  };

  var prepareGroup = function prepareGroup(element, primitives) {
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachAppendableMethods(element, primitives);
    attachFunctionalSetters(element);
    attachClipMaskAttributes(element);
  };

  var prepareMaskClipPath = function prepareMaskClipPath(element, primitives) {
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachAppendableMethods(element, primitives);
    attachFunctionalSetters(element);
    attachClipMaskAttributes(element);
  };

  var prepare = function prepare(type, element, primitiveList) {
    switch (type) {
      case "svg":
        prepareSVG(element, primitiveList);
        break;

      case "primitive":
        preparePrimitive(element);
        break;

      case "defs":
      case "group":
        prepareGroup(element, primitiveList);
        break;

      case "text":
        prepareText(element);
        break;

      case "clipPath":
      case "mask":
        prepareMaskClipPath(element, primitiveList);
        break;

      default:
        console.warn("prepare missing valid type (svg, group..");
        break;
    }
  };

  var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var generateUUID = function generateUUID() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    return Array.from(Array(count)).map(function () {
      return Math.floor(Math.random() * abc.length);
    }).map(function (i) {
      return abc[i];
    }).reduce(function (a, b) {
      return "".concat(a).concat(b);
    }, prefix);
  };

  var constructorsSVG = {};
  var constructorsGroup = {};

  var svg = function svg() {
    var svgImage = win.document.createElementNS(namespace, "svg");
    svgImage.setAttribute("version", "1.1");
    svgImage.setAttribute("xmlns", namespace);
    prepare("svg", svgImage, constructorsSVG);
    return svgImage;
  };

  var group = function group() {
    var g = win.document.createElementNS(namespace, "g");
    prepare("group", g, constructorsGroup);
    return g;
  };

  var defs = function defs() {
    var d = win.document.createElementNS(namespace, "defs");
    prepare("defs", d, constructorsGroup);
    return d;
  };

  var style = function style() {
    var s = win.document.createElementNS(namespace, "style");
    s.setAttribute("type", "text/css");
    return s;
  };

  var clipPath = function clipPath() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : generateUUID(8, "clip-");
    var clip = win.document.createElementNS(namespace, "clipPath");
    clip.setAttribute("id", id);
    prepare("clipPath", clip, constructorsGroup);
    return clip;
  };

  var mask = function mask() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : generateUUID(8, "mask-");
    var msk = win.document.createElementNS(namespace, "mask");
    msk.setAttribute("id", id);
    prepare("mask", msk, constructorsGroup);
    return msk;
  };

  var setConstructors = function setConstructors(elements) {
    Object.keys(elements).filter(function (key) {
      return key !== "svg";
    }).forEach(function (key) {
      constructorsSVG[key] = elements[key];
    });
    Object.keys(elements).filter(function (key) {
      return key !== "svg";
    }).filter(function (key) {
      return key !== "defs";
    }).filter(function (key) {
      return key !== "style";
    }).filter(function (key) {
      return key !== "clipPath";
    }).filter(function (key) {
      return key !== "mask";
    }).forEach(function (key) {
      constructorsGroup[key] = elements[key];
    });
  };

  var root = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setConstructors: setConstructors,
    svg: svg,
    group: group,
    defs: defs,
    clipPath: clipPath,
    mask: mask,
    style: style
  });

  var is_iterable = function is_iterable(obj) {
    return obj != null && typeof obj[Symbol.iterator] === "function";
  };

  var flatten_input = function flatten_input() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    switch (args.length) {
      case undefined:
      case 0:
        return args;

      case 1:
        return is_iterable(args[0]) && typeof args[0] !== "string" ? flatten_input.apply(void 0, _toConsumableArray(args[0])) : [args[0]];

      default:
        return Array.from(args).map(function (a) {
          return is_iterable(a) ? _toConsumableArray(flatten_input(a)) : a;
        }).reduce(function (a, b) {
          return a.concat(b);
        }, []);
    }
  };

  var setPoints = function setPoints(shape) {
    for (var _len2 = arguments.length, pointsArray = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      pointsArray[_key2 - 1] = arguments[_key2];
    }

    var flat = flatten_input.apply(void 0, pointsArray);
    var pointsString = "";

    if (typeof flat[0] === "number") {
      pointsString = Array.from(Array(Math.floor(flat.length / 2))).reduce(function (a, b, i) {
        return "".concat(a).concat(flat[i * 2], ",").concat(flat[i * 2 + 1], " ");
      }, "");
    }

    if (_typeof(flat[0]) === "object") {
      if (typeof flat[0].x === "number") {
        pointsString = flat.reduce(function (prev, curr) {
          return "".concat(prev).concat(curr.x, ",").concat(curr.y, " ");
        }, "");
      }

      if (typeof flat[0][0] === "number") {
        pointsString = flat.reduce(function (prev, curr) {
          return "".concat(prev).concat(curr[0], ",").concat(curr[1], " ");
        }, "");
      }
    }

    shape.setAttributeNS(null, "points", pointsString);
  };
  var setArc = function setArc(shape, x, y, radius, startAngle, endAngle) {
    var includeCenter = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var start = [x + Math.cos(startAngle) * radius, y + Math.sin(startAngle) * radius];
    var vecStart = [Math.cos(startAngle) * radius, Math.sin(startAngle) * radius];
    var vecEnd = [Math.cos(endAngle) * radius, Math.sin(endAngle) * radius];
    var arcVec = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
    var py = vecStart[0] * vecEnd[1] - vecStart[1] * vecEnd[0];
    var px = vecStart[0] * vecEnd[0] + vecStart[1] * vecEnd[1];
    var arcdir = Math.atan2(py, px) > 0 ? 0 : 1;
    var d = includeCenter ? "M ".concat(x, ",").concat(y, " l ").concat(vecStart[0], ",").concat(vecStart[1], " ") : "M ".concat(start[0], ",").concat(start[1], " ");
    d += ["a ", radius, radius, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");

    if (includeCenter) {
      d += " Z";
    }

    shape.setAttributeNS(null, "d", d);
  };
  var setEllipticalArc = function setEllipticalArc(shape, x, y, rX, rY, startAngle, endAngle) {
    var includeCenter = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    var start = [x + Math.cos(startAngle) * rX, y + Math.sin(startAngle) * rY];
    var vecStart = [Math.cos(startAngle) * rX, Math.sin(startAngle) * rY];
    var vecEnd = [Math.cos(endAngle) * rX, Math.sin(endAngle) * rY];
    var arcVec = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
    var py = vecStart[0] * vecEnd[1] - vecStart[1] * vecEnd[0];
    var px = vecStart[0] * vecEnd[0] + vecStart[1] * vecEnd[1];
    var arcdir = Math.atan2(py, px) > 0 ? 0 : 1;
    var d = includeCenter ? "M ".concat(x, ",").concat(y, " l ").concat(vecStart[0], ",").concat(vecStart[1], " ") : "M ".concat(start[0], ",").concat(start[1], " ");
    d += ["a ", rX, rY, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");

    if (includeCenter) {
      d += " Z";
    }

    shape.setAttributeNS(null, "d", d);
  };
  var setBezier = function setBezier(shape, fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
    var pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]].map(function (p) {
      return p.join(",");
    });
    var d = "M ".concat(pts[0], " C ").concat(pts[1], " ").concat(pts[2], " ").concat(pts[3]);
    shape.setAttributeNS(null, "d", d);
  };

  var geometryMods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setPoints: setPoints,
    setArc: setArc,
    setEllipticalArc: setEllipticalArc,
    setBezier: setBezier
  });

  var line = function line(x1, y1, x2, y2) {
    var shape = win.document.createElementNS(namespace, "line");

    if (x1) {
      shape.setAttributeNS(null, "x1", x1);
    }

    if (y1) {
      shape.setAttributeNS(null, "y1", y1);
    }

    if (x2) {
      shape.setAttributeNS(null, "x2", x2);
    }

    if (y2) {
      shape.setAttributeNS(null, "y2", y2);
    }

    prepare("primitive", shape);
    return shape;
  };
  var circle = function circle(x, y, radius) {
    var shape = win.document.createElementNS(namespace, "circle");

    if (x) {
      shape.setAttributeNS(null, "cx", x);
    }

    if (y) {
      shape.setAttributeNS(null, "cy", y);
    }

    if (radius) {
      shape.setAttributeNS(null, "r", radius);
    }

    prepare("primitive", shape);
    return shape;
  };
  var ellipse = function ellipse(x, y, rx, ry) {
    var shape = win.document.createElementNS(namespace, "ellipse");

    if (x) {
      shape.setAttributeNS(null, "cx", x);
    }

    if (y) {
      shape.setAttributeNS(null, "cy", y);
    }

    if (rx) {
      shape.setAttributeNS(null, "rx", rx);
    }

    if (ry) {
      shape.setAttributeNS(null, "ry", ry);
    }

    prepare("primitive", shape);
    return shape;
  };
  var rect = function rect(x, y, width, height) {
    var shape = win.document.createElementNS(namespace, "rect");

    if (x) {
      shape.setAttributeNS(null, "x", x);
    }

    if (y) {
      shape.setAttributeNS(null, "y", y);
    }

    if (width) {
      shape.setAttributeNS(null, "width", width);
    }

    if (height) {
      shape.setAttributeNS(null, "height", height);
    }

    prepare("primitive", shape);
    return shape;
  };
  var polygon = function polygon() {
    var shape = win.document.createElementNS(namespace, "polygon");

    for (var _len = arguments.length, pointsArray = new Array(_len), _key = 0; _key < _len; _key++) {
      pointsArray[_key] = arguments[_key];
    }

    setPoints.apply(void 0, [shape].concat(pointsArray));
    prepare("primitive", shape);

    shape.setPoints = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return setPoints.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var polyline = function polyline() {
    var shape = win.document.createElementNS(namespace, "polyline");

    for (var _len3 = arguments.length, pointsArray = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      pointsArray[_key3] = arguments[_key3];
    }

    setPoints.apply(void 0, [shape].concat(pointsArray));
    prepare("primitive", shape);

    shape.setPoints = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return setPoints.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var bezier = function bezier(fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
    var pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]].map(function (p) {
      return p.join(",");
    });
    var d = "M ".concat(pts[0], " C ").concat(pts[1], " ").concat(pts[2], " ").concat(pts[3]);
    var shape = win.document.createElementNS(namespace, "path");
    shape.setAttributeNS(null, "d", d);
    prepare("primitive", shape);

    shape.setBezier = function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return setBezier.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var text = function text(textString, x, y) {
    var shape = win.document.createElementNS(namespace, "text");
    shape.innerHTML = textString;
    shape.setAttributeNS(null, "x", x);
    shape.setAttributeNS(null, "y", y);
    prepare("text", shape);
    return shape;
  };
  var arc = function arc(x, y, radius, angleA, angleB) {
    var shape = win.document.createElementNS(namespace, "path");
    setArc(shape, x, y, radius, angleA, angleB, false);
    prepare("primitive", shape);

    shape.setArc = function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return setArc.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var wedge = function wedge(x, y, radius, angleA, angleB) {
    var shape = win.document.createElementNS(namespace, "path");
    setArc(shape, x, y, radius, angleA, angleB, true);
    prepare("primitive", shape);

    shape.setArc = function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return setArc.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var arcEllipse = function arcEllipse(x, y, rx, ry, angleA, angleB) {
    var shape = win.document.createElementNS(namespace, "path");
    setEllipticalArc(shape, x, y, rx, ry, angleA, angleB, false);
    prepare("primitive", shape);

    shape.setArc = function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return setEllipticalArc.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var wedgeEllipse = function wedgeEllipse(x, y, rx, ry, angleA, angleB) {
    var shape = win.document.createElementNS(namespace, "path");
    setEllipticalArc(shape, x, y, rx, ry, angleA, angleB, true);
    prepare("primitive", shape);

    shape.setArc = function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return setEllipticalArc.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var parabola = function parabola(x, y, width, height) {
    var COUNT = 128;
    var iter = Array.from(Array(COUNT + 1)).map(function (_, i) {
      return (i - COUNT) / COUNT * 2 + 1;
    });
    var ptsX = iter.map(function (i) {
      return x + (i + 1) * width * 0.5;
    });
    var ptsY = iter.map(function (i) {
      return y + Math.pow(i, 2) * height;
    });
    var points = iter.map(function (_, i) {
      return [ptsX[i], ptsY[i]];
    });
    return polyline(points);
  };
  var regularPolygon = function regularPolygon(cX, cY, radius, sides) {
    var halfwedge = 2 * Math.PI / sides * 0.5;
    var r = Math.cos(halfwedge) * radius;
    var points = Array.from(Array(sides)).map(function (el, i) {
      var a = -2 * Math.PI * i / sides + halfwedge;
      var x = cX + r * Math.sin(a);
      var y = cY + r * Math.cos(a);
      return [x, y];
    });
    return polygon(points);
  };

  var primitives = /*#__PURE__*/Object.freeze({
    __proto__: null,
    line: line,
    circle: circle,
    ellipse: ellipse,
    rect: rect,
    polygon: polygon,
    polyline: polyline,
    bezier: bezier,
    text: text,
    arc: arc,
    wedge: wedge,
    arcEllipse: arcEllipse,
    wedgeEllipse: wedgeEllipse,
    parabola: parabola,
    regularPolygon: regularPolygon
  });

  var straightArrow = function straightArrow(startPoint, endPoint, options) {
    var p = {
      color: "#000",
      strokeWidth: 0.5,
      strokeStyle: "",
      fillStyle: "",
      highlight: undefined,
      highlightStrokeStyle: "",
      highlightFillStyle: "",
      width: 0.5,
      length: 2,
      padding: 0.0,
      start: false,
      end: true
    };

    if (_typeof(options) === "object" && options !== null) {
      Object.assign(p, options);
    }

    var arrowFill = ["stroke:none", "fill:".concat(p.color), p.fillStyle, "pointer-events:none"].filter(function (a) {
      return a !== "";
    }).join(";");
    var arrowStroke = ["fill:none", "stroke:".concat(p.color), "stroke-width:".concat(p.strokeWidth), p.strokeStyle].filter(function (a) {
      return a !== "";
    }).join(";");
    var thinStroke = Math.floor(p.strokeWidth * 3) / 10;
    var thinSpace = Math.floor(p.strokeWidth * 6) / 10;
    var highlightStroke = ["fill:none", "stroke:".concat(p.highlight), "stroke-width:".concat(p.strokeWidth * 0.5), "stroke-dasharray:".concat(thinStroke, " ").concat(thinSpace), "stroke-linecap:round", p.strokeStyle].filter(function (a) {
      return a !== "";
    }).join(";");
    var highlightFill = ["stroke:none", "fill:".concat(p.highlight), p.fillStyle, "pointer-events:none"].filter(function (a) {
      return a !== "";
    }).join(";");
    var start = startPoint;
    var end = endPoint;
    var vec = [end[0] - start[0], end[1] - start[1]];
    var arrowLength = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
    var arrowVector = [vec[0] / arrowLength, vec[1] / arrowLength];
    var arrow90 = [arrowVector[1], -arrowVector[0]];
    start = [startPoint[0] + arrowVector[0] * (p.start ? 1 : 0) * p.padding, startPoint[1] + arrowVector[1] * (p.start ? 1 : 0) * p.padding];
    end = [endPoint[0] - arrowVector[0] * (p.end ? 1 : 0) * p.padding, endPoint[1] - arrowVector[1] * (p.end ? 1 : 0) * p.padding];
    var endHead = [[end[0] + arrow90[0] * p.width, end[1] + arrow90[1] * p.width], [end[0] - arrow90[0] * p.width, end[1] - arrow90[1] * p.width], [end[0] + arrowVector[0] * p.length, end[1] + arrowVector[1] * p.length]];
    var startHead = [[start[0] - arrow90[0] * p.width, start[1] - arrow90[1] * p.width], [start[0] + arrow90[0] * p.width, start[1] + arrow90[1] * p.width], [start[0] - arrowVector[0] * p.length, start[1] - arrowVector[1] * p.length]];
    var arrow = win.document.createElementNS(namespace, "g");
    var l = line(start[0], start[1], end[0], end[1]);
    l.setAttribute("style", arrowStroke);
    arrow.appendChild(l);

    if (p.end) {
      var endArrowPoly = polygon(endHead);
      endArrowPoly.setAttribute("style", arrowFill);
      arrow.appendChild(endArrowPoly);
    }

    if (p.start) {
      var startArrowPoly = polygon(startHead);
      startArrowPoly.setAttribute("style", arrowFill);
      arrow.appendChild(startArrowPoly);
    }

    if (p.highlight !== undefined) {
      var hScale = 0.6;
      var centering = [arrowVector[0] * p.length * 0.09, arrowVector[1] * p.length * 0.09];
      var endHeadHighlight = [[centering[0] + end[0] + arrow90[0] * (p.width * hScale), centering[1] + end[1] + arrow90[1] * (p.width * hScale)], [centering[0] + end[0] - arrow90[0] * (p.width * hScale), centering[1] + end[1] - arrow90[1] * (p.width * hScale)], [centering[0] + end[0] + arrowVector[0] * (p.length * hScale), centering[1] + end[1] + arrowVector[1] * (p.length * hScale)]];
      var startHeadHighlight = [[-centering[0] + start[0] - arrow90[0] * (p.width * hScale), -centering[1] + start[1] - arrow90[1] * (p.width * hScale)], [-centering[0] + start[0] + arrow90[0] * (p.width * hScale), -centering[1] + start[1] + arrow90[1] * (p.width * hScale)], [-centering[0] + start[0] - arrowVector[0] * (p.length * hScale), -centering[1] + start[1] - arrowVector[1] * (p.length * hScale)]];
      var highline = line(start[0], start[1], end[0], end[1]);
      highline.setAttribute("style", highlightStroke);
      arrow.appendChild(highline);

      if (p.end) {
        var endArrowHighlight = polygon(endHeadHighlight);
        endArrowHighlight.setAttribute("style", highlightFill);
        arrow.appendChild(endArrowHighlight);
      }

      if (p.start) {
        var startArrowHighlight = polygon(startHeadHighlight);
        startArrowHighlight.setAttribute("style", highlightFill);
        arrow.appendChild(startArrowHighlight);
      }
    }

    return arrow;
  };
  var arcArrow = function arcArrow(start, end, options) {
    var p = {
      color: "#000",
      strokeWidth: 0.5,
      width: 0.5,
      length: 2,
      bend: 0.3,
      pinch: 0.618,
      padding: 0.5,
      side: true,
      start: false,
      end: true,
      strokeStyle: "",
      fillStyle: ""
    };

    if (_typeof(options) === "object" && options !== null) {
      Object.assign(p, options);
    }

    var arrowFill = ["stroke:none", "fill:".concat(p.color), p.fillStyle].filter(function (a) {
      return a !== "";
    }).join(";");
    var arrowStroke = ["fill:none", "stroke:".concat(p.color), "stroke-width:".concat(p.strokeWidth), p.strokeStyle].filter(function (a) {
      return a !== "";
    }).join(";");
    var startPoint = start;
    var endPoint = end;
    var vector = [endPoint[0] - startPoint[0], endPoint[1] - startPoint[1]];
    var midpoint = [startPoint[0] + vector[0] / 2, startPoint[1] + vector[1] / 2];
    var len = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    var minLength = (p.start ? 1 + p.padding : 0 + p.end ? 1 + p.padding : 0) * p.length * 2.5;

    if (len < minLength) {
      var minVec = [vector[0] / len * minLength, vector[1] / len * minLength];
      startPoint = [midpoint[0] - minVec[0] * 0.5, midpoint[1] - minVec[1] * 0.5];
      endPoint = [midpoint[0] + minVec[0] * 0.5, midpoint[1] + minVec[1] * 0.5];
      vector = [endPoint[0] - startPoint[0], endPoint[1] - startPoint[1]];
    }

    var perpendicular = [vector[1], -vector[0]];
    var bezPoint = [midpoint[0] + perpendicular[0] * (p.side ? 1 : -1) * p.bend, midpoint[1] + perpendicular[1] * (p.side ? 1 : -1) * p.bend];
    var bezStart = [bezPoint[0] - startPoint[0], bezPoint[1] - startPoint[1]];
    var bezEnd = [bezPoint[0] - endPoint[0], bezPoint[1] - endPoint[1]];
    var bezStartLen = Math.sqrt(bezStart[0] * bezStart[0] + bezStart[1] * bezStart[1]);
    var bezEndLen = Math.sqrt(bezEnd[0] * bezEnd[0] + bezEnd[1] * bezEnd[1]);
    var bezStartNorm = [bezStart[0] / bezStartLen, bezStart[1] / bezStartLen];
    var bezEndNorm = [bezEnd[0] / bezEndLen, bezEnd[1] / bezEndLen];
    var startHeadVec = [-bezStartNorm[0], -bezStartNorm[1]];
    var endHeadVec = [-bezEndNorm[0], -bezEndNorm[1]];
    var startNormal = [startHeadVec[1], -startHeadVec[0]];
    var endNormal = [endHeadVec[1], -endHeadVec[0]];
    var arcStart = [startPoint[0] + bezStartNorm[0] * p.length * ((p.start ? 1 : 0) + p.padding), startPoint[1] + bezStartNorm[1] * p.length * ((p.start ? 1 : 0) + p.padding)];
    var arcEnd = [endPoint[0] + bezEndNorm[0] * p.length * ((p.end ? 1 : 0) + p.padding), endPoint[1] + bezEndNorm[1] * p.length * ((p.end ? 1 : 0) + p.padding)];
    vector = [arcEnd[0] - arcStart[0], arcEnd[1] - arcStart[1]];
    perpendicular = [vector[1], -vector[0]];
    midpoint = [arcStart[0] + vector[0] / 2, arcStart[1] + vector[1] / 2];
    bezPoint = [midpoint[0] + perpendicular[0] * (p.side ? 1 : -1) * p.bend, midpoint[1] + perpendicular[1] * (p.side ? 1 : -1) * p.bend];
    var controlStart = [arcStart[0] + (bezPoint[0] - arcStart[0]) * p.pinch, arcStart[1] + (bezPoint[1] - arcStart[1]) * p.pinch];
    var controlEnd = [arcEnd[0] + (bezPoint[0] - arcEnd[0]) * p.pinch, arcEnd[1] + (bezPoint[1] - arcEnd[1]) * p.pinch];
    var startHeadPoints = [[arcStart[0] + startNormal[0] * -p.width, arcStart[1] + startNormal[1] * -p.width], [arcStart[0] + startNormal[0] * p.width, arcStart[1] + startNormal[1] * p.width], [arcStart[0] + startHeadVec[0] * p.length, arcStart[1] + startHeadVec[1] * p.length]];
    var endHeadPoints = [[arcEnd[0] + endNormal[0] * -p.width, arcEnd[1] + endNormal[1] * -p.width], [arcEnd[0] + endNormal[0] * p.width, arcEnd[1] + endNormal[1] * p.width], [arcEnd[0] + endHeadVec[0] * p.length, arcEnd[1] + endHeadVec[1] * p.length]];
    var arrowGroup = win.document.createElementNS(namespace, "g");
    var arrowArc = bezier(arcStart[0], arcStart[1], controlStart[0], controlStart[1], controlEnd[0], controlEnd[1], arcEnd[0], arcEnd[1]);
    arrowArc.setAttribute("style", arrowStroke);
    arrowGroup.appendChild(arrowArc);

    if (p.start) {
      var startHead = polygon(startHeadPoints);
      startHead.setAttribute("style", arrowFill);
      arrowGroup.appendChild(startHead);
    }

    if (p.end) {
      var endHead = polygon(endHeadPoints);
      endHead.setAttribute("style", arrowFill);
      arrowGroup.appendChild(endHead);
    }

    return arrowGroup;
  };

  var arrows = /*#__PURE__*/Object.freeze({
    __proto__: null,
    straightArrow: straightArrow,
    arcArrow: arcArrow
  });

  function vkXML (text, step) {
    var ar = text.replace(/>\s{0,}</g, "><").replace(/</g, "~::~<").replace(/\s*xmlns\:/g, "~::~xmlns:").split("~::~");
    var len = ar.length;
    var inComment = false;
    var deep = 0;
    var str = "";
    var space = step != null && typeof step === "string" ? step : "\t";
    var shift = ["\n"];

    for (var si = 0; si < 100; si += 1) {
      shift.push(shift[si] + space);
    }

    for (var ix = 0; ix < len; ix += 1) {
      if (ar[ix].search(/<!/) > -1) {
        str += shift[deep] + ar[ix];
        inComment = true;

        if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1) {
          inComment = false;
        }
      } else if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
        str += ar[ix];
        inComment = false;
      } else if (/^<\w/.exec(ar[ix - 1]) && /^<\/\w/.exec(ar[ix]) && /^<[\w:\-\.\,]+/.exec(ar[ix - 1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace("/", "")) {
        str += ar[ix];

        if (!inComment) {
          deep -= 1;
        }
      } else if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) === -1 && ar[ix].search(/\/>/) === -1) {
        str = !inComment ? str += shift[deep++] + ar[ix] : str += ar[ix];
      } else if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
        str = !inComment ? str += shift[deep] + ar[ix] : str += ar[ix];
      } else if (ar[ix].search(/<\//) > -1) {
        str = !inComment ? str += shift[--deep] + ar[ix] : str += ar[ix];
      } else if (ar[ix].search(/\/>/) > -1) {
        str = !inComment ? str += shift[deep] + ar[ix] : str += ar[ix];
      } else if (ar[ix].search(/<\?/) > -1) {
        str += shift[deep] + ar[ix];
      } else if (ar[ix].search(/xmlns\:/) > -1 || ar[ix].search(/xmlns\=/) > -1) {
        str += shift[deep] + ar[ix];
      } else {
        str += ar[ix];
      }
    }

    return str[0] === "\n" ? str.slice(1) : str;
  }

  var downloadInBrowser = function downloadInBrowser(filename, contentsAsString) {
    var blob = new window.Blob([contentsAsString], {
      type: "text/plain"
    });
    var a = document.createElement("a");
    a.setAttribute("href", window.URL.createObjectURL(blob));
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  var getPageCSS = function getPageCSS() {
    var css = [];

    for (var s = 0; s < document.styleSheets.length; s += 1) {
      var sheet = document.styleSheets[s];

      try {
        var rules = "cssRules" in sheet ? sheet.cssRules : sheet.rules;

        for (var r = 0; r < rules.length; r += 1) {
          var rule = rules[r];

          if ("cssText" in rule) {
            css.push(rule.cssText);
          } else {
            css.push("".concat(rule.selectorText, " {\n").concat(rule.style.cssText, "\n}\n"));
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }

    return css.join("\n");
  };
  var save = function save(svg) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "image.svg";
    var includeDOMCSS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (includeDOMCSS) {
      var styleContainer = document.createElementNS(namespace, "style");
      styleContainer.setAttribute("type", "text/css");
      styleContainer.innerHTML = getPageCSS();
      svg.appendChild(styleContainer);
    }

    var source = new XMLSerializer().serializeToString(svg);
    var formattedString = vkXML(source);

    if (window != null) {
      downloadInBrowser(filename, formattedString);
    } else {
      console.warn("save() meant for in-browser use");
    }
  };

  var load = function load(input, callback) {
    if (typeof input === "string" || input instanceof String) {
      var xml = new DOMParser().parseFromString(input, "text/xml");
      var parserErrors = xml.getElementsByTagName("parsererror");

      if (parserErrors.length === 0) {
        var parsedSVG = xml.documentElement;

        if (callback != null) {
          callback(parsedSVG);
        }

        return parsedSVG;
      }

      fetch(input).then(function (response) {
        return response.text();
      }).then(function (str) {
        return new DOMParser().parseFromString(str, "text/xml");
      }).then(function (svgData) {
        var allSVGs = svgData.getElementsByTagName("svg");

        if (allSVGs == null || allSVGs.length === 0) {
          throw "error, valid XML found, but no SVG element";
        }

        if (callback != null) {
          callback(allSVGs[0]);
        }

        return allSVGs[0];
      });
    } else if (input instanceof Document) {
      callback(input);
      return input;
    }
  };

  var Pointer = function Pointer(node) {
    var pointer = Object.create(null);
    Object.assign(pointer, {
      isPressed: false,
      position: [0, 0],
      pressed: [0, 0],
      drag: [0, 0],
      prev: [0, 0],
      x: 0,
      y: 0
    });

    var copyPointer = function copyPointer() {
      var m = pointer.position.slice();
      Object.keys(pointer).filter(function (key) {
        return _typeof(key) === "object";
      }).forEach(function (key) {
        m[key] = pointer[key].slice();
      });
      Object.keys(pointer).filter(function (key) {
        return _typeof(key) !== "object";
      }).forEach(function (key) {
        m[key] = pointer[key];
      });
      return Object.freeze(m);
    };

    var setPosition = function setPosition(clientX, clientY) {
      pointer.position = convertToViewBox(node, clientX, clientY);

      var _pointer$position = _slicedToArray(pointer.position, 2);

      pointer.x = _pointer$position[0];
      pointer.y = _pointer$position[1];
    };

    var updateDrag = function updateDrag() {
      pointer.drag = [pointer.position[0] - pointer.pressed[0], pointer.position[1] - pointer.pressed[1]];

      var _pointer$drag = _slicedToArray(pointer.drag, 2);

      pointer.drag.x = _pointer$drag[0];
      pointer.drag.y = _pointer$drag[1];
    };

    var thisPointer = {};

    var move = function move(clientX, clientY) {
      pointer.prev = pointer.position;
      setPosition(clientX, clientY);

      if (pointer.isPressed) {
        updateDrag();
      }

      return thisPointer;
    };

    var down = function down(clientX, clientY) {
      pointer.isPressed = true;
      pointer.pressed = convertToViewBox(node, clientX, clientY);
      setPosition(clientX, clientY);
      return thisPointer;
    };

    var up = function up() {
      pointer.isPressed = false;
      return thisPointer;
    };

    var pressed = function pressed(isPressed) {
      pointer.isPressed = isPressed;
      return thisPointer;
    };

    Object.defineProperty(thisPointer, "up", {
      value: up
    });
    Object.defineProperty(thisPointer, "pressed", {
      value: pressed
    });
    Object.defineProperty(thisPointer, "move", {
      value: move
    });
    Object.defineProperty(thisPointer, "down", {
      value: down
    });
    Object.defineProperty(thisPointer, "get", {
      value: copyPointer
    });
    return thisPointer;
  };

  var Touches = function Touches(node) {
    var pointer = Pointer(node);

    var clear = function clear() {
      node.onmousemove = null;
      node.ontouchmove = null;
      node.onmousedown = null;
      node.ontouchstart = null;
      node.onmouseup = null;
      node.ontouchend = null;
      node.onscroll = null;
    };

    var onMouseMove = function onMouseMove(handler, event) {
      event.preventDefault();
      var e = pointer.move(event.clientX, event.clientY).pressed(event.buttons > 0).get();
      handler(e);
      return e;
    };

    var onTouchMove = function onTouchMove(handler, event) {
      event.preventDefault();
      var e = pointer.move(event.touches[0].clientX, event.touches[0].clientY).pressed(true).get();
      handler(e);
      return e;
    };

    var onMouseDown = function onMouseDown(handler, event) {
      event.preventDefault();
      var e = pointer.down(event.clientX, event.clientY).get();
      handler(e);
      return e;
    };

    var onTouchStart = function onTouchStart(handler, event) {
      event.preventDefault();
      var e = pointer.down(event.touches[0].clientX, event.touches[0].clientY).get();
      handler(e);
      return e;
    };

    var onEnd = function onEnd(handler, event) {
      event.preventDefault();
      var e = pointer.pressed(false).get();
      handler(e);
      return e;
    };

    var onScroll = function onScroll(handler, event) {
      var e = {
        deltaX: event.deltaX,
        deltaY: event.deltaY,
        deltaZ: event.deltaZ
      };
      e.position = convertToViewBox(node, event.clientX, event.clientY);

      var _e$position = _slicedToArray(e.position, 2);

      e.x = _e$position[0];
      e.y = _e$position[1];
      event.preventDefault();
      handler(e);
      return e;
    };

    Object.defineProperty(node, "mouse", {
      get: function get() {
        return pointer.get();
      },
      enumerable: true
    });
    Object.defineProperty(node, "mouseMoved", {
      set: function set(handler) {
        node.onmousemove = function (event) {
          return onMouseMove(handler, event);
        };

        node.ontouchmove = function (event) {
          return onTouchMove(handler, event);
        };
      },
      enumerable: true
    });
    Object.defineProperty(node, "mousePressed", {
      set: function set(handler) {
        node.onmousedown = function (event) {
          return onMouseDown(handler, event);
        };

        node.ontouchstart = function (event) {
          return onTouchStart(handler, event);
        };
      },
      enumerable: true
    });
    Object.defineProperty(node, "mouseReleased", {
      set: function set(handler) {
        node.onmouseup = function (event) {
          return onEnd(handler, event);
        };

        node.ontouchend = function (event) {
          return onEnd(handler, event);
        };
      },
      enumerable: true
    });
    Object.defineProperty(node, "onscroll", {
      set: function set(handler) {
        node.onscroll = function (event) {
          return onScroll(handler, event);
        };
      },
      enumerable: true
    });
    return {
      clear: clear,
      pointer: pointer
    };
  };

  var DEFAULT_DELAY = 1000 / 60;

  var Animate = function Animate(node) {
    var timers = [];
    var frameNumber;
    var delay = DEFAULT_DELAY;
    var func;

    var clear = function clear() {
      while (timers.length > 0) {
        clearInterval(timers.shift());
      }
    };

    var start = function start() {
      timers.push(setInterval(function () {
        func({
          time: node.getCurrentTime(),
          frame: frameNumber += 1
        });
      }, delay));
    };

    var setLoop = function setLoop(handler) {
      clear();
      func = handler;

      if (typeof func === "function") {
        frameNumber = 0;
        start();
      }
    };

    var validateMillis = function validateMillis(m) {
      var parsed = parseFloat(m);

      if (!isNaN(parsed) && isFinite(parsed)) {
        return parsed;
      }

      return DEFAULT_DELAY;
    };

    var setFPS = function setFPS(fps) {
      clear();
      delay = validateMillis(1000 / fps);
      start();
    };

    Object.defineProperty(node, "animate", {
      set: function set(handler) {
        return setLoop(handler);
      },
      enumerable: true
    });
    Object.defineProperty(node, "clear", {
      value: function value() {
        return clear();
      },
      enumerable: true
    });
    return {
      clear: clear,
      setLoop: setLoop,
      setFPS: setFPS
    };
  };

  var Events = function Events(node) {
    var animate = Animate(node);
    var touches = Touches(node);
    Object.defineProperty(node, "stopAnimations", {
      value: animate.clear,
      enumerated: true
    });
    Object.defineProperty(node, "freeze", {
      value: function value() {
        touches.clear();
        animate.clear();
      },
      enumerated: true
    });
    Object.defineProperty(node, "fps", {
      set: function set(fps) {
        return animate.setFPS(fps);
      },
      enumerated: true
    });
  };

  var findElementInParams = function findElementInParams() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var element = params.filter(function (arg) {
      return arg instanceof HTMLElement;
    }).shift();
    var idElement = params.filter(function (a) {
      return typeof a === "string" || a instanceof String;
    }).map(function (str) {
      return win.document.getElementById(str);
    }).shift();

    if (element != null) {
      return element;
    }

    return idElement != null ? idElement : win.document.body;
  };

  var initSize = function initSize(svgElement, params) {
    var numbers = params.filter(function (arg) {
      return !isNaN(arg);
    });

    if (numbers.length >= 2) {
      svgElement.setAttributeNS(null, "width", numbers[0]);
      svgElement.setAttributeNS(null, "height", numbers[1]);
      setViewBox(svgElement, 0, 0, numbers[0], numbers[1]);
    } else if (svgElement.getAttribute("viewBox") == null) {
      var frame = svgElement.getBoundingClientRect();
      setViewBox(svgElement, 0, 0, frame.width, frame.height);
    }
  };

  var getWidth = function getWidth(element) {
    var viewBox = getViewBox(element);

    if (viewBox == null) {
      return undefined;
    }

    return viewBox[2];
  };

  var getHeight = function getHeight(element) {
    var viewBox = getViewBox(element);

    if (viewBox == null) {
      return undefined;
    }

    return viewBox[3];
  };

  var setWidth = function setWidth(element, w) {
    var viewBox = getViewBox(element);
    viewBox[2] = w;
    return setViewBox.apply(void 0, [element].concat(_toConsumableArray(viewBox)));
  };

  var setHeight = function setHeight(element, h) {
    var viewBox = getViewBox(element);
    viewBox[3] = h;
    return setViewBox.apply(void 0, [element].concat(_toConsumableArray(viewBox)));
  };

  var size = function size(element) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (args.length === 2 && typeof args[0] === "number" && typeof args[1] === "number") {
      setViewBox(element, 0, 0, args[0], args[1]);
    } else if (args.length === 4 && _typeof(args.map(function (a) {
      return typeof a === "number";
    }).reduce(function (a, b) {
      return a && b;
    }, true))) {
      setViewBox.apply(void 0, [element].concat(args));
    }
  };

  var background = function background(element, color) {
    var parent = element.parentElement;

    if (parent != null) {
      parent.setAttribute("style", "background-color: ".concat(color));
    }

    var backRect = element.querySelector("#svg-background-rectangle");

    if (backRect != null) {
      backRect.setAttribute("fill", color);
    } else {
      var viewBox = element.viewBox.baseVal;
      var frame = [viewBox.x, viewBox.y, viewBox.width - viewBox.x, viewBox.height - viewBox.y];
      backRect = rect(frame[0], frame[1], frame[2], frame[3]).fill(color);
      backRect.setAttribute("id", "svg-background-rectangle");
      element.prepend(backRect);
    }
  };

  var replaceWithSVG = function replaceWithSVG(oldSVG, newSVG) {
    Array.from(oldSVG.attributes).forEach(function (attr) {
      return oldSVG.removeAttribute(attr.name);
    });
    removeChildren(oldSVG);
    Array.from(newSVG.children).forEach(function (node) {
      node.remove();
      oldSVG.appendChild(node);
    });
    Array.from(newSVG.attributes).forEach(function (attr) {
      return oldSVG.setAttribute(attr.name, attr.value);
    });
  };

  var SVG = function SVG() {
    for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      params[_key3] = arguments[_key3];
    }

    var element = svg();
    initSize(element, params);
    Events(element);

    element.getWidth = function () {
      return getWidth(element);
    };

    element.getHeight = function () {
      return getHeight(element);
    };

    element.setWidth = function (w) {
      return setWidth(element, w);
    };

    element.setHeight = function (h) {
      return setHeight(element, h);
    };

    element.background = function (color) {
      return background(element, color);
    };

    element.size = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return size.apply(void 0, [element].concat(args));
    };

    element.save = function () {
      var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image.svg";
      return save(element, filename);
    };

    element.load = function (data, callback) {
      load(data, function (newSVG, error) {
        if (newSVG != null) {
          replaceWithSVG(element, newSVG);
        }

        if (callback != null) {
          callback(element, error);
        }
      });
    };

    var initialize = function initialize() {
      initSize(element, params);
      var parent = findElementInParams.apply(void 0, params);

      if (parent != null) {
        parent.appendChild(element);
      }

      params.filter(function (arg) {
        return typeof arg === "function";
      }).forEach(function (func) {
        return func();
      });
    };

    if (win.document.readyState === "loading") {
      win.document.addEventListener("DOMContentLoaded", initialize);
    } else {
      initialize();
    }

    return element;
  };

  var constructors = {};
  Object.assign(constructors, root, arrows, primitives);
  delete constructors.setConstructors;
  setConstructors(constructors);
  var elements = {};
  Object.keys(arrows).forEach(function (key) {
    elements[key] = arrows[key];
  });
  Object.keys(primitives).forEach(function (key) {
    elements[key] = primitives[key];
  });
  Object.keys(root).filter(function (key) {
    return key !== "setConstructors";
  }).forEach(function (key) {
    elements[key] = root[key];
  });
  elements.svg = SVG;

  SVG.NS = namespace;
  Object.keys(elements).forEach(function (key) {
    SVG[key] = elements[key];
  });
  Object.keys(geometryMods).forEach(function (key) {
    SVG[key] = geometryMods[key];
  });
  Object.keys(ViewBox).forEach(function (key) {
    SVG[key] = ViewBox[key];
  });

  return SVG;

}));
