/* SVG (c) Robby Kraft, MIT License */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SVG = factory());
}(this, (function () { 'use strict';
  function _typeof(obj) {
    "@babel/helpers - typeof";
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
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    }
  }
  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  var keys = ["number", "object", "transform", "class", "style", "function", "string", "undefined", "boolean", "path", "svg", "id"];
  var Keys = {};
  keys.forEach(function (key) {
    return Keys[key] = key;
  });
  var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) !== Keys.undefined && _typeof(window.document) !== Keys.undefined;
  var isNode = (typeof process === "undefined" ? "undefined" : _typeof(process)) !== Keys.undefined && process.versions != null && process.versions.node != null;
  var isWebWorker = (typeof self === "undefined" ? "undefined" : _typeof(self)) === Keys.object && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";
  var htmlString = "<!DOCTYPE html><title>.</title>";
  var win = function () {
    var w = {};
    if (isNode) {
      var _require = require("xmldom"),
          DOMParser = _require.DOMParser,
          XMLSerializer = _require.XMLSerializer;
      w.DOMParser = DOMParser;
      w.XMLSerializer = XMLSerializer;
      w.document = new DOMParser().parseFromString(htmlString, "text/html");
    } else if (isBrowser) {
      w = window;
    }
    return w;
  }();
  var NS = "http://www.w3.org/2000/svg";
  var NodeNames = {
    s: ["svg"],
    d: ["defs"],
    h: ["desc", "filter", "metadata", "style", "script", "title", "view"],
    c: ["cdata"],
    g: ["g"],
    v: ["circle", "ellipse", "line", "path", "polygon", "polyline", "rect"],
    t: ["text"],
    i: ["marker", "symbol", "clipPath", "mask"],
    p: ["linearGradient", "radialGradient", "pattern"],
    cT: ["textPath", "tspan"],
    cG: ["stop"],
    cF: ["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]
  };
  var nodes = {};
  Object.assign(nodes);
  var customPrimitives = Object.keys(nodes);
  var headerStuff = [NodeNames.h, NodeNames.p, NodeNames.i];
  var drawingShapes = [NodeNames.g, NodeNames.v, NodeNames.t, customPrimitives];
  var folders = {
    svg: [NodeNames.s, NodeNames.d].concat(headerStuff).concat(drawingShapes),
    g: drawingShapes,
    text: [NodeNames.cT],
    linearGradient: [NodeNames.cG],
    radialGradient: [NodeNames.cG],
    defs: headerStuff,
    filter: [NodeNames.cF],
    marker: drawingShapes,
    symbol: drawingShapes,
    clipPath: drawingShapes,
    mask: drawingShapes
  };
  var nodesAndChildren = {};
  Object.keys(folders).forEach(function (key) {
    nodesAndChildren[key] = folders[key].reduce(function (a, b) {
      return a.concat(b);
    }, []);
  });
  var Case = {
    toCamel: function toCamel(s) {
      return s.replace(/([-_][a-z])/ig, function ($1) {
        return $1.toUpperCase().replace("-", "").replace("_", "");
      });
    },
    toKebab: function toKebab(s) {
      return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2").toLowerCase();
    },
    capitalized: function capitalized(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  };
  var NodeAttributes = {
    svg: ["viewBox"],
    line: ["x1", "y1", "x2", "y2"],
    rect: ["x", "y", "width", "height"],
    circle: ["cx", "cy", "r"],
    ellipse: ["cx", "cy", "rx", "ry"],
    polygon: ["points"],
    polyline: ["points"],
    path: ["d"],
    text: ["x", "y"],
    mask: ["id"],
    symbol: ["id"],
    clipPath: ["id", "clip-rule"],
    marker: ["id", "markerHeight", "markerUnits", "markerWidth", "orient", "refX", "refY"],
    linearGradient: ["x1", "x2", "y1", "y2"],
    radialGradient: ["cx", "cy", "r", "fr", "fx", "fy"],
    stop: ["offset", "stop-color", "stop-opacity"],
    pattern: ["patternContentUnits", "patternTransform", "patternUnits"]
  };
  var pathCommands = {
    m: "move",
    l: "line",
    v: "vertical",
    h: "horizontal",
    a: "ellipse",
    c: "curve",
    s: "smoothCurve",
    q: "quadCurve",
    t: "smoothQuadCurve",
    z: "close"
  };
  Object.keys(pathCommands).forEach(function (key) {
    var s = pathCommands[key];
    pathCommands[key.toUpperCase()] = s.charAt(0).toUpperCase() + s.slice(1);
  });
  Object.keys(pathCommands).forEach(function (key) {
  });
  var ElementConstructor = new win.DOMParser().parseFromString("<div />", "text/xml").documentElement.constructor;
  Object.assign({});
  var ManyElements = {
    presentation: ["color", "color-interpolation", "cursor", "direction", "display", "fill", "fill-opacity", "fill-rule", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "image-rendering", "letter-spacing", "opacity", "overflow", "paint-order", "pointer-events", "preserveAspectRatio", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tabindex", "transform-origin", "user-select", "vector-effect", "visibility"],
    animation: ["accumulate", "additive", "attributeName", "begin", "by", "calcMode", "dur", "end", "from", "keyPoints", "keySplines", "keyTimes", "max", "min", "repeatCount", "repeatDur", "restart", "to", "values"],
    effects: ["azimuth", "baseFrequency", "bias", "color-interpolation-filters", "diffuseConstant", "divisor", "edgeMode", "elevation", "exponent", "filter", "filterRes", "filterUnits", "flood-color", "flood-opacity", "in", "in2", "intercept", "k1", "k2", "k3", "k4", "kernelMatrix", "lighting-color", "limitingConeAngle", "mode", "numOctaves", "operator", "order", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "primitiveUnits", "radius", "result", "seed", "specularConstant", "specularExponent", "stdDeviation", "stitchTiles", "surfaceScale", "targetX", "targetY", "type", "xChannelSelector", "yChannelSelector"],
    text: ["dx", "dy", "alignment-baseline", "baseline-shift", "dominant-baseline", "lengthAdjust", "method", "overline-position", "overline-thickness", "rotate", "spacing", "startOffset", "strikethrough-position", "strikethrough-thickness", "text-anchor", "text-decoration", "text-rendering", "textLength", "underline-position", "underline-thickness", "word-spacing", "writing-mode"],
    gradient: ["gradientTransform", "gradientUnits", "spreadMethod"]
  };
  Object.values(NodeNames).reduce(function (a, b) {
    return a.concat(b);
  }, []).filter(function (nodeName) {
    return NodeAttributes[nodeName] === undefined;
  }).forEach(function (nodeName) {
    NodeAttributes[nodeName] = [];
  });
  [[["svg", "defs", "g"].concat(NodeNames.v, NodeNames.t), ManyElements.presentation], [["filter"], ManyElements.effects], [NodeNames.cT.concat("text"), ManyElements.text], [NodeNames.cF, ManyElements.effects], [NodeNames.cG, ManyElements.gradient]].forEach(function (pair) {
    return pair[0].forEach(function (key) {
      NodeAttributes[key] = NodeAttributes[key].concat(pair[1]);
    });
  });
  var findIdURL = function findIdURL(arg) {
    if (arg == null) {
      return "";
    }
    if (_typeof(arg) === Keys.string) {
      return arg.slice(0, 3) === "url" ? arg : "url(#".concat(arg, ")");
    }
    if (arg.getAttribute != null) {
      var idString = arg.getAttribute(Keys.id);
      return "url(#".concat(idString, ")");
    }
    return "";
  };
  var methods = {};
  ["clip-path", "mask", "symbol", "marker-end", "marker-mid", "marker-start"].forEach(function (attr) {
    methods[Case.toCamel(attr)] = function (element, parent) {
      return element.setAttribute(attr, findIdURL(parent));
    };
  });
  var Nodes = {};
  Object.keys(NodeNames).forEach(function (key) {
    return NodeNames[key].filter(function (nodeName) {
      return Nodes[nodeName] === undefined;
    }).forEach(function (nodeName) {
      Nodes[nodeName] = {};
    });
  });
  var passthrough = function passthrough() {
    return Array.from(arguments);
  };
  Object.keys(Nodes).forEach(function (key) {
    if (!Nodes[key].nodeName) {
      Nodes[key].nodeName = key;
    }
    if (!Nodes[key].init) {
      Nodes[key].init = passthrough;
    }
    if (!Nodes[key].args) {
      Nodes[key].args = passthrough;
    }
    if (!Nodes[key].methods) {
      Nodes[key].methods = {};
    }
    if (!Nodes[key].attributes) {
      Nodes[key].attributes = NodeAttributes[key] || [];
    }
  });
  var RequiredAttrMap = {
    svg: {
      version: "1.1",
      xmlns: NS
    },
    style: {
      type: "text/css"
    }
  };
  var RequiredAttributes = function RequiredAttributes(element, nodeName) {
    if (RequiredAttrMap[nodeName]) {
      Object.keys(RequiredAttrMap[nodeName]).forEach(function (key) {
        return element.setAttribute(key, RequiredAttrMap[nodeName][key]);
      });
    }
  };
  var bound = {};
  var constructor = function constructor(nodeName) {
    var _Spec$nodeName, _Spec$nodeName2;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var element = win.document.createElementNS(NS, Nodes[nodeName].nodeName);
    RequiredAttributes(element, nodeName);
    (_Spec$nodeName = Nodes[nodeName]).init.apply(_Spec$nodeName, [element].concat(args));
    (_Spec$nodeName2 = Nodes[nodeName]).args.apply(_Spec$nodeName2, args).forEach(function (v, i) {
      if (Nodes[nodeName].attributes[i] != null) {
        element.setAttribute(Nodes[nodeName].attributes[i], v);
      }
    });
    Nodes[nodeName].attributes.forEach(function (attribute) {
      Object.defineProperty(element, Case.toCamel(attribute), {
        value: function value() {
          element.setAttribute.apply(element, [attribute].concat(Array.prototype.slice.call(arguments)));
          return element;
        }
      });
    });
    Object.keys(Nodes[nodeName].methods).forEach(function (methodName) {
      return Object.defineProperty(element, methodName, {
        value: function value() {
          var _Spec$nodeName$method;
          return (_Spec$nodeName$method = Nodes[nodeName].methods[methodName]).call.apply(_Spec$nodeName$method, [bound, element].concat(Array.prototype.slice.call(arguments)));
        }
      });
    });
    if (nodesAndChildren[nodeName]) {
      nodesAndChildren[nodeName].forEach(function (childNode) {
        Object.defineProperty(element, childNode, {
          value: function value() {
            var childElement = constructor.apply(void 0, [childNode].concat(Array.prototype.slice.call(arguments)));
            element.appendChild(childElement);
            return childElement;
          }
        });
      });
    }
    return element;
  };
  bound.Constructor = constructor;
  var elements = {};
  Object.keys(NodeNames).forEach(function (key) {
    return NodeNames[key].forEach(function (nodeName) {
      elements[nodeName] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return constructor.apply(void 0, [nodeName].concat(args));
      };
    });
  });
  var initialize = function initialize(svg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    args.filter(function (arg) {
      return _typeof(arg) === Keys["function"];
    }).forEach(function (func) {
      return func.call(svg, svg);
    });
  };
  var SVG = function SVG() {
    var _arguments = arguments;
    var svg = constructor.apply(void 0, [Keys.svg].concat(Array.prototype.slice.call(arguments)));
    if (win.document.readyState === "loading") {
      win.document.addEventListener("DOMContentLoaded", function () {
        return initialize.apply(void 0, [svg].concat(_toConsumableArray(_arguments)));
      });
    } else {
      initialize.apply(void 0, [svg].concat(Array.prototype.slice.call(arguments)));
    }
    return svg;
  };
  Object.assign(SVG, elements);
  SVG.NS = NS;
  return SVG;
})));
