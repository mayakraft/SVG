/* SVG (c) Robby Kraft, MIT License */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SVG = factory());
}(this, (function () { 'use strict';

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

  var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
  var isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
  var isWebWorker = (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";

  var htmlString = "<!DOCTYPE html><title> </title>";

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

  var isIterable = function isIterable(obj) {
    return obj != null && typeof obj[Symbol.iterator] === "function";
  };

  var flatten = function flatten() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    switch (args.length) {
      case undefined:
      case 0:
        return args;

      case 1:
        return isIterable(args[0]) && typeof args[0] !== "string" ? flatten.apply(void 0, _toConsumableArray(args[0])) : [args[0]];

      default:
        return Array.from(args).map(function (a) {
          return isIterable(a) ? _toConsumableArray(flatten(a)) : a;
        }).reduce(function (a, b) {
          return a.concat(b);
        }, []);
    }
  };

  var findCoordinates = function findCoordinates() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var numbers = args.filter(function (a) {
      return typeof a === "number";
    });

    if (numbers.length) {
      return numbers;
    }

    var coords = args.filter(function (a) {
      return _typeof(a) === "object" && typeof a.x === "number";
    });

    if (coords.length) {
      return coords.map(function (el) {
        return [el.x, el.y];
      }).reduce(function (a, b) {
        return a.concat(b);
      }, []);
    }

    return [];
  };

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
    svg.setAttributeNS(null, "viewBox", [X, Y, W, H].join(" "));
  };

  var ElementConstructor = new win.DOMParser().parseFromString("<div />", "text/xml").documentElement.constructor;

  var svgArguments = function svgArguments(element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var numbers = args.filter(function (arg) {
      return !isNaN(arg) && arg.constructor !== Array;
    });

    switch (numbers.length) {
      case 4:
        setViewBox(element, numbers[0], numbers[1], numbers[2], numbers[3]);

      case 2:
        setViewBox(element, 0, 0, numbers[0], numbers[1]);
    }

    var parent = args.filter(function (arg) {
      return arg instanceof ElementConstructor;
    }).shift();

    if (parent != null && typeof parent.appendChild === "function") {
      parent.appendChild(element);
    }

    return element;
  };

  var textArguments = function textArguments(element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var point = findCoordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, args)));
    var text = args.filter(function (a) {
      return typeof a === "string";
    });

    if (text) {
      element.innerHTML = text;
    }

    if (point) {
      ["x", "y"].forEach(function (key, i) {
        return element.setAttribute(key, point[i]);
      });
    }

    return element;
  };

  var UUID = function UUID() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  };

  var nonVisibleArguments = function nonVisibleArguments(element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var idString = args.filter(function (a) {
      return typeof a === "string" || a instanceof String;
    }).shift();
    element.setAttribute("id", idString != null ? idString : UUID());
    return element;
  };

  var map = {
    line: ["x1", "y1", "x2", "y2"],
    rect: ["x", "y", "width", "height"],
    circle: ["cx", "cy", "r"],
    ellipse: ["cx", "cy", "rx", "ry"],
    polygon: ["points"],
    polyline: ["points"],
    path: ["d"],
    clipPath: ["id"]
  };

  var polyString = function polyString() {
    for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
      numbers[_key] = arguments[_key];
    }

    return Array.from(Array(Math.floor(numbers.length / 2))).map(function (_, i) {
      return "".concat(numbers[i * 2 + 0], ",").concat(numbers[i * 2 + 1]);
    }).join(" ");
  };

  var toArray = function toArray(nodeName) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    switch (nodeName) {
      case "line":
        return findCoordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, args)));

      case "polyline":
      case "polygon":
        return [polyString.apply(void 0, _toConsumableArray(findCoordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, args)))))];
    }

    return args;
  };

  var Args = function Args(element) {
    var nodeName = element.nodeName;

    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    switch (nodeName) {
      case "svg":
        return svgArguments.apply(void 0, [element].concat(args));

      case "text":
        return textArguments.apply(void 0, [element].concat(args));

      case "mask":
      case "clipPath":
      case "symbol":
      case "marker":
        return nonVisibleArguments.apply(void 0, [element].concat(args));
    }

    var keys = map[nodeName];

    if (keys === undefined) {
      return element;
    }

    var values = toArray.apply(void 0, [nodeName].concat(args));
    keys.forEach(function (key, i) {
      if (values[i] != null) {
        element.setAttribute(key, values[i]);
      }
    });
    return element;
  };

  var constructor = function constructor(nodeName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return Args.apply(void 0, [win.document.createElementNS(NS, nodeName)].concat(args));
  };

  var NodeNames = {
    childOfText: ["textPath", "tspan"],
    childOfGradients: ["stop"],
    childOfFilter: ["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"],
    text: ["text"],
    drawings: ["circle", "ellipse", "line", "path", "polygon", "polyline", "rect"],
    group: ["g"],
    nonVisible: ["marker", "symbol", "clipPath", "mask"],
    patterns: ["linearGradient", "radialGradient", "pattern"],
    cdata: ["cdata"],
    header: ["desc", "filter", "metadata", "style", "script", "title", "view"],
    defs: ["defs"],
    svg: ["svg"]
  };

  var nodeChildren = {
    svg: [NodeNames.svg, NodeNames.defs, NodeNames.header, NodeNames.nonVisible, NodeNames.patterns, NodeNames.group, NodeNames.drawings, NodeNames.text],
    defs: [NodeNames.header, NodeNames.patterns, NodeNames.nonVisible],
    filter: [NodeNames.childOfFilter],
    marker: [NodeNames.group, NodeNames.drawings, NodeNames.text],
    symbol: [NodeNames.group, NodeNames.drawings, NodeNames.text],
    clipPath: [NodeNames.group, NodeNames.drawings, NodeNames.text],
    mask: [NodeNames.group, NodeNames.drawings, NodeNames.text],
    g: [NodeNames.group, NodeNames.drawings, NodeNames.text],
    text: [NodeNames.childOfText],
    linearGradient: [NodeNames.childOfGradients],
    radialGradient: [NodeNames.childOfGradients]
  };
  Object.keys(nodeChildren).forEach(function (key) {
    nodeChildren[key] = nodeChildren[key].reduce(function (a, b) {
      return a.concat(b);
    }, []);
  });

  var Attr = {
    general: ["color", "color-interpolation", "cursor", "direction", "display", "fill", "fill-opacity", "fill-rule", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "image-rendering", "letter-spacing", "marker-end", "marker-mid", "marker-start", "markerHeight", "markerUnits", "markerWidth", "opacity", "overflow", "paint-order", "pointer-events", "preserveAspectRatio", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tabindex", "transform-origin", "user-select", "vector-effect", "visibility"],
    animation: ["accumulate", "additive", "attributeName", "begin", "by", "calcMode", "dur", "end", "from", "keyPoints", "keySplines", "keyTimes", "max", "min", "repeatCount", "repeatDur", "restart", "to", "values"],
    effects: ["azimuth", "baseFrequency", "bias", "color-interpolation-filters", "diffuseConstant", "divisor", "edgeMode", "elevation", "exponent", "filter", "filterRes", "filterUnits", "flood-color", "flood-opacity", "in", "in2", "intercept", "k1", "k2", "k3", "k4", "kernelMatrix", "lighting-color", "limitingConeAngle", "mode", "numOctaves", "operator", "order", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "primitiveUnits", "radius", "result", "seed", "specularConstant", "specularExponent", "stdDeviation", "stitchTiles", "surfaceScale", "targetX", "targetY", "type", "xChannelSelector", "yChannelSelector"],
    text: ["alignment-baseline", "baseline-shift", "dominant-baseline", "method", "overline-position", "overline-thickness", "spacing", "startOffset", "strikethrough-position", "strikethrough-thickness", "text-anchor", "text-decoration", "text-rendering", "textLength", "underline-position", "underline-thickness", "word-spacing", "writing-mode"],
    clipPath: ["clip-rule"],
    marker: ["refX", "refY"],
    pattern: ["patternContentUnits", "patternTransform", "patternUnits"],
    gradient: ["gradientTransform", "gradientUnits", "spreadMethod"],
    linearGradient: ["x1", "x2", "y1", "y2"],
    radialGradient: ["cx", "cy", "r", "fr", "fx", "fy"]
  };

  var elemAttr = {};
  NodeNames.drawings.forEach(function (key) {
    elemAttr[key] = [Attr.general];
  });
  NodeNames.childOfFilter.forEach(function (key) {
    elemAttr[key] = [Attr.effects];
  });
  NodeNames.childOfGradients.forEach(function (key) {
    elemAttr[key] = [Attr.gradient];
  });
  NodeNames.childOfText.forEach(function (key) {
    elemAttr[key] = [Attr.general, Attr.text];
  });
  elemAttr.svg = [Attr.general];
  elemAttr.defs = [Attr.general];
  elemAttr.filter = [Attr.effects];
  elemAttr.marker = [Attr.marker];
  elemAttr.clipPath = [Attr.clipPath];
  elemAttr.pattern = [Attr.pattern];
  elemAttr.g = [Attr.general];
  elemAttr.text = [Attr.general, Attr.text];
  elemAttr.linearGradient = [Attr.gradient, Attr.linearGradient];
  elemAttr.radialGradient = [Attr.gradient, Attr.radialGradient];
  Object.keys(elemAttr).forEach(function (key) {
    elemAttr[key] = elemAttr[key].reduce(function (a, b) {
      return a.concat(b);
    }, []);
  });

  var BACKGROUND_CLASS = "svg-background-rectangle";

  var cdata = function cdata(textContent) {
    return new win.DOMParser().parseFromString("<root></root>", "text/xml").createCDATASection("".concat(textContent));
  };

  var getFrame = function getFrame(element) {
    var viewBox = getViewBox(element);

    if (viewBox !== undefined) {
      return viewBox;
    }

    if (typeof element.getBoundingClientRect === "function") {
      var rr = element.getBoundingClientRect();
      return [rr.x, rr.y, rr.width, rr.height];
    }

    return Array(4).fill(undefined);
  };

  var setSize = function setSize(element) {
    for (var _len = arguments.length, a = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      a[_key - 1] = arguments[_key];
    }

    var args = a.filter(function (t) {
      return typeof t === "number";
    });

    switch (args.length) {
      case 2:
        setViewBox.apply(void 0, [element, 0, 0].concat(_toConsumableArray(args)));
        break;

      case 4:
        setViewBox.apply(void 0, [element].concat(_toConsumableArray(args)));
        break;
    }

    return element;
  };

  var background = function background(element, color) {
    var paintOverflow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (paintOverflow === true) {
      var parent = element.parentElement;

      if (parent != null) {
        parent.setAttribute("background-color", color);
      }
    }

    var backRect = Array.from(element.childNodes).filter(function (child) {
      return child.getAttribute("class") === BACKGROUND_CLASS;
    }).shift();

    if (backRect == null) {
      backRect = this.Prepare(this.Constructor.apply(this, ["rect"].concat(_toConsumableArray(getFrame(element)))));
      backRect.setAttribute("class", BACKGROUND_CLASS);
      element.insertBefore(backRect, element.firstChild);
    }

    backRect.setAttribute("fill", color);
    return backRect;
  };

  var findStyleSheet = function findStyleSheet(element) {
    var styles = element.getElementsByTagName("style");
    return styles.length === 0 ? undefined : styles[0];
  };

  var stylesheet = function stylesheet(element, textContent) {
    console.log("stylesheet", this, element, textContent);
    var styleSection = findStyleSheet(element);

    if (styleSection == null) {
      styleSection = this.Prepare(this.Constructor("style"));
      element.insertBefore(styleSection, element.firstChild);
    }

    styleSection.textContent = "";
    styleSection.appendChild(cdata(textContent));
    return styleSection;
  };

  var methods = {};

  methods.getWidth = function (element) {
    return getFrame(element)[2];
  };

  methods.getHeight = function (element) {
    return getFrame(element)[3];
  };

  methods.size = function () {
    return setSize.apply(void 0, arguments);
  };

  methods.background = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return background.call.apply(background, [this].concat(args));
  };

  methods.stylesheet = function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return stylesheet.call.apply(stylesheet, [this].concat(args));
  };

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
  var methods$1 = {};

  methods$1.clear = function (el) {
    el.setAttribute("d", "");
    return el;
  };

  var getD = function getD(el) {
    var attr = el.getAttribute("d");
    return attr == null ? "" : attr;
  };

  var appendPathItem = function appendPathItem(el, command) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var params = flatten_input(args).join(",");
    el.setAttribute("d", "".concat(getD(el)).concat(command).concat(params));
    return el;
  };

  Object.keys(pathCommands).forEach(function (key) {
    methods$1[pathCommands[key]] = function (el) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return appendPathItem.apply(void 0, [el, key].concat(args));
    };
  });

  var nodeMethods = {
    svg: methods,
    path: methods$1
  };
  var methods$2 = {};
  Object.keys(nodeMethods).forEach(function (nodeName) {
    methods$2[nodeName] = {};
    Object.keys(nodeMethods[nodeName]).forEach(function (method) {
      methods$2[nodeName][method] = function (el) {
        var _nodeMethods$nodeName;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return (_nodeMethods$nodeName = nodeMethods[nodeName][method]).call.apply(_nodeMethods$nodeName, [methods$2, el].concat(args));
      };
    });
  });

  var Attributes = {
    svg: {
      version: "1.1",
      xmlns: NS
    },
    style: {
      type: "text/css"
    }
  };

  var toCamel = function toCamel(s) {
    return s.replace(/([-_][a-z])/ig, function ($1) {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  };

  var prepare = function prepare(element) {
    methods$2.Prepare = prepare;
    methods$2.Constructor = constructor;
    var nodeName = element.nodeName;

    if (_typeof(Attributes[nodeName]) === "object" && Attributes[nodeName] !== null) {
      Object.keys(Attributes[nodeName]).forEach(function (key) {
        return element.setAttribute(key, Attributes[nodeName][key]);
      });
    }

    if (_typeof(methods$2[nodeName]) === "object" && methods$2[nodeName] !== null) {
      Object.keys(methods$2[nodeName]).forEach(function (methodName) {
        Object.defineProperty(element, methodName, {
          value: function value() {
            var _Methods$nodeName;

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return (_Methods$nodeName = methods$2[nodeName])[methodName].apply(_Methods$nodeName, [element].concat(args));
          }
        });
      });
    }

    if (_typeof(nodeChildren[nodeName]) === "object" && nodeChildren[nodeName] !== null) {
      nodeChildren[nodeName].forEach(function (childTag) {
        Object.defineProperty(element, childTag, {
          value: function value() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var el = prepare(constructor.apply(void 0, [childTag].concat(args)));
            element.appendChild(el);
            return el;
          }
        });
      });
    }

    if (_typeof(elemAttr[nodeName]) === "object" && elemAttr[nodeName] !== null) {
      elemAttr[nodeName].forEach(function (attribute) {
        Object.defineProperty(element, toCamel(attribute), {
          value: function value() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            element.setAttribute.apply(element, [attribute].concat(args));
            return element;
          }
        });
      });
    }

    return element;
  };

  var elements = {};
  Object.keys(NodeNames).forEach(function (key) {
    return NodeNames[key].forEach(function (nodeName) {
      elements[nodeName] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return prepare(constructor.apply(void 0, [nodeName].concat(args)));
      };
    });
  });

  var initialize = function initialize(svg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    args.filter(function (arg) {
      return typeof arg === "function";
    }).forEach(function (func) {
      return func.call(svg, svg);
    });
  };

  var SVG = function SVG() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var svg = prepare(constructor.apply(void 0, ["svg"].concat(args)));

    if (win.document.readyState === "loading") {
      win.document.addEventListener("DOMContentLoaded", function () {
        return initialize.apply(void 0, [svg].concat(args));
      });
    } else {
      initialize.apply(void 0, [svg].concat(args));
    }

    return svg;
  };

  Object.assign(SVG, elements);
  SVG.NS = NS;

  return SVG;

})));
