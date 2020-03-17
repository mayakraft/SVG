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

  var Debug = {
    log: function log() {
      var _console;

      return (_console = console).log.apply(_console, arguments);
    }
  };

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

  var isIterable = function isIterable(obj) {
    return obj != null && _typeof(obj[Symbol.iterator]) === Keys["function"];
  };

  var flatten$1 = function flatten() {
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

  var coordinates$1 = (function () {
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

  var nodes = {};
  Object.assign(nodes);

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

  var SingleElements = {
    svg: ["viewBox"],
    line: ["x1", "y1", "x2", "y2"],
    rect: ["x", "y", "width", "height"],
    circle: ["cx", "cy", "r"],
    ellipse: ["cx", "cy", "rx", "ry"],
    polygon: ["points"],
    polyline: ["points"],
    path: ["d"],
    mask: ["id"],
    symbol: ["id"],
    clipPath: ["id", "clip-rule"],
    marker: ["id", "markerHeight", "markerUnits", "markerWidth", "orient", "refX", "refY"],
    linearGradient: ["x1", "x2", "y1", "y2"],
    radialGradient: ["cx", "cy", "r", "fr", "fx", "fy"],
    stop: ["offset", "stop-color", "stop-opacity"],
    pattern: ["patternContentUnits", "patternTransform", "patternUnits"]
  };

  var setRadius = function setRadius(el, r) {
    return el.setAttribute(SingleElements.circle[2], r);
  };

  var circle = {
    circle: {
      args: function args(a, b, c) {
        return coordinates$1.apply(void 0, _toConsumableArray(flatten$1(a, b, c))).slice(0, 3);
      },
      methods: {
        radius: setRadius,
        setRadius: setRadius,
        setCenter: function setCenter(el, a, b) {
          return coordinates$1.apply(void 0, _toConsumableArray(flatten$1(a, b))).slice(0, 2).forEach(function (value, i) {
            return el.setAttribute(SingleElements.circle[i], value);
          });
        }
      }
    }
  };

  var setRadii = function setRadii(el, rx, ry) {
    return [,, rx, ry].forEach(function (value, i) {
      return el.setAttribute(SingleElements.ellipse[i], value);
    });
  };

  var ellipse = {
    ellipse: {
      args: function args(a, b, c, d) {
        return coordinates$1.apply(void 0, _toConsumableArray(flatten$1(a, b, c, d))).slice(0, 4);
      },
      methods: {
        radius: setRadii,
        setRadius: setRadii,
        setCenter: function setCenter(el, a, b) {
          return coordinates$1.apply(void 0, _toConsumableArray(flatten$1(a, b))).slice(0, 2).forEach(function (value, i) {
            return el.setAttribute(SingleElements.ellipse[i], value);
          });
        }
      }
    }
  };

  var Args = function Args(a, b, c, d) {
    return coordinates$1.apply(void 0, _toConsumableArray(flatten$1(a, b, c, d))).slice(0, 4);
  };

  var line = {
    line: {
      args: Args,
      methods: {
        setPoints: function setPoints(element, a, b, c, d) {
          return Args(a, b, c, d).forEach(function (value, i) {
            return element.setAttribute(SingleElements.line[i], value);
          });
        }
      }
    }
  };

  var viewBoxValue = function viewBoxValue(x, y, width, height, padding) {
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

  function viewBox () {
    var numbers = coordinates$1.apply(void 0, _toConsumableArray(flatten$1(arguments)));

    if (numbers.length === 2) {
      numbers.unshift(0, 0);
    }

    return numbers.length === 4 ? viewBoxValue.apply(void 0, _toConsumableArray(numbers)) : undefined;
  }

  var vB = "viewBox";
  var setViewBox = function setViewBox(element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var viewBox$1 = args.length === 1 && typeof args[0] === "string" ? args[0] : viewBox.apply(void 0, args);

    if (viewBox$1) {
      element.setAttribute(vB, viewBox$1);
    }

    return element;
  };
  var getViewBox = function getViewBox(element) {
    var vb = element.getAttribute(vB);
    return vb == null ? undefined : vb.split(" ").map(function (n) {
      return parseFloat(n);
    });
  };

  var marker = {
    marker: {
      methods: {
        size: setViewBox,
        setViewBox: setViewBox
      }
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

    var params = flatten$1.apply(void 0, args).join(" ");
    el.setAttribute("d", "".concat(getD(el)).concat(command).concat(params));
    return el;
  };

  var markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
  var digitRegEx = /-?[0-9]*\.?\d+/g;

  var parsePathCommands = function parsePathCommands(str) {
    var results = [];
    var match;

    while ((match = markerRegEx.exec(str)) !== null) {
      results.push(match);
    }
    return results.map(function (match) {
      return {
        letter: str[match.index],
        index: match.index
      };
    }).reduceRight(function (all, cur) {
      var chunk = str.substring(cur.index, all.length ? all[all.length - 1].index : str.length);
      return all.concat([{
        letter: cur.letter,
        index: cur.index,
        chunk: chunk.length > 0 ? chunk.substr(1, chunk.length - 1) : chunk
      }]);
    }, []).reverse().map(function (command) {
      var values = command.chunk.match(digitRegEx);
      return {
        command: pathCommands[command.letter],
        letter: command.letter,
        values: values ? values.map(parseFloat) : []
      };
    });
  };

  var getCommands = function getCommands(element) {
    return parsePathCommands(getD(element));
  };

  var methods = {
    command: appendPathItem,
    clear: function clear(el) {
      el.removeAttribute("d");
      return el;
    },
    instructions: getCommands
  };
  Object.keys(pathCommands).forEach(function (key) {
    methods[pathCommands[key]] = function (el) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return appendPathItem.apply(void 0, [el, key].concat(args));
    };
  });
  var path = {
    path: {
      methods: methods
    }
  };

  var polyString = function polyString() {
    var _arguments = arguments;
    return Array.from(Array(Math.floor(arguments.length / 2))).map(function (_, i) {
      return "".concat(_arguments[i * 2 + 0], ",").concat(_arguments[i * 2 + 1]);
    }).join(" ");
  };

  var polys = function polys() {
    return [polyString.apply(void 0, _toConsumableArray(coordinates.apply(void 0, _toConsumableArray(flatten.apply(void 0, arguments)))))];
  };

  var polygon = {
    polygon: {
      args: polys
    }
  };

  var rect = {
    rect: {
      args: function args(a, b, c, d) {
        return coordinates$1.apply(void 0, _toConsumableArray(flatten$1(a, b, c, d))).slice(0, 4);
      }
    }
  };

  var cdata = function cdata(textContent) {
    return new win.DOMParser().parseFromString("<root></root>", "text/xml").createCDATASection("".concat(textContent));
  };

  var style = {
    style: {
      methods: {
        setTextContent: function setTextContent(el, text) {
          el.textContent = "";
          el.appendChild(cdata(text));
        }
      }
    }
  };

  var text = {
    text: {
      args: function args(a, b, c) {
        return coordinates$1.apply(void 0, _toConsumableArray(flatten$1(a, b, c))).slice(0, 2);
      },
      init: function init(element, a, b, c, d) {
        var text = [a, b, c, d].filter(function (a) {
          return _typeof(a) === Keys.string;
        }).shift();

        if (text) {
          element.innerHTML = text;
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
    },
    setAttributes: function setAttributes(element, attrs) {
      return Object.keys(attrs).forEach(function (key) {
        return element.setAttribute(Case.toKebab(key), attrs[key]);
      });
    }
  };

  var parse = function parse(string) {
    return new win.DOMParser().parseFromString(string, "text/xml");
  };

  var checkParseError = function checkParseError(xml) {
    var parserErrors = xml.getElementsByTagName("parsererror");

    if (parserErrors.length > 0) {
      throw new Error(parserErrors[0]);
    }

    return xml.documentElement;
  };
  var sync = function sync(input) {
    if (_typeof(input) === Keys.string || input instanceof String) {
      try {
        return checkParseError(parse(input));
      } catch (error) {
        return error;
      }
    }

    if (input.childNodes != null) {
      return input;
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

  var SAVE_OPTIONS = function SAVE_OPTIONS() {
    return {
      output: Keys.string,
      windowStyle: false,
      filename: "image.svg"
    };
  };

  var save = function save(svg, options) {
    options = Object.assign(SAVE_OPTIONS(), options);
    var source = new win.XMLSerializer().serializeToString(svg);
    var formattedString = vkXML(source);

    if (isBrowser && !isNode) {
      downloadInBrowser(options.filename, formattedString);
    }

    return options.output === "svg" ? svg : formattedString;
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

  var replaceSVG = function replaceSVG(target, source) {
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

  var methods$1 = {
    clear: clear,
    size: setViewBox,
    setViewBox: setViewBox,
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
    load: function load(el, data, callback) {
      return replaceSVG(el, sync(data));
    },
    save: save
  };

  var ElementConstructor = new window.DOMParser().parseFromString("<div />", "text/xml").documentElement.constructor;
  var svg = {
    svg: {
      args: function args() {
        return [viewBox.apply(void 0, arguments)].filter(function (a) {
          return a !== undefined;
        });
      },
      methods: methods$1,
      init: function init(element) {
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
    }
  };

  var UUID = (function () {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  });

  var makeIDString = function makeIDString() {
    return Array.from(arguments).filter(function (a) {
      return _typeof(a) === Keys.string || a instanceof String;
    }).shift() || UUID();
  };

  var maskTypes = {
    args: function args() {
      return [makeIDString.apply(void 0, arguments)];
    }
  };
  var maskTypes$1 = {
    mask: maskTypes,
    clipPath: maskTypes,
    symbol: maskTypes,
    marker: maskTypes
  };

  var Spec = Object.assign({}, circle, ellipse, line, marker, path, polygon, rect, style, text, svg, maskTypes$1);

  var ManyElements = {
    presentation: ["color", "color-interpolation", "cursor", "direction", "display", "fill", "fill-opacity", "fill-rule", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "image-rendering", "letter-spacing", "opacity", "overflow", "paint-order", "pointer-events", "preserveAspectRatio", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tabindex", "transform-origin", "user-select", "vector-effect", "visibility"],
    animation: ["accumulate", "additive", "attributeName", "begin", "by", "calcMode", "dur", "end", "from", "keyPoints", "keySplines", "keyTimes", "max", "min", "repeatCount", "repeatDur", "restart", "to", "values"],
    effects: ["azimuth", "baseFrequency", "bias", "color-interpolation-filters", "diffuseConstant", "divisor", "edgeMode", "elevation", "exponent", "filter", "filterRes", "filterUnits", "flood-color", "flood-opacity", "in", "in2", "intercept", "k1", "k2", "k3", "k4", "kernelMatrix", "lighting-color", "limitingConeAngle", "mode", "numOctaves", "operator", "order", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "primitiveUnits", "radius", "result", "seed", "specularConstant", "specularExponent", "stdDeviation", "stitchTiles", "surfaceScale", "targetX", "targetY", "type", "xChannelSelector", "yChannelSelector"],
    text: ["x", "y", "dx", "dy", "alignment-baseline", "baseline-shift", "dominant-baseline", "lengthAdjust", "method", "overline-position", "overline-thickness", "rotate", "spacing", "startOffset", "strikethrough-position", "strikethrough-thickness", "text-anchor", "text-decoration", "text-rendering", "textLength", "underline-position", "underline-thickness", "word-spacing", "writing-mode"],
    gradient: ["gradientTransform", "gradientUnits", "spreadMethod"]
  };

  Object.values(Nodes).reduce(function (a, b) {
    return a.concat(b);
  }, []).filter(function (nodeName) {
    return SingleElements[nodeName] === undefined;
  }).forEach(function (nodeName) {
    SingleElements[nodeName] = [];
  });
  [[["svg", "defs", "g"].concat(Nodes.v), ManyElements.presentation], [["filter"], ManyElements.effects], [["text"], ManyElements.text], [Nodes.cF, ManyElements.effects], [Nodes.cG, ManyElements.gradient], [Nodes.cT, ManyElements.text]].forEach(function (pair) {
    return pair[0].forEach(function (key) {
      SingleElements[key] = SingleElements[key].concat(pair[1]);
    });
  });
  Debug.log(SingleElements);

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

  Object.assign(Spec, nodes);
  Object.keys(Nodes).forEach(function (key) {
    return Nodes[key].filter(function (nodeName) {
      return Spec[nodeName] === undefined;
    }).forEach(function (nodeName) {
      Spec[nodeName] = {};
    });
  });

  var passthrough = function passthrough() {
    return Array.from(arguments);
  };

  Object.keys(Spec).forEach(function (key) {
    if (!Spec[key].nodeName) {
      Spec[key].nodeName = key;
    }

    if (!Spec[key].init) {
      Spec[key].init = passthrough;
    }

    if (!Spec[key].args) {
      Spec[key].args = passthrough;
    }

    if (!Spec[key].methods) {
      Spec[key].methods = {};
    }

    if (!Spec[key].attributes) {
      Spec[key].attributes = SingleElements[key] || [];
    }
  });
  Debug.log(Spec);

  var constructor = function constructor(nodeName) {
    var _Spec$nodeName, _Spec$nodeName2;

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var element = win.document.createElementNS(NS, Spec[nodeName].nodeName);
    RequiredAttributes(element, nodeName);

    (_Spec$nodeName = Spec[nodeName]).init.apply(_Spec$nodeName, [element].concat(args));

    (_Spec$nodeName2 = Spec[nodeName]).args.apply(_Spec$nodeName2, args).forEach(function (v, i) {
      if (Spec[nodeName].attributes[i] != null) {
        element.setAttribute(Spec[nodeName].attributes[i], v);
      }
    });

    Spec[nodeName].attributes.forEach(function (attribute) {
      Object.defineProperty(element, Case.toCamel(attribute), {
        value: function value() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          element.setAttribute.apply(element, [attribute].concat(args));
          return element;
        }
      });
    });
    Object.keys(Spec[nodeName].methods).forEach(function (methodName) {
      return Object.defineProperty(element, methodName, {
        value: function value() {
          var _Spec$nodeName$method;

          return (_Spec$nodeName$method = Spec[nodeName].methods)[methodName].apply(_Spec$nodeName$method, [element].concat(Array.prototype.slice.call(arguments)));
        }
      });
    });

    if (nodesAndChildren[nodeName]) {
      nodesAndChildren[nodeName].forEach(function (childNode) {
        Object.defineProperty(element, childNode, {
          value: function value() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            var childElement = constructor.apply(void 0, [childNode].concat(args));
            element.appendChild(childElement);
            return childElement;
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
