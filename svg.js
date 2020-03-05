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
    if (point.length > 1) {
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
    return arcPath(a, b, c, d, e, false);
  };
  var wedgeArguments = function wedgeArguments(a, b, c, d, e) {
    return arcPath(a, b, c, d, e, true);
  };
  var parabolaArguments = function parabolaArguments(x, y, width, height) {
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
    return iter.map(function (_, i) {
      return [ptsX[i], ptsY[i]];
    });
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
    return ["M".concat(x + (width - w) / 2), y, "h".concat(w), s, x + width, y + (height - h) / 2, "v".concat(h), s, x + width - cornerRadius, y + height, "h".concat(-w), s, x, y + height - cornerRadius, "v".concat(-h), s, x + cornerRadius, y].join(" ");
  };
  var nodes = {
    names: {
      arc: "path",
      wedge: "path",
      parabola: "polyline",
      regularPolygon: "polygon",
      roundRect: "path"
    },
    arguments: {
      arc: arcArguments,
      wedge: wedgeArguments,
      parabola: parabolaArguments,
      regularPolygon: regularPolygonArguments,
      roundRect: roundRectArguments
    }
  };
  var NodeNames = {
    childOfText: ["textPath", "tspan"],
    childOfGradients: ["stop"],
    childOfFilter: ["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"],
    text: ["text"],
    drawings: ["circle", "ellipse", "line", "path", "polygon", "polyline", "rect", "arc", "wedge", "parabola", "regularPolygon", "roundRect"],
    group: ["g"],
    nonVisible: ["marker", "symbol", "clipPath", "mask"],
    patterns: ["linearGradient", "radialGradient", "pattern"],
    cdata: ["cdata"],
    header: ["desc", "filter", "metadata", "style", "script", "title", "view"],
    defs: ["defs"],
    svg: ["svg"]
  };
  var nodeNames = {};
  var argsMethods = {};
  Object.keys(NodeNames).forEach(function (key) {
    return NodeNames[key].forEach(function (nodeName) {
      nodeNames[nodeName] = nodeName;
      argsMethods[nodeName] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return args;
      };
    });
  });
  Object.keys(nodes.names).forEach(function (customName) {
    nodeNames[customName] = nodes.names[customName];
    argsMethods[customName] = nodes.arguments[customName];
  });
  var constructor = function constructor(nodeName) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return Args.apply(void 0, [win.document.createElementNS(NS, nodeNames[nodeName])].concat(_toConsumableArray(argsMethods[nodeName].apply(argsMethods, args))));
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
  var cdata$1 = function cdata(textContent) {
    return new win.DOMParser().parseFromString("<root></root>", "text/xml").createCDATASection("".concat(textContent));
  };
  var removeChildren = function removeChildren(parent) {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
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
  var done = function done(svg, callback) {
    if (callback != null) {
      callback(svg);
    }
    return svg;
  };
  var goFetch = function goFetch(input, callback) {
    var promise = {};
    fetch(input).then(function (response) {
      return response.text();
    }).then(function (str) {
      return new win.DOMParser().parseFromString(str, "text/xml");
    }).then(function (svgData) {
      var allSVGs = svgData.getElementsByTagName("svg");
      if (allSVGs == null || allSVGs.length === 0) {
        throw new Error("error, valid XML found, but no SVG element");
      }
      promise.svg = done(allSVGs[0], callback);
    });
    return promise;
  };
  var load = function load(input, callback) {
    if (typeof input === "string" || input instanceof String) {
      if (input.slice(input.length - 4, input.length) === ".svg") {
        return goFetch(input, callback);
      }
      var xml = new win.DOMParser().parseFromString(input, "text/xml");
      var parserErrors = xml.getElementsByTagName("parsererror");
      return parserErrors.length === 0 ? done(xml.documentElement, callback) : parserErrors[0];
    }
    if (input instanceof win.Document) {
      return done(input);
    }
  };
  var downloadInBrowser = function downloadInBrowser(filename, contentsAsString) {
    var blob = new win.Blob([contentsAsString], {
      type: "text/plain"
    });
    var a = win.document.createElement("a");
    a.setAttribute("href", win.URL.createObjectURL(blob));
    a.setAttribute("download", filename);
    win.document.body.appendChild(a);
    a.click();
    win.document.body.removeChild(a);
  };
  var getPageCSS = function getPageCSS() {
    var css = [];
    for (var s = 0; s < win.document.styleSheets.length; s += 1) {
      var sheet = win.document.styleSheets[s];
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
  var SAVE_OPTIONS = function SAVE_OPTIONS() {
    return {
      output: "string",
      windowStyle: false,
      filename: "image.svg"
    };
  };
  var save = function save(svg, options) {
    if (typeof options === "string" || options instanceof String) {
      var filename = options;
      options = SAVE_OPTIONS();
      options.filename = filename;
    } else if (_typeof(options) !== "object" || options === null) {
      options = SAVE_OPTIONS();
    } else {
      var newOptions = SAVE_OPTIONS();
      Object.keys(options).forEach(function (key) {
        newOptions[key] = options[key];
      });
      options = newOptions;
    }
    if (options.windowStyle) {
      var styleContainer = win.document.createElementNS(NS, "style");
      styleContainer.setAttribute("type", "text/css");
      styleContainer.innerHTML = getPageCSS();
      svg.appendChild(styleContainer);
    }
    var source = new win.XMLSerializer().serializeToString(svg);
    var formattedString = vkXML(source);
    if (isBrowser && !isNode) {
      downloadInBrowser(options.filename, formattedString);
    }
    return options.output === "svg" ? svg : formattedString;
  };
  var BACKGROUND_CLASS = "svg-background-rectangle";
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
    var styleSection = findStyleSheet(element);
    if (styleSection == null) {
      styleSection = this.Prepare(this.Constructor("style"));
      element.insertBefore(styleSection, element.firstChild);
    }
    styleSection.textContent = "";
    styleSection.appendChild(cdata$1(textContent));
    return styleSection;
  };
  var replaceWithSVG = function replaceWithSVG(oldSVG, newSVG) {
    Array.from(oldSVG.attributes).forEach(function (attr) {
      return oldSVG.removeAttribute(attr.name);
    });
    removeChildren(oldSVG);
    Array.from(newSVG.childNodes).forEach(function (node) {
      newSVG.removeChild(node);
      oldSVG.appendChild(node);
    });
    Array.from(newSVG.attributes).forEach(function (attr) {
      return oldSVG.setAttribute(attr.name, attr.value);
    });
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
  methods.save = save;
  methods.load = function (element, data, callback) {
    return load(data, function (svg, error) {
      if (svg != null) {
        replaceWithSVG(element, svg);
      }
      if (callback != null) {
        callback(element, error);
      }
    });
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
    var params = flatten(args).join(",");
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
  var ATTR = "transform";
  var getTransform = function getTransform(element) {
    var trans = element.getAttribute(ATTR);
    return trans == null ? [] : trans.split(" ");
  };
  var transforms = {
    clearTransforms: function clearTransforms(el) {
      el.setAttribute(ATTR, "");
      return el;
    }
  };
  ["translate", "rotate", "scale"].forEach(function (key) {
    transforms[key] = function (element) {
      var transform = getTransform(element);
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      transform.push("".concat(key, "(").concat(args.join(", "), ")"));
      element.setAttribute(ATTR, transform.join(" "));
      return element;
    };
  });
  var setPoints = function setPoints(shape) {
    for (var _len = arguments.length, pointsArray = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      pointsArray[_key - 1] = arguments[_key];
    }
    var flat = flatten.apply(void 0, pointsArray);
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
    return shape;
  };
  var setLinePoints = function setLinePoints(shape) {
    for (var _len2 = arguments.length, pointsArray = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      pointsArray[_key2 - 1] = arguments[_key2];
    }
    var flat = flatten.apply(void 0, pointsArray);
    var points = [];
    if (typeof flat[0] === "number") {
      points = flat;
    }
    if (_typeof(flat[0]) === "object") {
      if (typeof flat[0].x === "number") {
        points = flat.map(function (p) {
          return [p[0], p[1]];
        }).reduce(function (a, b) {
          return a.concat(b);
        }, []);
      }
      if (typeof flat[0][0] === "number") {
        points = flat.reduce(function (a, b) {
          return a.concat(b);
        }, []);
      }
    }
    if (points[0] != null) {
      shape.setAttributeNS(null, "x1", points[0]);
    }
    if (points[1] != null) {
      shape.setAttributeNS(null, "y1", points[1]);
    }
    if (points[2] != null) {
      shape.setAttributeNS(null, "x2", points[2]);
    }
    if (points[3] != null) {
      shape.setAttributeNS(null, "y2", points[3]);
    }
    return shape;
  };
  var setCenter = function setCenter(shape) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    var flat = flatten.apply(void 0, args);
    if (typeof flat[0] === "number") {
      if (flat[0] != null) {
        shape.setAttributeNS(null, "cx", flat[0]);
      }
      if (flat[1] != null) {
        shape.setAttributeNS(null, "cy", flat[1]);
      }
    }
    if (typeof flat.x === "number") {
      if (flat.x != null) {
        shape.setAttributeNS(null, "cx", flat.x);
      }
      if (flat.y != null) {
        shape.setAttributeNS(null, "cy", flat.y);
      }
    }
    return shape;
  };
  var setRadius = function setRadius(el, r) {
    el.setAttributeNS(null, "r", r);
    return el;
  };
  var setTextContent = function setTextContent(el, text) {
    el.textContent = "";
    el.appendChild(cdata(text));
    return el;
  };
  var nodeMethods = {
    svg: methods,
    path: methods$1,
    line: {
      setPoints: setLinePoints
    },
    circle: {
      setCenter: setCenter,
      setRadius: setRadius,
      radius: setRadius
    },
    polygon: {
      setPoints: setPoints
    },
    polyline: {
      setPoints: setPoints
    },
    style: {
      setTextContent: setTextContent
    }
  };
  [NodeNames.text, NodeNames.drawings, NodeNames.group, NodeNames.svg].forEach(function (category) {
    return category.forEach(function (node) {
      if (nodeMethods[node] === undefined) {
        nodeMethods[node] = {};
      }
      Object.keys(transforms).forEach(function (trans) {
        nodeMethods[node][trans] = transforms[trans];
      });
    });
  });
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
