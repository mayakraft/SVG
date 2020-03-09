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

  var polyString = function polyString() {
    for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
      numbers[_key] = arguments[_key];
    }

    return Array.from(Array(Math.floor(numbers.length / 2))).map(function (_, i) {
      return "".concat(numbers[i * 2 + 0], ",").concat(numbers[i * 2 + 1]);
    }).join(" ");
  };

  var UUID = function UUID() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  };

  var makeIDString = function makeIDString() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return args.filter(function (a) {
      return _typeof(a) === Keys.string || a instanceof String;
    }).shift() || UUID();
  };

  var sortArgs = function sortArgs(nodeName) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    switch (nodeName) {
      case "svg":
        return [viewBoxString$1.apply(void 0, args)].filter(function (a) {
          return a !== undefined;
        });

      case "text":
        return coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, args))).slice(0, 2);

      case "line":
        return coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, args)));

      case "polyline":
      case "polygon":
        return [polyString.apply(void 0, _toConsumableArray(coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, args)))))];

      case "mask":
      case "clipPath":
      case "symbol":
      case "marker":
        return [makeIDString.apply(void 0, args)];
    }

    return args;
  };

  var Args = (function (element) {
    var nodeName = element.nodeName;

    if (_typeof(RequiredAttributes[nodeName]) === Keys.object && RequiredAttributes[nodeName] !== null) {
      Object.keys(RequiredAttributes[nodeName]).forEach(function (key) {
        return element.setAttribute(key, RequiredAttributes[nodeName][key]);
      });
    }

    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    switch (nodeName) {
      case "svg":
        svgArguments.apply(void 0, [element].concat(args));
        break;

      case "text":
        textArguments.apply(void 0, [element].concat(args));
        break;
    }

    var keys = attributes[nodeName];

    if (keys === undefined) {
      return element;
    }

    sortArgs.apply(void 0, [nodeName].concat(args)).forEach(function (v, i) {
      if (keys[i] != null) {
        element.setAttribute(keys[i], v);
      }
    });
    return element;
  });

  var nodes = {};

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
  var methods = {};
  Object.keys(AttributeSetters).forEach(function (nodeName) {
    methods[nodeName] = {};
    Object.keys(AttributeSetters[nodeName]).filter(function (method) {
      return AttributeSetters[nodeName][method].attr !== undefined;
    }).forEach(function (method) {
      methods[nodeName][method] = function (el) {
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
      methods[nodeName][method] = function (el) {
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

  var methods$1 = {
    clearTransform: function clearTransform(el) {
      el.removeAttribute(Keys.transform);
      return el;
    }
  };
  ["translate", "rotate", "scale", "matrix"].forEach(function (key) {
    methods$1[key] = function (element) {
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

  var methods$2 = {};
  ["clip-path", "mask", "symbol", "marker-end", "marker-mid", "marker-start"].forEach(function (attr) {
    methods$2[Case.toCamel(attr)] = function (element, parent) {
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

  var methods$3 = {};

  methods$3.clear = function (el) {
    el.removeAttribute("d");
    return el;
  };

  Object.keys(pathCommands).forEach(function (key) {
    methods$3[pathCommands[key]] = function (el) {
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
    path: methods$3,
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
  applyMethodsToGroup(methods$1, t_v_g.concat([Nodes.s]));
  applyMethodsToGroup(methods$2, t_v_g);
  applyMethodsToGroup(DOM, most);
  applyMethodsToGroup({
    setAttributes: function setAttributes(el, attrs) {
      return Object.keys(attrs).forEach(function (key) {
        return el.setAttribute(Case.toKebab(key), attrs[key]);
      });
    }
  }, most);
  Object.keys(methods).forEach(function (nodeName) {
    return applyMethodsToNode(methods[nodeName], nodeName);
  });
  var methods$4 = {};
  Object.keys(nodeMethods).forEach(function (nodeName) {
    makeExist(methods$4, nodeName);
    Object.keys(nodeMethods[nodeName]).filter(function (method) {
      return methods$4[nodeName][method] === undefined;
    }).forEach(function (method) {
      methods$4[nodeName][method] = function (el) {
        var _nodeMethods$nodeName;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return (_nodeMethods$nodeName = nodeMethods[nodeName][method]).call.apply(_nodeMethods$nodeName, [methods$4, el].concat(args)) || el;
      };
    });
  });
  Debug.log(methods$4);

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
  Object.keys(methods$4).forEach(function (nodeName) {
    makeExist$1(AttrNodeFunc, nodeName);
    Object.assign(AttrNodeFunc[nodeName], methods$4[nodeName]);
  });

  var Methods = function Methods(element) {
    methods$4.Constructor = Methods.Constructor;
    var nodeName = element.nodeName;

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

  var nodeNames = {};
  var argsMethods = {};
  Object.keys(Nodes).forEach(function (key) {
    return Nodes[key].forEach(function (nodeName) {
      nodeNames[nodeName] = nodeName;

      argsMethods[nodeName] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return args;
      };
    });
  });
  Object.keys(nodes).forEach(function (key) {
    nodeNames[key] = nodes[key].tagName;
    argsMethods[key] = nodes[key].arguments;
  });
  Debug.log(nodeNames);
  Debug.log(argsMethods);

  var constructor = function constructor(nodeName) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return Methods(Args.apply(void 0, [win.document.createElementNS(NS, nodeNames[nodeName])].concat(_toConsumableArray(argsMethods[nodeName].apply(argsMethods, args)))));
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
