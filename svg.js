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
  var Debug = {
    log: function log() {}
  };
  var keys = ["number", "object", "transform", "class", "style", "function", "string", "undefined", "boolean", "path", "svg", "id"];
  var Keys = {};
  keys.forEach(function (key) {
    return Keys[key] = key;
  });
  var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) !== Keys.undefined && _typeof(window.document) !== Keys.undefined;
  var isNode = (typeof process === "undefined" ? "undefined" : _typeof(process)) !== Keys.undefined && process.versions != null && process.versions.node != null;
  var isWebWorker = (typeof self === "undefined" ? "undefined" : _typeof(self)) === Keys.object && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";
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
    return obj != null && _typeof(obj[Symbol.iterator]) === Keys["function"];
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
        return isIterable(args[0]) && _typeof(args[0]) !== Keys.string ? flatten.apply(void 0, _toConsumableArray(args[0])) : [args[0]];
      default:
        return Array.from(args).map(function (a) {
          return isIterable(a) ? _toConsumableArray(flatten(a)) : a;
        }).reduce(function (a, b) {
          return a.concat(b);
        }, []);
    }
  };
  var coordinates = (function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.filter(function (a) {
      return _typeof(a) === Keys.number;
    }).concat(args.filter(function (a) {
      return _typeof(a) === Keys.object;
    }).map(function (el) {
      if (_typeof(el.x) === Keys.number) return [el.x, el.y];
      if (_typeof(el[0]) === Keys.number) return [el[0], el[1]];
      return undefined;
    }).filter(function (a) {
      return a !== undefined;
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []));
  });
  var ElementConstructor = new win.DOMParser().parseFromString("<div />", "text/xml").documentElement.constructor;
  function svgArguments (element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var parent = args.filter(function (a) {
      return a != null;
    }).filter(function (arg) {
      return arg instanceof ElementConstructor;
    }).shift();
    if (parent != null && _typeof(parent.appendChild) === Keys["function"]) {
      parent.appendChild(element);
    }
  }
  var textArguments = (function (element, a, b, c, d) {
    var text = [a, b, c, d].filter(function (a) {
      return _typeof(a) === Keys.string;
    }).shift();
    if (text) {
      element.innerHTML = text;
    }
  });
  var attributes = {
    presentation: ["color", "color-interpolation", "cursor", "direction", "display", "fill", "fill-opacity", "fill-rule", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "image-rendering", "letter-spacing", "opacity", "overflow", "paint-order", "pointer-events", "preserveAspectRatio", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tabindex", "transform-origin", "user-select", "vector-effect", "visibility"],
    animation: ["accumulate", "additive", "attributeName", "begin", "by", "calcMode", "dur", "end", "from", "keyPoints", "keySplines", "keyTimes", "max", "min", "repeatCount", "repeatDur", "restart", "to", "values"],
    effects: ["azimuth", "baseFrequency", "bias", "color-interpolation-filters", "diffuseConstant", "divisor", "edgeMode", "elevation", "exponent", "filter", "filterRes", "filterUnits", "flood-color", "flood-opacity", "in", "in2", "intercept", "k1", "k2", "k3", "k4", "kernelMatrix", "lighting-color", "limitingConeAngle", "mode", "numOctaves", "operator", "order", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "primitiveUnits", "radius", "result", "seed", "specularConstant", "specularExponent", "stdDeviation", "stitchTiles", "surfaceScale", "targetX", "targetY", "type", "xChannelSelector", "yChannelSelector"],
    text: ["x", "y", "dx", "dy", "alignment-baseline", "baseline-shift", "dominant-baseline", "lengthAdjust", "method", "overline-position", "overline-thickness", "rotate", "spacing", "startOffset", "strikethrough-position", "strikethrough-thickness", "text-anchor", "text-decoration", "text-rendering", "textLength", "underline-position", "underline-thickness", "word-spacing", "writing-mode"],
    mask: ["id"],
    symbol: ["id"],
    clipPath: ["id", "clip-rule"],
    marker: ["id", "refX", "refY", "markerHeight", "markerUnits", "markerWidth"],
    pattern: ["patternContentUnits", "patternTransform", "patternUnits"],
    gradient: ["gradientTransform", "gradientUnits", "spreadMethod"],
    linearGradient: ["x1", "x2", "y1", "y2"],
    radialGradient: ["cx", "cy", "r", "fr", "fx", "fy"],
    svg: ["viewBox"],
    line: ["x1", "y1", "x2", "y2"],
    rect: ["x", "y", "width", "height"],
    circle: ["cx", "cy", "r"],
    ellipse: ["cx", "cy", "rx", "ry"],
    polygon: ["points"],
    polyline: ["points"],
    path: ["d"]
  };
  var UUID = (function () {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  });
  var viewBoxString = function viewBoxString(x, y, width, height, padding) {
    if (padding == null) {
      padding = 0;
    }
    var scale = 1.0;
    var d = width / scale - width;
    var X = x - d - padding;
    var Y = y - d - padding;
    var W = width + d * 2 + padding * 2;
    var H = height + d * 2 + padding * 2;
    return [X, Y, W, H].join(" ");
  };
  var viewBoxString$1 = (function () {
    var numbers = coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments)));
    if (numbers.length === 2) {
      numbers.unshift(0, 0);
    }
    return numbers.length === 4 ? viewBoxString.apply(void 0, _toConsumableArray(numbers)) : undefined;
  });
  var RequiredAttributes = {
    svg: {
      version: "1.1",
      xmlns: NS
    },
    style: {
      type: "text/css"
    }
  };
  var Initializers = {
    text: textArguments,
    svg: svgArguments
  };
  var polyString = function polyString() {
    for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
      numbers[_key] = arguments[_key];
    }
    return Array.from(Array(Math.floor(numbers.length / 2))).map(function (_, i) {
      return "".concat(numbers[i * 2 + 0], ",").concat(numbers[i * 2 + 1]);
    }).join(" ");
  };
  var makeIDString = function makeIDString() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return args.filter(function (a) {
      return _typeof(a) === Keys.string || a instanceof String;
    }).shift() || UUID();
  };
  var ArgsShuffle = {
    svg: function svg() {
      return [viewBoxString$1.apply(void 0, arguments)].filter(function (a) {
        return a !== undefined;
      });
    },
    text: function text() {
      return coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments))).slice(0, 2);
    },
    line: function line() {
      return coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments)));
    },
    polyline: function polyline() {
      return [polyString.apply(void 0, _toConsumableArray(coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments)))))];
    },
    polygon: function polygon() {
      return [polyString.apply(void 0, _toConsumableArray(coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments)))))];
    },
    mask: function mask() {
      return [makeIDString.apply(void 0, arguments)];
    },
    clipPath: function clipPath() {
      return [makeIDString.apply(void 0, arguments)];
    },
    symbol: function symbol() {
      return [makeIDString.apply(void 0, arguments)];
    },
    marker: function marker() {
      return [makeIDString.apply(void 0, arguments)];
    }
  };
  var passthrough = function passthrough() {
    for (var _len3 = arguments.length, a = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      a[_key3] = arguments[_key3];
    }
    return a;
  };
  var Arguments = function Arguments(primitiveName, element) {
    var nodeName = element.nodeName;
    if (_typeof(RequiredAttributes[nodeName]) === Keys.object && RequiredAttributes[nodeName] !== null) {
      Object.keys(RequiredAttributes[nodeName]).forEach(function (key) {
        return element.setAttribute(key, RequiredAttributes[nodeName][key]);
      });
    }
    for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      args[_key4 - 2] = arguments[_key4];
    }
    if (Initializers[primitiveName] !== undefined) {
      Initializers[primitiveName].apply(Initializers, [element].concat(args));
    }
    var attrElem = attributes[primitiveName] !== undefined ? primitiveName : nodeName;
    var keys = attributes[attrElem];
    if (keys === undefined) {
      return element;
    }
    var func = ArgsShuffle[attrElem] || passthrough;
    func.apply(void 0, args).forEach(function (v, i) {
      if (keys[i] != null) {
        element.setAttribute(keys[i], v);
      }
    });
    return element;
  };
  Arguments.prepareCustomNodes = function (CustomNodes) {
    Object.keys(CustomNodes).filter(function (name) {
      return CustomNodes[name].attributes !== undefined;
    }).forEach(function (name) {
      attributes[name] = CustomNodes[name].attributes;
    });
    Object.keys(CustomNodes).filter(function (name) {
      return CustomNodes[name].arguments !== undefined;
    }).forEach(function (name) {
      ArgsShuffle[name] = CustomNodes[name].arguments;
    });
    Object.keys(CustomNodes).filter(function (name) {
      return CustomNodes[name].init !== undefined;
    }).forEach(function (name) {
      Initializers[name] = CustomNodes[name].init;
    });
  };
  var vec = function vec(a, d) {
    return [Math.cos(a) * d, Math.sin(a) * d];
  };
  var arcPath = function arcPath(x, y, radius, startAngle, endAngle) {
    var includeCenter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    if (endAngle == null) {
      return "";
    }
    var start = vec(startAngle, radius);
    var end = vec(endAngle, radius);
    var arcVec = [end[0] - start[0], end[1] - start[1]];
    var py = start[0] * end[1] - start[1] * end[0];
    var px = start[0] * end[0] + start[1] * end[1];
    var arcdir = Math.atan2(py, px) > 0 ? 0 : 1;
    var d = includeCenter ? "M ".concat(x, ",").concat(y, " l ").concat(start[0], ",").concat(start[1], " ") : "M ".concat(x + start[0], ",").concat(y + start[1], " ");
    d += ["a ", radius, radius, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
    if (includeCenter) {
      d += " Z";
    }
    return d;
  };
  var arcArguments = function arcArguments(a, b, c, d, e) {
    return [arcPath(a, b, c, d, e, false)];
  };
  var Arc = {
    name: "arc",
    nodeName: "path",
    attributes: ["d"],
    arguments: arcArguments,
    methods: {
      setArc: function setArc(el) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return el.setAttribute("d", arcArguments.apply(void 0, args));
      }
    }
  };
  var wedgeArguments = function wedgeArguments(a, b, c, d, e) {
    return [arcPath(a, b, c, d, e, true)];
  };
  var Wedge = {
    name: "wedge",
    nodeName: "path",
    arguments: wedgeArguments,
    attributes: ["d"],
    methods: {
      setArc: function setArc(el) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return el.setAttribute("d", wedgeArguments.apply(void 0, args));
      }
    }
  };
  var COUNT = 128;
  var parabolaArguments = function parabolaArguments(x, y, width, height) {
    return Array.from(Array(COUNT + 1)).map(function (_, i) {
      return (i - COUNT) / COUNT * 2 + 1;
    }).map(function (i) {
      return [x + (i + 1) * width * 0.5, y + Math.pow(i, 2) * height];
    });
  };
  var parabolaPathString = function parabolaPathString(x, y, width, height) {
    return [parabolaArguments(x, y, width, height).map(function (a) {
      return "".concat(a[0], ",").concat(a[1]);
    }).join(" ")];
  };
  var Parabola = {
    name: "parabola",
    nodeName: "polyline",
    attributes: ["points"],
    arguments: parabolaPathString
  };
  var regularPolygonArguments = function regularPolygonArguments(cX, cY, radius, sides) {
    var halfwedge = 2 * Math.PI / sides * 0.5;
    var r = Math.cos(halfwedge) * radius;
    return Array.from(Array(sides)).map(function (el, i) {
      var a = -2 * Math.PI * i / sides + halfwedge;
      var x = cX + r * Math.sin(a);
      var y = cY + r * Math.cos(a);
      return [x, y];
    });
  };
  var polygonPathString = function polygonPathString(cX, cY, radius, sides) {
    return [regularPolygonArguments(cX, cY, radius, sides).map(function (a) {
      return "".concat(a[0], ",").concat(a[1]);
    }).join(" ")];
  };
  var RegularPolygon = {
    name: "regularPolygon",
    nodeName: "polygon",
    attributes: ["points"],
    arguments: polygonPathString
  };
  var roundRectArguments = function roundRectArguments(x, y, width, height) {
    var cornerRadius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    if (cornerRadius > width / 2) {
      cornerRadius = width / 2;
    }
    if (cornerRadius > height / 2) {
      cornerRadius = height / 2;
    }
    var w = width - cornerRadius * 2;
    var h = height - cornerRadius * 2;
    var s = "A".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1");
    return ["M".concat(x + (width - w) / 2, ",").concat(y), "h".concat(w), s, "".concat(x + width, ",").concat(y + (height - h) / 2), "v".concat(h), s, "".concat(x + width - cornerRadius, ",").concat(y + height), "h".concat(-w), s, "".concat(x, ",").concat(y + height - cornerRadius), "v".concat(-h), s, "".concat(x + cornerRadius, ",").concat(y)].join(" ");
  };
  var RoundRect = {
    name: "roundRect",
    nodeName: "path",
    attributes: ["d"],
    arguments: roundRectArguments
  };
  var arrowArguments = function arrowArguments() {
    var flat = flatten.apply(void 0, arguments);
    var endpoints = [];
    if (_typeof(flat[0]) === Keys.number) {
      endpoints = flat;
    }
    if (_typeof(flat[0]) === Keys.object) {
      if (_typeof(flat[0].x) === Keys.number) {
        endpoints = flat.map(function (p) {
          return [p[0], p[1]];
        }).reduce(function (a, b) {
          return a.concat(b);
        }, []);
      }
      if (_typeof(flat[0][0]) === Keys.number) {
        endpoints = flat.reduce(function (a, b) {
          return a.concat(b);
        }, []);
      }
    }
    if (!endpoints.length && shape.endpoints != null) {
      endpoints = shape.endpoints;
    }
    if (!endpoints.length) {
      return "";
    }
    shape.endpoints = endpoints;
    var o = shape.options;
    var tailPt = [endpoints[0], endpoints[1]];
    var headPt = [endpoints[2], endpoints[3]];
    var vector = [headPt[0] - tailPt[0], headPt[1] - tailPt[1]];
    var midpoint = [tailPt[0] + vector[0] / 2, tailPt[1] + vector[1] / 2];
    var len = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
    var minLength = (o.tail.visible ? (1 + o.tail.padding) * o.tail.height * 2.5 : 0) + (o.head.visible ? (1 + o.head.padding) * o.head.height * 2.5 : 0);
    if (len < minLength) {
      var minVec = len === 0 ? [minLength, 0] : [vector[0] / len * minLength, vector[1] / len * minLength];
      tailPt = [midpoint[0] - minVec[0] * 0.5, midpoint[1] - minVec[1] * 0.5];
      headPt = [midpoint[0] + minVec[0] * 0.5, midpoint[1] + minVec[1] * 0.5];
      vector = [headPt[0] - tailPt[0], headPt[1] - tailPt[1]];
    }
    var perpendicular = [vector[1], -vector[0]];
    var bezPoint = [midpoint[0] + perpendicular[0] * o.curve, midpoint[1] + perpendicular[1] * o.curve];
    var bezTail = [bezPoint[0] - tailPt[0], bezPoint[1] - tailPt[1]];
    var bezHead = [bezPoint[0] - headPt[0], bezPoint[1] - headPt[1]];
    var bezTailLen = Math.sqrt(Math.pow(bezTail[0], 2) + Math.pow(bezTail[1], 2));
    var bezHeadLen = Math.sqrt(Math.pow(bezHead[0], 2) + Math.pow(bezHead[1], 2));
    var bezTailNorm = bezTailLen === 0 ? bezTail : [bezTail[0] / bezTailLen, bezTail[1] / bezTailLen];
    var bezHeadNorm = bezTailLen === 0 ? bezHead : [bezHead[0] / bezHeadLen, bezHead[1] / bezHeadLen];
    var tailVector = [-bezTailNorm[0], -bezTailNorm[1]];
    var headVector = [-bezHeadNorm[0], -bezHeadNorm[1]];
    var tailNormal = [tailVector[1], -tailVector[0]];
    var headNormal = [headVector[1], -headVector[0]];
    var tailArc = [tailPt[0] + bezTailNorm[0] * o.tail.height * ((o.tail.visible ? 1 : 0) + o.tail.padding), tailPt[1] + bezTailNorm[1] * o.tail.height * ((o.tail.visible ? 1 : 0) + o.tail.padding)];
    var headArc = [headPt[0] + bezHeadNorm[0] * o.head.height * ((o.head.visible ? 1 : 0) + o.head.padding), headPt[1] + bezHeadNorm[1] * o.head.height * ((o.head.visible ? 1 : 0) + o.head.padding)];
    vector = [headArc[0] - tailArc[0], headArc[1] - tailArc[1]];
    perpendicular = [vector[1], -vector[0]];
    midpoint = [tailArc[0] + vector[0] / 2, tailArc[1] + vector[1] / 2];
    bezPoint = [midpoint[0] + perpendicular[0] * o.curve, midpoint[1] + perpendicular[1] * o.curve];
    var tailControl = [tailArc[0] + (bezPoint[0] - tailArc[0]) * o.pinch, tailArc[1] + (bezPoint[1] - tailArc[1]) * o.pinch];
    var headControl = [headArc[0] + (bezPoint[0] - headArc[0]) * o.pinch, headArc[1] + (bezPoint[1] - headArc[1]) * o.pinch];
    var tailPolyPts = [[tailArc[0] + tailNormal[0] * -o.tail.width, tailArc[1] + tailNormal[1] * -o.tail.width], [tailArc[0] + tailNormal[0] * o.tail.width, tailArc[1] + tailNormal[1] * o.tail.width], [tailArc[0] + tailVector[0] * o.tail.height, tailArc[1] + tailVector[1] * o.tail.height]];
    var headPolyPts = [[headArc[0] + headNormal[0] * -o.head.width, headArc[1] + headNormal[1] * -o.head.width], [headArc[0] + headNormal[0] * o.head.width, headArc[1] + headNormal[1] * o.head.width], [headArc[0] + headVector[0] * o.head.height, headArc[1] + headVector[1] * o.head.height]];
    return ["M".concat(tailArc[0], ",").concat(tailArc[1], "C").concat(tailControl[0], ",").concat(tailControl[1], ",").concat(headControl[0], ",").concat(headControl[1], ",").concat(headArc[0], ",").concat(headArc[1])];
  };
  var setArrowPoints = function setArrowPoints(el) {
    var children = Array.from(el.childNodes);
    var path = children.filter(function (node) {
      return node.nodeName === "path";
    }).shift();
    var polys = ["svg-arrow-head", "svg-arrow-tail"].map(function (c) {
      return children.filter(function (n) {
        return n.getAttribute("class") === c;
      }).shift();
    });
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    path.setAttribute("d", buildArrow.apply(void 0, args));
    if (o.head.visible) {
      polys[0].removeAttribute("display");
      setPoints(polys[0], headPolyPts);
    } else {
      polys[0].setAttribute("display", "none");
    }
    if (o.tail.visible) {
      polys[1].removeAttribute("display");
      setPoints(polys[1], tailPolyPts);
    } else {
      polys[1].setAttribute("display", "none");
    }
    return el;
  };
  var head = function head(element, options) {
    if (_typeof(options) === Keys.object) {
      Object.assign(element.options.head, options);
      if (options.visible === undefined) {
        element.options.head.visible = true;
      }
    } else if (_typeof(options) === Keys["boolean"]) {
      element.options.head.visible = options;
    } else if (options == null) {
      element.options.head.visible = true;
    }
    setArrowPoints(element);
    return element;
  };
  var tail = function tail(element, options) {
    if (_typeof(options) === Keys.object) {
      Object.assign(element.options.tail, options);
      if (options.visible === undefined) {
        element.options.tail.visible = true;
      }
      element.options.tail.visible = true;
    } else if (_typeof(options) === Keys["boolean"]) {
      element.options.tail.visible = options;
    } else if (options == null) {
      element.options.tail.visible = true;
    }
    setArrowPoints(element);
    return element;
  };
  var curve = function curve(element, amount) {
    element.options.curve = amount;
    setArrowPoints(element);
    return element;
  };
  var pinch = function pinch(element, amount) {
    element.options.pinch = amount;
    setArrowPoints(element);
    return element;
  };
  var methods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setArrowPoints: setArrowPoints,
    head: head,
    tail: tail,
    curve: curve,
    pinch: pinch
  });
  var init = function init(element) {
    console.log("running arrow init");
  };
  var Arrow = {
    name: "arrow",
    nodeName: "g",
    attributes: ["d"],
    arguments: arrowArguments,
    methods: methods,
    init: init
  };
  var add = function add(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
  };
  var sub = function sub(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
  };
  var scale = function scale(a, s) {
    return [a[0] * s, a[1] * s];
  };
  var curveArguments = function curveArguments() {
    var params = coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments)));
    var endpoints = params.slice(0, 4);
    if (!endpoints.length) {
      return [""];
    }
    var o_curve = params[4] || 0;
    var o_pinch = params[5] || 0.5;
    var tailPt = [endpoints[0], endpoints[1]];
    var headPt = [endpoints[2], endpoints[3]];
    var vector = sub(headPt, tailPt);
    var midpoint = add(tailPt, scale(vector, 0.5));
    var perpendicular = [vector[1], -vector[0]];
    var bezPoint = add(midpoint, scale(perpendicular, o_curve));
    var tailControl = add(tailPt, scale(sub(bezPoint, tailPt), o_pinch));
    var headControl = add(headPt, scale(sub(bezPoint, headPt), o_pinch));
    return ["M".concat(tailPt[0], ",").concat(tailPt[1], "C").concat(tailControl[0], ",").concat(tailControl[1], " ").concat(headControl[0], ",").concat(headControl[1], " ").concat(headPt[0], ",").concat(headPt[1])];
  };
  var getEndpoints = function getEndpoints(element) {
    var d = element.getAttribute("d");
    if (d == null || d === "") {
      return [];
    }
    return [d.slice(d.indexOf("M") + 1, d.indexOf("C")).split(","), d.split(" ").pop().split(",")].map(function (p) {
      return p.map(function (n) {
        return parseFloat(n);
      });
    });
  };
  var arc = function arc(element, amount) {
    element.setAttribute("d", curveArguments.apply(void 0, _toConsumableArray(getEndpoints(element)).concat([amount])));
    return element;
  };
  var methods$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    arc: arc
  });
  var Curve = {
    name: "curve",
    nodeName: "path",
    attributes: ["d"],
    arguments: curveArguments,
    methods: methods$1
  };
  var nodes = {};
  [Arc, Wedge, Parabola, RegularPolygon, RoundRect, Curve, Arrow].forEach(function (custom) {
    nodes[custom.name] = custom;
    delete nodes[custom.name].name;
  });
  var Nodes = {
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
  var customPrimitives = Object.keys(nodes);
  var headerStuff = [Nodes.h, Nodes.p, Nodes.i];
  var drawingShapes = [Nodes.g, Nodes.v, Nodes.t, customPrimitives];
  var folders = {
    svg: [Nodes.s, Nodes.d].concat(headerStuff).concat(drawingShapes),
    g: drawingShapes,
    text: [Nodes.cT],
    linearGradient: [Nodes.cG],
    radialGradient: [Nodes.cG],
    defs: headerStuff,
    filter: [Nodes.cF],
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
  Debug.log(nodesAndChildren);
  var elemAttr = {};
  var pres = [attributes.presentation];
  var presText = pres.concat([attributes.text]);
  var eff = [attributes.effects];
  var grad = [attributes.gradient];
  Nodes.cF.forEach(function (key) {
    elemAttr[key] = eff;
  });
  Nodes.cG.forEach(function (key) {
    elemAttr[key] = grad;
  });
  Nodes.cT.forEach(function (key) {
    elemAttr[key] = presText;
  });
  Nodes.v.forEach(function (key) {
    elemAttr[key] = pres.concat(attributes[key] !== undefined ? [attributes[key]] : []);
  });
  elemAttr.svg = pres;
  elemAttr.defs = pres;
  elemAttr.filter = eff;
  elemAttr.marker = [attributes.marker];
  elemAttr.clipPath = [attributes.clipPath];
  elemAttr.pattern = [attributes.pattern];
  elemAttr.g = pres;
  elemAttr.text = presText;
  elemAttr.linearGradient = grad.concat([attributes.linearGradient]);
  elemAttr.radialGradient = grad.concat([attributes.radialGradient]);
  Object.keys(elemAttr).forEach(function (key) {
    elemAttr[key] = elemAttr[key].reduce(function (a, b) {
      return a.concat(b);
    }, []);
  });
  Debug.log(elemAttr);
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
  var pointsString = function pointsString() {
    for (var _len = arguments.length, points = new Array(_len), _key = 0; _key < _len; _key++) {
      points[_key] = arguments[_key];
    }
    return Array.from(Array(Math.floor(points.length / 2))).map(function (_, i) {
      return "".concat(points[i * 2], ",").concat(points[i * 2 + 1]);
    }).join(" ");
  };
  var polys = {
    setPoints: {
      attr: attributes.polyline.slice(0, 1),
      f: function f() {
        return pointsString.apply(void 0, _toConsumableArray(coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments)))));
      }
    }
  };
  var AttributeSetters = {
    line: {
      setPoints: {
        attrs: attributes.line,
        f: function f(a, b, c, d) {
          return coordinates.apply(void 0, _toConsumableArray(flatten(a, b, c, d))).slice(0, 4);
        }
      }
    },
    polyline: polys,
    polygon: polys,
    circle: {
      setRadius: {
        attr: "r",
        f: function f(r) {
          return r;
        }
      },
      radius: {
        attr: "r",
        f: function f(r) {
          return r;
        }
      },
      setCenter: {
        attrs: attributes.circle.slice(0, 2),
        f: function f(a, b) {
          return coordinates.apply(void 0, _toConsumableArray(flatten(a, b))).slice(0, 2);
        }
      }
    }
  };
  var methods$2 = {};
  Object.keys(AttributeSetters).forEach(function (nodeName) {
    methods$2[nodeName] = {};
    Object.keys(AttributeSetters[nodeName]).filter(function (method) {
      return AttributeSetters[nodeName][method].attr !== undefined;
    }).forEach(function (method) {
      methods$2[nodeName][method] = function (el) {
        var _AttributeSetters$nod;
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        return el.setAttribute(AttributeSetters[nodeName][method].attr, (_AttributeSetters$nod = AttributeSetters[nodeName][method]).f.apply(_AttributeSetters$nod, args));
      };
    });
    Object.keys(AttributeSetters[nodeName]).filter(function (method) {
      return AttributeSetters[nodeName][method].attrs !== undefined;
    }).forEach(function (method) {
      methods$2[nodeName][method] = function (el) {
        var _AttributeSetters$nod2;
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }
        return (_AttributeSetters$nod2 = AttributeSetters[nodeName][method]).f.apply(_AttributeSetters$nod2, args).forEach(function (v, i) {
          return el.setAttribute(AttributeSetters[nodeName][method].attrs[i], v);
        });
      };
    });
  });
  var getAttr = function getAttr(element) {
    var t = element.getAttribute(Keys.transform);
    return t == null || t === "" ? undefined : t;
  };
  var methods$3 = {
    clearTransform: function clearTransform(el) {
      el.removeAttribute(Keys.transform);
      return el;
    }
  };
  ["translate", "rotate", "scale", "matrix"].forEach(function (key) {
    methods$3[key] = function (element) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return element.setAttribute(Keys.transform, [getAttr(element), "".concat(key, "(").concat(args.join(" "), ")")].filter(function (a) {
        return a !== undefined;
      }).join(" "));
    };
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
  var methods$4 = {};
  ["clip-path", "mask", "symbol", "marker-end", "marker-mid", "marker-start"].forEach(function (attr) {
    methods$4[Case.toCamel(attr)] = function (element, parent) {
      return element.setAttribute(attr, findIdURL(parent));
    };
  });
  var DOM = {
    removeChildren: function removeChildren(element) {
      while (element.lastChild) {
        element.removeChild(element.lastChild);
      }
    },
    appendTo: function appendTo(element, parent) {
      if (parent != null) {
        parent.appendChild(element);
      }
    }
  };
  var cdata = function cdata(textContent) {
    return new win.DOMParser().parseFromString("<root></root>", "text/xml").createCDATASection("".concat(textContent));
  };
  var size = function size(element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var viewBox = viewBoxString$1.apply(void 0, args);
    if (viewBox) {
      element.setAttribute("viewBox", viewBox);
    }
    return element;
  };
  var getViewBox = function getViewBox(svg) {
    var vb = svg.getAttribute("viewBox");
    return vb == null ? undefined : vb.split(" ").map(function (n) {
      return parseFloat(n);
    });
  };
  var getFrame = function getFrame(element) {
    var viewBox = getViewBox(element);
    if (viewBox !== undefined) {
      return viewBox;
    }
    if (_typeof(element.getBoundingClientRect) === Keys["function"]) {
      var rr = element.getBoundingClientRect();
      return [rr.x, rr.y, rr.width, rr.height];
    }
    return [];
  };
  var bgClass = "svg-background-rectangle";
  var background = function background(element, color) {
    var backRect = Array.from(element.childNodes).filter(function (child) {
      return child.getAttribute(Keys["class"]) === bgClass;
    }).shift();
    if (backRect == null) {
      backRect = this.Constructor.apply(this, ["rect"].concat(_toConsumableArray(getFrame(element))));
      backRect.setAttribute(Keys["class"], bgClass);
      element.insertBefore(backRect, element.firstChild);
    }
    backRect.setAttribute("fill", color);
    return backRect;
  };
  var findStyleSheet = function findStyleSheet(element) {
    var styles = element.getElementsByTagName(Keys.style);
    return styles.length === 0 ? undefined : styles[0];
  };
  var _stylesheet = function stylesheet(element, textContent) {
    var styleSection = findStyleSheet(element);
    if (styleSection == null) {
      styleSection = this.Constructor(Keys.style);
      element.insertBefore(styleSection, element.firstChild);
    }
    styleSection.textContent = "";
    styleSection.appendChild(cdata(textContent));
    return styleSection;
  };
  var clear = function clear(element) {
    Array.from(element.attributes).filter(function (a) {
      return a !== "xmlns";
    }).forEach(function (attr) {
      return element.removeAttribute(attr.name);
    });
    DOM.removeChildren(element);
  };
  var assignSVG = function assignSVG(target, source) {
    if (source == null) {
      return;
    }
    clear(target);
    Array.from(source.childNodes).forEach(function (node) {
      source.removeChild(node);
      target.appendChild(node);
    });
    Array.from(source.attributes).forEach(function (attr) {
      return target.setAttribute(attr.name, attr.value);
    });
  };
  var done = function done(svg, callback) {
    if (callback != null) {
      callback(svg);
    }
    return svg;
  };
  var _load = function load(input, callback) {
    if (_typeof(input) === Keys.string || input instanceof String) {
      var xml = new win.DOMParser().parseFromString(input, "text/xml");
      var parserErrors = xml.getElementsByTagName("parsererror");
      return parserErrors.length === 0 ? done(xml.documentElement, callback) : parserErrors[0];
    }
    if (input.childNodes != null) {
      return done(input, callback);
    }
  };
  var svg = {
    clear: clear,
    size: size,
    background: background,
    getWidth: function getWidth(el) {
      return getFrame(el)[2];
    },
    getHeight: function getHeight(el) {
      return getFrame(el)[3];
    },
    stylesheet: function stylesheet(text) {
      return _stylesheet.call(this, text);
    },
    save: function save(el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return options.output === "svg" ? el : new win.XMLSerializer().serializeToString(el);
    },
    load: function load(el, data, callback) {
      return assignSVG(el, _load(data, callback));
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
  var getD = function getD(el) {
    var attr = el.getAttribute("d");
    return attr == null ? "" : attr;
  };
  var appendPathItem = function appendPathItem(el, command) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    var params = flatten.apply(void 0, args).join(" ");
    el.setAttribute("d", "".concat(getD(el)).concat(command).concat(params));
    return el;
  };
  var methods$5 = {};
  methods$5.clear = function (el) {
    el.removeAttribute("d");
    return el;
  };
  Object.keys(pathCommands).forEach(function (key) {
    methods$5[pathCommands[key]] = function (el) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return appendPathItem.apply(void 0, [el, key].concat(args));
    };
  });
  var style = {
    setTextContent: function setTextContent(el, text) {
      el.textContent = "";
      el.appendChild(cdata(text));
      return el;
    }
  };
  var makeExist = function makeExist(obj, key) {
    if (obj[key] === undefined) {
      obj[key] = {};
    }
  };
  var nodeMethods = {
    svg: svg,
    path: methods$5,
    style: style
  };
  var applyMethodsToNode = function applyMethodsToNode(methods, node) {
    makeExist(nodeMethods, node);
    Object.keys(methods).forEach(function (method) {
      nodeMethods[node][method] = methods[method];
    });
  };
  var applyMethodsToGroup = function applyMethodsToGroup(methods, groups) {
    return groups.forEach(function (category) {
      return category.forEach(function (node) {
        return applyMethodsToNode(methods, node);
      });
    });
  };
  var t_v_g = [Nodes.t, Nodes.v, Nodes.g];
  var most = t_v_g.concat([Nodes.s, Nodes.p, Nodes.i, Nodes.h, Nodes.d]);
  applyMethodsToGroup(methods$3, t_v_g.concat([Nodes.s]));
  applyMethodsToGroup(methods$4, t_v_g);
  applyMethodsToGroup(DOM, most);
  applyMethodsToGroup({
    setAttributes: function setAttributes(el, attrs) {
      return Object.keys(attrs).forEach(function (key) {
        return el.setAttribute(Case.toKebab(key), attrs[key]);
      });
    }
  }, most);
  Object.keys(methods$2).forEach(function (nodeName) {
    return applyMethodsToNode(methods$2[nodeName], nodeName);
  });
  var methods$6 = {};
  Object.keys(nodeMethods).forEach(function (nodeName) {
    makeExist(methods$6, nodeName);
    Object.keys(nodeMethods[nodeName]).filter(function (method) {
      return methods$6[nodeName][method] === undefined;
    }).forEach(function (method) {
      methods$6[nodeName][method] = function (el) {
        var _nodeMethods$nodeName;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return (_nodeMethods$nodeName = nodeMethods[nodeName][method]).call.apply(_nodeMethods$nodeName, [methods$6, el].concat(args)) || el;
      };
    });
  });
  Debug.log(methods$6);
  var makeExist$1 = function makeExist(obj, key) {
    if (obj[key] === undefined) {
      obj[key] = {};
    }
  };
  var AttrNodeFunc = {};
  Object.keys(elemAttr).forEach(function (nodeName) {
    makeExist$1(AttrNodeFunc, nodeName);
    elemAttr[nodeName].forEach(function (attribute) {
      AttrNodeFunc[nodeName][Case.toCamel(attribute)] = function (element) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        element.setAttribute.apply(element, [attribute].concat(args));
        return element;
      };
    });
  });
  Object.keys(nodesAndChildren).forEach(function (nodeName) {
    makeExist$1(AttrNodeFunc, nodeName);
    nodesAndChildren[nodeName].forEach(function (childNode) {
      AttrNodeFunc[nodeName][childNode] = function (element) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        var el = Methods.Constructor.apply(Methods, [childNode].concat(args));
        element.appendChild(el);
        return el;
      };
    });
  });
  Object.keys(methods$6).forEach(function (nodeName) {
    makeExist$1(AttrNodeFunc, nodeName);
    Object.assign(AttrNodeFunc[nodeName], methods$6[nodeName]);
  });
  var Methods = function Methods(nodeName, element) {
    methods$6.Constructor = Methods.Constructor;
    if (_typeof(AttrNodeFunc[nodeName]) === Keys.object && AttrNodeFunc[nodeName] !== null) {
      Object.keys(AttrNodeFunc[nodeName]).filter(function (attr) {
        return element[attr] == null;
      }).forEach(function (attr) {
        Object.defineProperty(element, attr, {
          value: function value() {
            var _AttrNodeFunc$nodeNam;
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            return (_AttrNodeFunc$nodeNam = AttrNodeFunc[nodeName])[attr].apply(_AttrNodeFunc$nodeNam, [element].concat(args));
          }
        });
      });
    }
    return element;
  };
  Debug.log(AttrNodeFunc);
  Methods.prepareCustomNodes = function (CustomNodes) {
    return Object.keys(CustomNodes).forEach(function (node) {
      makeExist$1(AttrNodeFunc, node);
      Object.assign(AttrNodeFunc[node], AttrNodeFunc[CustomNodes[node].nodeName], CustomNodes[node].methods);
    });
  };
  var nodeNames = {};
  Object.keys(Nodes).forEach(function (key) {
    return Nodes[key].forEach(function (nodeName) {
      nodeNames[nodeName] = nodeName;
    });
  });
  Object.keys(nodes).forEach(function (key) {
    nodeNames[key] = nodes[key].nodeName;
  });
  Arguments.prepareCustomNodes(nodes);
  Methods.prepareCustomNodes(nodes);
  Debug.log(nodeNames);
  var constructor = function constructor(nodeName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return Methods(nodeName, Arguments.apply(void 0, [nodeName, win.document.createElementNS(NS, nodeNames[nodeName])].concat(args)));
  };
  Methods.Constructor = constructor;
  var elements = {};
  Object.keys(Nodes).forEach(function (key) {
    return Nodes[key].forEach(function (nodeName) {
      elements[nodeName] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return constructor.apply(void 0, [nodeName].concat(args));
      };
    });
  });
  Debug.log(elements);
  var convertToViewBox = function convertToViewBox(svg, x, y) {
    var pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    var svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    return [svgPoint.x, svgPoint.y];
  };
  var categories = {
    move: ["mousemove", "touchmove"],
    press: ["mousedown", "touchstart"],
    release: ["mouseup", "touchend"]
  };
  var handlerNames = Object.values(categories).reduce(function (a, b) {
    return a.concat(b);
  }, []);
  var off = function off(element, handlers) {
    return handlerNames.forEach(function (handlerName) {
      handlers[handlerName].forEach(function (func) {
        return element.removeEventListener(handlerName, func);
      });
      handlers[handlerName] = [];
    });
  };
  var defGet = function defGet(obj, prop, value) {
    return Object.defineProperty(obj, prop, {
      get: function get() {
        return value;
      },
      enumerable: true
    });
  };
  var TouchEvents = function TouchEvents(element) {
    var startPoint = [];
    var handlers = [];
    Object.keys(categories).forEach(function (key) {
      categories[key].forEach(function (handler) {
        handlers[handler] = [];
      });
    });
    var removeHandler = function removeHandler(category) {
      categories[category].forEach(function (handlerName) {
        handlers[handlerName].forEach(function (func) {
          return element.removeEventListener(handlerName, func);
        });
      });
    };
    var categoryUpdate = {
      press: function press() {},
      release: function release() {},
      move: function move(e, viewPoint) {
        if (e.buttons > 0 && startPoint[0] === undefined) {
          startPoint = viewPoint;
        } else if (e.buttons === 0 && startPoint[0] !== undefined) {
          startPoint = [];
        }
        ["startX", "startY"].forEach(function (prop, i) {
          return defGet(e, prop, startPoint[i]);
        });
      }
    };
    Object.keys(categories).forEach(function (category) {
      var propName = "on" + Case.capitalized(category);
      Object.defineProperty(element, propName, {
        set: function set(handler) {
          return handler == null ? removeHandler(category) : categories[category].forEach(function (handlerName) {
            var handlerFunc = function handlerFunc(e) {
              var pointer = e.touches != null ? e.touches[0] : e;
              var viewPoint = convertToViewBox(element, pointer.clientX, pointer.clientY);
              ["x", "y"].forEach(function (prop, i) {
                return defGet(e, prop, viewPoint[i]);
              });
              categoryUpdate[category](e, viewPoint);
              handler(e);
            };
            handlers[handlerName].push(handlerFunc);
            element.addEventListener(handlerName, handlerFunc);
          });
        },
        enumerable: true
      });
    });
    Object.defineProperty(element, "off", {
      value: function value() {
        return off(element, handlers);
      }
    });
  };
  var Animation = function Animation(element) {
    var start;
    var handlers = {};
    var frame = 0;
    var removeHandlers = function removeHandlers() {
      Object.keys(handlers).forEach(function (uuid) {
        return delete handlers[uuid];
      });
      start = undefined;
      frame = 0;
    };
    Object.defineProperty(element, "play", {
      set: function set(handler) {
        removeHandlers();
        if (handler == null) {
          return;
        }
        var uuid = UUID();
        var handlerFunc = function handlerFunc(e) {
          if (!start) {
            start = e;
          }
          var progress = (e - start) * 0.001;
          handler({
            time: progress,
            frame: frame
          });
          frame += 1;
          if (handlers[uuid]) {
            window.requestAnimationFrame(handlers[uuid]);
          }
        };
        handlers[uuid] = handlerFunc;
        window.requestAnimationFrame(handlers[uuid]);
      },
      enumerable: true
    });
    Object.defineProperty(element, "stop", {
      value: removeHandlers,
      enumerable: true
    });
  };
  var distance = function distance(a, b) {
    return [0, 1].map(function (i) {
      return a[i] - b[i];
    }).map(function (e) {
      return Math.pow(e, 2);
    }).reduce(function (a, b) {
      return a + b;
    }, 0);
  };
  var controlPoint = function controlPoint(parent) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var position = [0, 0];
    var selected = false;
    var svg;
    var updateSVG = function updateSVG() {
      if (svg != null) {
        if (svg.parentNode == null) {
          parent.appendChild(svg);
        }
        svg.setAttribute("cx", position[0]);
        svg.setAttribute("cy", position[1]);
      }
    };
    var proxy = new Proxy(position, {
      set: function set(target, property, value, receiver) {
        target[property] = value;
        updateSVG();
        return true;
      }
    });
    var setPosition = function setPosition() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 0) {
        return;
      }
      var root = _typeof(args[0]);
      if (root === "number") {
        position[0] = args[0];
        position[1] = args[1];
        updateSVG();
      }
      if (root === "object") {
        if (typeof args[0][0] === "number") {
          position[0] = args[0][0];
          position[1] = args[0][1];
          updateSVG();
        } else if (typeof args[0].x === "number") {
          position[0] = args[0].x;
          position[1] = args[0].y;
          updateSVG();
        }
      }
      if (typeof position.delegate === "function") {
        position.delegate.apply(position.pointsContainer, [proxy, position.pointsContainer]);
      }
    };
    setPosition(options.position);
    var updatePosition = function updatePosition(input) {
      return input;
    };
    var onMouseMove = function onMouseMove(mouse) {
      if (selected) {
        setPosition(updatePosition(mouse));
      }
    };
    var onMouseUp = function onMouseUp() {
      selected = false;
    };
    position.delegate = undefined;
    position.setPosition = setPosition;
    position.onMouseMove = onMouseMove;
    position.onMouseUp = onMouseUp;
    position.distance = function (mouse) {
      return distance(mouse, position);
    };
    Object.defineProperty(position, "x", {
      get: function get() {
        return position[0];
      },
      set: function set(newValue) {
        position[0] = newValue;
      }
    });
    Object.defineProperty(position, "y", {
      get: function get() {
        return position[1];
      },
      set: function set(newValue) {
        position[1] = newValue;
      }
    });
    Object.defineProperty(position, "svg", {
      get: function get() {
        return svg;
      },
      set: function set(newSVG) {
        svg = newSVG;
      }
    });
    Object.defineProperty(position, "positionDidUpdate", {
      set: function set(method) {
        updatePosition = method;
      }
    });
    Object.defineProperty(position, "selected", {
      set: function set(value) {
        selected = value;
      }
    });
    Object.defineProperty(position, "remove", {
      value: function value() {
        if (svg != null) {
          svg.parentNode.removeChild(svg);
        }
      }
    });
    return proxy;
  };
  var controls = function controls(svg, number, options) {
    var selected;
    var delegate;
    var points = Array.from(Array(number)).map(function () {
      return controlPoint(svg, options);
    });
    points.forEach(function (pt, i) {
      if (_typeof(options) === "object" && typeof options.position === "function") {
        pt.setPosition(options.position(i));
      }
    });
    var protocol = function protocol(point) {
      if (typeof delegate === "function") {
        delegate.call(points, points, point);
      }
    };
    points.forEach(function (p) {
      p.delegate = protocol;
      p.pointsContainer = points;
    });
    var mousePressedHandler = function mousePressedHandler(mouse) {
      if (!(points.length > 0)) {
        return;
      }
      selected = points.map(function (p, i) {
        return {
          i: i,
          d: distance(p, [mouse.x, mouse.y])
        };
      }).sort(function (a, b) {
        return a.d - b.d;
      }).shift().i;
      points[selected].selected = true;
    };
    var mouseMovedHandler = function mouseMovedHandler(mouse) {
      points.forEach(function (p) {
        return p.onMouseMove(mouse);
      });
    };
    var mouseReleasedHandler = function mouseReleasedHandler() {
      points.forEach(function (p) {
        return p.onMouseUp();
      });
      selected = undefined;
    };
    svg.onPress = mousePressedHandler;
    svg.onMove = mouseMovedHandler;
    svg.onRelease = mouseReleasedHandler;
    Object.defineProperty(points, "selectedIndex", {
      get: function get() {
        return selected;
      }
    });
    Object.defineProperty(points, "selected", {
      get: function get() {
        return points[selected];
      }
    });
    Object.defineProperty(points, "add", {
      value: function value(opt) {
        points.push(controlPoint(svg, opt));
      }
    });
    points.removeAll = function () {
      while (points.length > 0) {
        points.pop().remove();
      }
    };
    points.onChange = function (func, runOnceAtStart) {
      if (typeof func === "function") {
        delegate = func;
        if (runOnceAtStart === true) {
          func.call(points, points, undefined);
        }
      }
      return points;
    };
    points.position = function (func) {
      if (typeof func === "function") {
        points.forEach(function (p, i) {
          return p.setPosition(func.call(points, i));
        });
      }
      return points;
    };
    points.svg = function (func) {
      if (typeof func === "function") {
        points.forEach(function (p, i) {
          p.svg = func.call(points, i);
        });
      }
      return points;
    };
    points.parent = function (parent) {
      if (parent != null && parent.appendChild != null) {
        points.forEach(function (p) {
          parent.appendChild(p.svg);
        });
      }
      return points;
    };
    return points;
  };
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
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var svg = constructor.apply(void 0, [Keys.svg].concat(args));
    TouchEvents(svg);
    Animation(svg);
    svg.controls = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return controls.call.apply(controls, [svg, svg].concat(args));
    };
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
