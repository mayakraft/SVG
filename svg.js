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
  var vB = "viewBox";
  var getViewBox = function getViewBox(svg) {
    var vb = svg.getAttribute(vB);
    return vb == null ? undefined : vb.split(" ").map(function (n) {
      return parseFloat(n);
    });
  };
  var setViewBox = function setViewBox(svg, x, y, width, height, padding) {
    if (padding == null) {
      padding = 0;
    }
    var scale = 1.0;
    var d = width / scale - width;
    var X = x - d - padding;
    var Y = y - d - padding;
    var W = width + d * 2 + padding * 2;
    var H = height + d * 2 + padding * 2;
    svg.setAttributeNS(null, vB, [X, Y, W, H].join(" "));
  };
  var ElementConstructor = new win.DOMParser().parseFromString("<div />", "text/xml").documentElement.constructor;
  function svgArguments (element) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var argsNoNull = args.filter(function (a) {
      return a != null;
    });
    var numbers = argsNoNull.filter(function (arg) {
      return !isNaN(arg) && arg.constructor !== Array;
    });
    switch (numbers.length) {
      case 4:
        setViewBox(element, numbers[0], numbers[1], numbers[2], numbers[3]);
      case 2:
        setViewBox(element, 0, 0, numbers[0], numbers[1]);
    }
    var parent = argsNoNull.filter(function (arg) {
      return arg instanceof ElementConstructor;
    }).shift();
    if (parent != null && _typeof(parent.appendChild) === Keys["function"]) {
      parent.appendChild(element);
    }
    return element;
  }
  var keys$1 = ["x", "y"];
  var textArguments = (function (element, a, b, c, d) {
    var args = flatten(a, b, c, d);
    coordinates.apply(void 0, _toConsumableArray(args)).slice(0, 2).forEach(function (p, i) {
      return element.setAttribute(keys$1[i], p);
    });
    var text = args.filter(function (a) {
      return _typeof(a) === Keys.string;
    }).shift();
    if (text) {
      element.innerHTML = text;
    }
    return element;
  });
  var UUID = function UUID() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  };
  var nonVisibleArguments = (function (element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var idString = args.filter(function (a) {
      return _typeof(a) === Keys.string || a instanceof String;
    }).shift();
    element.setAttribute(Keys.id, idString != null ? idString : UUID());
    return element;
  });
  var attributes = {
    general: ["color", "color-interpolation", "cursor", "direction", "display", "fill", "fill-opacity", "fill-rule", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "image-rendering", "letter-spacing", "marker-end", "marker-mid", "marker-start", "markerHeight", "markerUnits", "markerWidth", "opacity", "overflow", "paint-order", "pointer-events", "preserveAspectRatio", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tabindex", "transform-origin", "user-select", "vector-effect", "visibility"],
    animation: ["accumulate", "additive", "attributeName", "begin", "by", "calcMode", "dur", "end", "from", "keyPoints", "keySplines", "keyTimes", "max", "min", "repeatCount", "repeatDur", "restart", "to", "values"],
    effects: ["azimuth", "baseFrequency", "bias", "color-interpolation-filters", "diffuseConstant", "divisor", "edgeMode", "elevation", "exponent", "filter", "filterRes", "filterUnits", "flood-color", "flood-opacity", "in", "in2", "intercept", "k1", "k2", "k3", "k4", "kernelMatrix", "lighting-color", "limitingConeAngle", "mode", "numOctaves", "operator", "order", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "primitiveUnits", "radius", "result", "seed", "specularConstant", "specularExponent", "stdDeviation", "stitchTiles", "surfaceScale", "targetX", "targetY", "type", "xChannelSelector", "yChannelSelector"],
    text: ["alignment-baseline", "baseline-shift", "dominant-baseline", "method", "overline-position", "overline-thickness", "spacing", "startOffset", "strikethrough-position", "strikethrough-thickness", "text-anchor", "text-decoration", "text-rendering", "textLength", "underline-position", "underline-thickness", "word-spacing", "writing-mode"],
    clipPath: ["id", "clip-rule"],
    marker: ["refX", "refY"],
    pattern: ["patternContentUnits", "patternTransform", "patternUnits"],
    gradient: ["gradientTransform", "gradientUnits", "spreadMethod"],
    linearGradient: ["x1", "x2", "y1", "y2"],
    radialGradient: ["cx", "cy", "r", "fr", "fx", "fy"],
    line: ["x1", "y1", "x2", "y2"],
    rect: ["x", "y", "width", "height"],
    circle: ["cx", "cy", "r"],
    ellipse: ["cx", "cy", "rx", "ry"],
    polygon: ["points"],
    polyline: ["points"],
    path: ["d"]
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
        return coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, args)));
      case "polyline":
      case "polygon":
        return [polyString.apply(void 0, _toConsumableArray(coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, args)))))];
    }
    return args;
  };
  var Args = (function (element) {
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
    var keys = attributes[nodeName];
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
  Debug.log(nodeNames);
  Debug.log(argsMethods);
  var constructor = function constructor(nodeName) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return Args.apply(void 0, [win.document.createElementNS(NS, nodeNames[nodeName])].concat(_toConsumableArray(argsMethods[nodeName].apply(argsMethods, args))));
  };
  var headerStuff = [Nodes.h, Nodes.p, Nodes.i];
  var drawingShapes = [Nodes.g, Nodes.v, Nodes.t];
  var nodeChildren = {
    svg: [Nodes.s, Nodes.d].concat(headerStuff).concat(drawingShapes),
    defs: headerStuff,
    filter: [Nodes.cF],
    marker: drawingShapes,
    symbol: drawingShapes,
    clipPath: drawingShapes,
    mask: drawingShapes,
    g: drawingShapes,
    text: [Nodes.cT],
    linearGradient: [Nodes.cG],
    radialGradient: [Nodes.cG]
  };
  Object.keys(nodeChildren).forEach(function (key) {
    nodeChildren[key] = nodeChildren[key].reduce(function (a, b) {
      return a.concat(b);
    }, []);
  });
  var elemAttr = {};
  var gen = [attributes.general];
  var genText = gen.concat([attributes.text]);
  var eff = [attributes.effects];
  var grad = [attributes.gradient];
  Nodes.cF.forEach(function (key) {
    elemAttr[key] = eff;
  });
  Nodes.cG.forEach(function (key) {
    elemAttr[key] = grad;
  });
  Nodes.cT.forEach(function (key) {
    elemAttr[key] = genText;
  });
  Nodes.v.forEach(function (key) {
    elemAttr[key] = gen.concat(attributes[key] !== undefined ? [attributes[key]] : []);
  });
  elemAttr.svg = gen;
  elemAttr.defs = gen;
  elemAttr.filter = eff;
  elemAttr.marker = [attributes.marker];
  elemAttr.clipPath = [attributes.clipPath];
  elemAttr.pattern = [attributes.pattern];
  elemAttr.g = gen;
  elemAttr.text = genText;
  elemAttr.linearGradient = grad.concat([attributes.linearGradient]);
  elemAttr.radialGradient = grad.concat([attributes.radialGradient]);
  Object.keys(elemAttr).forEach(function (key) {
    elemAttr[key] = elemAttr[key].reduce(function (a, b) {
      return a.concat(b);
    }, []);
  });
  Debug.log(elemAttr);
  var transforms = {
    clearTransform: function clearTransform(el) {
      el.removeAttribute(Keys.transform);
      return el;
    }
  };
  ["translate", "rotate", "scale", "matrix"].forEach(function (key) {
    transforms[key] = function (element) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      element.setAttribute(Keys.transform, [element.getAttribute(Keys.transform), "".concat(key, "(").concat(args.join(" "), ")")].filter(function (a) {
        return a != null;
      }).join(" "));
      return element;
    };
  });
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
      a: attributes.polyline.shift(),
      f: function f() {
        return pointsString.apply(void 0, _toConsumableArray(coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments)))));
      }
    }
  };
  var Setters = {
    line: {
      setPoints: {
        b: attributes.line,
        f: function f(a, b, c, d) {
          return coordinates.apply(void 0, _toConsumableArray(flatten(a, b, c, d))).slice(0, 4);
        }
      }
    },
    polyline: polys,
    polygon: polys,
    circle: {
      setRadius: {
        a: "r",
        f: function f(r) {
          return r;
        }
      },
      radius: {
        a: "r",
        f: function f(r) {
          return r;
        }
      },
      setCenter: {
        b: attributes.circle.slice(0, 2),
        f: function f(a, b) {
          return coordinates.apply(void 0, _toConsumableArray(flatten(a, b))).slice(0, 2);
        }
      }
    }
  };
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
  var cdata = function cdata(textContent) {
    return new win.DOMParser().parseFromString("<root></root>", "text/xml").createCDATASection("".concat(textContent));
  };
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
  var size = function size(element, a, b, c, d) {
    var numbers = coordinates.apply(void 0, _toConsumableArray(flatten(a, b, c, d)));
    switch (numbers.length) {
      case 2:
        setViewBox.apply(void 0, [element, 0, 0].concat(_toConsumableArray(numbers)));
        break;
      case 4:
        setViewBox.apply(void 0, [element].concat(_toConsumableArray(numbers)));
        break;
    }
    return element;
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
    return Array(4).fill(undefined);
  };
  var bgClass = "svg-background-rectangle";
  var background = function background(element, color) {
    var backRect = Array.from(element.childNodes).filter(function (child) {
      return child.getAttribute(Keys["class"]) === bgClass;
    }).shift();
    if (backRect == null) {
      backRect = this.Prepare(this.Constructor.apply(this, ["rect"].concat(_toConsumableArray(getFrame(element)))));
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
      styleSection = this.Prepare(this.Constructor(Keys.style));
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
      return options.output === "svg" ? el : vkXML(new win.XMLSerializer().serializeToString(el));
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
  var methods = {};
  methods.clear = function (el) {
    el.removeAttribute("d");
    return el;
  };
  Object.keys(pathCommands).forEach(function (key) {
    methods[pathCommands[key]] = function (el) {
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
  var CustomSetters = {
    svg: svg,
    path: methods,
    style: style
  };
  var makeExist = function makeExist(obj, key) {
    if (obj[key] === undefined) {
      obj[key] = {};
    }
  };
  var nodeMethods = {};
  Object.keys(CustomSetters).forEach(function (nodeName) {
    makeExist(nodeMethods, nodeName);
    Object.assign(nodeMethods[nodeName], CustomSetters[nodeName]);
  });
  [Nodes.t, Nodes.v, Nodes.g, Nodes.s].forEach(function (category) {
    return category.forEach(function (node) {
      makeExist(nodeMethods, node);
      Object.keys(transforms).forEach(function (trans) {
        nodeMethods[node][trans] = transforms[trans];
      });
    });
  });
  [Nodes.t, Nodes.v, Nodes.g, Nodes.s, Nodes.p, Nodes.i, Nodes.h, Nodes.d].forEach(function (category) {
    return category.forEach(function (node) {
      makeExist(nodeMethods, node);
      Object.keys(DOM).forEach(function (methodName) {
        nodeMethods[node][methodName] = function (el) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          DOM[methodName].apply(DOM, [el].concat(args));
          return el;
        };
      });
    });
  });
  var methods$1 = {};
  Object.keys(Setters).forEach(function (nodeName) {
    makeExist(methods$1, nodeName);
    Object.keys(Setters[nodeName]).forEach(function (method) {
      var s = Setters[nodeName][method];
      if (s.a !== undefined) {
        methods$1[nodeName][method] = function (el) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          el.setAttribute(s.a, s.f.apply(s, args));
          return el;
        };
      }
      if (s.b !== undefined) {
        methods$1[nodeName][method] = function (el) {
          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }
          s.f.apply(s, args).forEach(function (v, i) {
            return el.setAttribute(s.b[i], v);
          });
          return el;
        };
      }
    });
  });
  Object.keys(nodeMethods).forEach(function (nodeName) {
    makeExist(methods$1, nodeName);
    Object.keys(nodeMethods[nodeName]).filter(function (method) {
      return methods$1[nodeName][method] === undefined;
    }).forEach(function (method) {
      methods$1[nodeName][method] = function (el) {
        var _nodeMethods$nodeName;
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        return (_nodeMethods$nodeName = nodeMethods[nodeName][method]).call.apply(_nodeMethods$nodeName, [methods$1, el].concat(args));
      };
    });
  });
  Debug.log(methods$1);
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
    methods$1.Prepare = prepare;
    methods$1.Constructor = constructor;
    var nodeName = element.nodeName;
    if (_typeof(Attributes[nodeName]) === Keys.object && Attributes[nodeName] !== null) {
      Object.keys(Attributes[nodeName]).forEach(function (key) {
        return element.setAttribute(key, Attributes[nodeName][key]);
      });
    }
    if (_typeof(methods$1[nodeName]) === Keys.object && methods$1[nodeName] !== null) {
      Object.keys(methods$1[nodeName]).forEach(function (methodName) {
        Object.defineProperty(element, methodName, {
          value: function value() {
            var _AttributeMethods$nod;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return (_AttributeMethods$nod = methods$1[nodeName])[methodName].apply(_AttributeMethods$nod, [element].concat(args));
          }
        });
      });
    }
    if (_typeof(nodeChildren[nodeName]) === Keys.object && nodeChildren[nodeName] !== null) {
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
    if (_typeof(elemAttr[nodeName]) === Keys.object && elemAttr[nodeName] !== null) {
      elemAttr[nodeName].map(function (attribute) {
        return {
          a: attribute,
          c: toCamel(attribute)
        };
      }).filter(function (el) {
        return element[el.c] == null;
      }).forEach(function (el, i) {
        Object.defineProperty(element, el.c, {
          value: function value() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            element.setAttribute.apply(element, [el.a].concat(args));
            return element;
          }
        });
      });
    }
    return element;
  };
  var elements = {};
  Object.keys(Nodes).forEach(function (key) {
    return Nodes[key].forEach(function (nodeName) {
      elements[nodeName] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return prepare(constructor.apply(void 0, [nodeName].concat(args)));
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
    var svg = prepare(constructor.apply(void 0, [Keys.svg].concat(args)));
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
