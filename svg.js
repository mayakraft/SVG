/* SVG (c) Robby Kraft, MIT License */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SVG = factory());
}(this, function () { 'use strict';

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

  var NS = "http://www.w3.org/2000/svg";

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
      var styleContainer = document.createElementNS(NS, "style");
      styleContainer.setAttribute("type", "text/css");
      styleContainer.innerHTML = getPageCSS();
      svg.appendChild(styleContainer);
    }

    var source = new XMLSerializer().serializeToString(svg);
    var formattedString = vkXML(source);

    if (window != null) {
      downloadInBrowser(filename, formattedString);
    }

    return formattedString;
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
          throw new Error("error, valid XML found, but no SVG element");
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

  var File = /*#__PURE__*/Object.freeze({
    __proto__: null,
    save: save,
    load: load
  });

  var bindSVGMethodsTo = function bindSVGMethodsTo(svg, environment) {
    Object.getOwnPropertyNames(svg).filter(function (p) {
      return typeof svg[p] === "function";
    }).forEach(function (name) {
      environment[name] = svg[name].bind(svg);
    });
    var forbidden = ["svg", "style", "setPoints", "setArc", "setEllipticalArc", "setBezier"];
    Object.keys(win.SVG).filter(function (key) {
      return environment[key] === undefined;
    }).filter(function (key) {
      return forbidden.indexOf(key) === -1;
    }).forEach(function (key) {
      environment[key] = win.SVG[key];
    });
    Object.defineProperty(win, "mousePressed", {
      set: function set(value) {
        svg.mousePressed = value;
      },
      get: function get() {
        return svg.mousePressed;
      }
    });
    Object.defineProperty(win, "mouseReleased", {
      set: function set(value) {
        svg.mouseReleased = value;
      },
      get: function get() {
        return svg.mouseReleased;
      }
    });
    Object.defineProperty(win, "mouseMoved", {
      set: function set(value) {
        svg.mouseMoved = value;
      },
      get: function get() {
        return svg.mouseMoved;
      }
    });
    Object.defineProperty(win, "scroll", {
      set: function set(value) {
        svg.scroll = value;
      },
      get: function get() {
        return svg.scroll;
      }
    });
    Object.defineProperty(win, "animate", {
      set: function set(value) {
        svg.animate = value;
      },
      get: function get() {
        return svg.animate;
      }
    });
    Object.defineProperty(win, "fps", {
      set: function set(value) {
        svg.fps = value;
      },
      get: function get() {
        return svg.fps;
      }
    });
  };

  var globalize = function globalize(svg) {
    var element = svg;

    if (element == null) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      element = win.SVG.apply(win, args);
    }

    bindSVGMethodsTo(element, win);
    return element;
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
    var handlers = {
      mousemove: [],
      touchmove: [],
      mousedown: [],
      touchstart: [],
      mouseup: [],
      touchend: [],
      scroll: []
    };

    var clear = function clear() {
      Object.keys(handlers).forEach(function (key) {
        return handlers[key].forEach(function (f) {
          return node.removeEventListener(key, f);
        });
      });
      Object.keys(handlers).forEach(function (key) {
        handlers[key] = [];
      });
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
        var mouseFunc = function mouseFunc(event) {
          return onMouseMove(handler, event);
        };

        var touchFunc = function touchFunc(event) {
          return onTouchMove(handler, event);
        };

        handlers.mousemove.push(mouseFunc);
        handlers.touchmove.push(mouseFunc);
        node.addEventListener("mousemove", mouseFunc);
        node.addEventListener("touchmove", touchFunc);
      },
      enumerable: true
    });
    Object.defineProperty(node, "mousePressed", {
      set: function set(handler) {
        var mouseFunc = function mouseFunc(event) {
          return onMouseDown(handler, event);
        };

        var touchFunc = function touchFunc(event) {
          return onTouchStart(handler, event);
        };

        handlers.mousedown.push(mouseFunc);
        handlers.touchstart.push(touchFunc);
        node.addEventListener("mousedown", mouseFunc);
        node.addEventListener("touchstart", touchFunc);
      },
      enumerable: true
    });
    Object.defineProperty(node, "mouseReleased", {
      set: function set(handler) {
        var mouseFunc = function mouseFunc(event) {
          return onEnd(handler, event);
        };

        var touchFunc = function touchFunc(event) {
          return onEnd(handler, event);
        };

        handlers.mouseup.push(mouseFunc);
        handlers.touchend.push(touchFunc);
        node.addEventListener("mouseup", mouseFunc);
        node.addEventListener("touchend", touchFunc);
      },
      enumerable: true
    });
    Object.defineProperty(node, "scroll", {
      set: function set(handler) {
        var scrollFunc = function scrollFunc(event) {
          return onScroll(handler, event);
        };

        handlers.mouseup.push(scrollFunc);
        node.addEventListener("scroll", scrollFunc);
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

      func = undefined;
    };

    var start = function start() {
      if (typeof func !== "function") {
        return;
      }

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
        position.delegate(proxy);
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

    var distance = function distance(mouse) {
      return [0, 1].map(function (i) {
        return mouse[i] - position[i];
      }).map(function (e) {
        return Math.pow(e, 2);
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
    };

    position.delegate = undefined;
    position.setPosition = setPosition;
    position.onMouseMove = onMouseMove;
    position.onMouseUp = onMouseUp;
    position.distance = distance;
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
        delegate.call(points, point);
      }
    };

    points.forEach(function (p) {
      p.delegate = protocol;
    });

    var mousePressedHandler = function mousePressedHandler(mouse) {
      if (!(points.length > 0)) {
        return;
      }

      selected = points.map(function (p, i) {
        return {
          i: i,
          d: p.distance(mouse)
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

    svg.mousePressed = mousePressedHandler;
    svg.mouseMoved = mouseMovedHandler;
    svg.mouseReleased = mouseReleasedHandler;
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

    points.changed = function (func, runOnceAtStart) {
      if (typeof func === "function") {
        delegate = func;

        if (runOnceAtStart === true) {
          delegate.call(points);
        }
      }

      return points;
    };

    points.position = function (func) {
      if (typeof func === "function") {
        points.forEach(function (p, i) {
          return p.setPosition(func(i));
        });
      }

      return points;
    };

    points.svg = function (func) {
      if (typeof func === "function") {
        points.forEach(function (p, i) {
          p.svg = func(i);
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
    return shape;
  };
  var setLinePoints = function setLinePoints(shape) {
    for (var _len3 = arguments.length, pointsArray = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      pointsArray[_key3 - 1] = arguments[_key3];
    }

    var flat = flatten_input.apply(void 0, pointsArray);
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
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    var flat = flatten_input.apply(void 0, args);

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
  var setArc = function setArc(shape, x, y, radius, startAngle, endAngle) {
    var includeCenter = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    if (endAngle == null) {
      return undefined;
    }

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
    return shape;
  };
  var setEllipticalArc = function setEllipticalArc(shape, x, y, rX, rY, startAngle, endAngle) {
    var includeCenter = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    if (endAngle == null) {
      return undefined;
    }

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
    return shape;
  };
  var setBezier = function setBezier(shape, fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
    if (toY == null) {
      return undefined;
    }

    var pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]].map(function (p) {
      return p.join(",");
    });
    var d = "M ".concat(pts[0], " C ").concat(pts[1], " ").concat(pts[2], " ").concat(pts[3]);
    shape.setAttributeNS(null, "d", d);
    return shape;
  };
  var setArrowPoints = function setArrowPoints(shape) {
    var children = Array.from(shape.childNodes);
    var path = children.filter(function (node) {
      return node.tagName === "path";
    }).shift();
    var polys = ["svg-arrow-head", "svg-arrow-tail"].map(function (c) {
      return children.filter(function (n) {
        return n.getAttribute("class") === c;
      }).shift();
    });

    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    var flat = flatten_input.apply(void 0, args);
    var endpoints = [];

    if (typeof flat[0] === "number") {
      endpoints = flat;
    }

    if (_typeof(flat[0]) === "object") {
      if (typeof flat[0].x === "number") {
        endpoints = flat.map(function (p) {
          return [p[0], p[1]];
        }).reduce(function (a, b) {
          return a.concat(b);
        }, []);
      }

      if (typeof flat[0][0] === "number") {
        endpoints = flat.reduce(function (a, b) {
          return a.concat(b);
        }, []);
      }
    }

    if (!endpoints.length && shape.endpoints != null) {
      endpoints = shape.endpoints;
    }

    if (!endpoints.length) {
      return shape;
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
    path.setAttribute("d", "M".concat(tailArc[0], ",").concat(tailArc[1], "C").concat(tailControl[0], ",").concat(tailControl[1], ",").concat(headControl[0], ",").concat(headControl[1], ",").concat(headArc[0], ",").concat(headArc[1]));

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

    return shape;
  };

  var geometryMods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setPoints: setPoints,
    setLinePoints: setLinePoints,
    setCenter: setCenter,
    setArc: setArc,
    setEllipticalArc: setEllipticalArc,
    setBezier: setBezier,
    setArrowPoints: setArrowPoints
  });

  var attributes = ["accumulate", "additive", "alignment-baseline", "allowReorder", "amplitude", "attributeName", "autoReverse", "azimuth", "BSection", "baseFrequency", "baseline-shift", "baseProfile", "bbox", "begin", "bias", "by", "CSection", "calcMode", "cap-height", "clip", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "contentScriptType", "contentStyleType", "cursor", "DSection", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominant-baseline", "dur", "ESection", "edgeMode", "elevation", "enable-background", "end", "exponent", "externalResourcesRequired", "FSection", "fill", "fill-opacity", "fill-rule", "filter", "filterRes", "filterUnits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "format", "from", "fr", "fx", "fy", "GSection", "g1", "g2", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "glyphRef", "gradientTransform", "gradientUnits", "HSection", "hanging", "href", "hreflang", "horiz-adv-x", "horiz-origin-x", "ISection", "ideographic", "image-rendering", "in", "in2", "intercept", "KSection", "k", "k1", "k2", "k3", "k4", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "LSection", "lang", "letter-spacing", "lighting-color", "limitingConeAngle", "local", "MSection", "marker-end", "marker-mid", "marker-start", "markerHeight", "markerUnits", "markerWidth", "mathematical", "max", "media", "method", "min", "mode", "NSection", "name", "numOctaves", "OSection", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overline-position", "overline-thickness", "PSection", "paint-order", "patternContentUnits", "patternTransform", "patternUnits", "ping", "pointer-events", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "RSection", "radius", "referrerPolicy", "refX", "refY", "rel", "rendering-intent", "repeatCount", "repeatDur", "requiredFeatures", "restart", "result", "SSection", "seed", "shape-rendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "string", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "surfaceScale", "TSection", "tabindex", "tableValues", "target", "targetX", "targetY", "text-anchor", "text-decoration", "text-rendering", "to", "transform-origin", "type", "USection", "u1", "u2", "underline-position", "underline-thickness", "unicode", "unicode-bidi", "unicode-range", "units-per-em", "VSection", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "values", "vector-effect", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "viewBox", "viewTarget", "visibility", "WSection", "widths", "word-spacing", "writing-mode", "XSection", "x-height", "xChannelSelector", "YSection", "yChannelSelector", "ZSection", "zoomAndPan"];

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
  var clearTransforms = function clearTransforms(element) {
    element.setAttribute("transform", "");
    return element;
  };

  var Transform = /*#__PURE__*/Object.freeze({
    __proto__: null,
    translate: translate,
    rotate: rotate,
    scale: scale,
    clearTransforms: clearTransforms
  });

  var is_iterable$1 = function is_iterable(obj) {
    return obj != null && typeof obj[Symbol.iterator] === "function";
  };

  var flatten_input$1 = function flatten_input() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    switch (args.length) {
      case undefined:
      case 0:
        return args;

      case 1:
        return is_iterable$1(args[0]) && typeof args[0] !== "string" ? flatten_input.apply(void 0, _toConsumableArray(args[0])) : [args[0]];

      default:
        return Array.from(args).map(function (a) {
          return is_iterable$1(a) ? _toConsumableArray(flatten_input(a)) : a;
        }).reduce(function (a, b) {
          return a.concat(b);
        }, []);
    }
  };

  var d = function d(element) {
    var attr = element.getAttribute("d");

    if (attr == null) {
      attr = "";
    }

    return attr;
  };

  var append = function append(element, command) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    var params = flatten_input$1(args).join(",");
    element.setAttribute("d", "".concat(d(element)).concat(command).concat(params));
    return element;
  };

  var command = function command(element, cmd) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    return append.apply(void 0, [element, cmd].concat(args));
  };
  var moveTo = function moveTo(element) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return append.apply(void 0, [element, "M"].concat(args));
  };
  var _moveTo = function _moveTo(element) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    return append.apply(void 0, [element, "m"].concat(args));
  };
  var lineTo = function lineTo(element) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    return append.apply(void 0, [element, "L"].concat(args));
  };
  var _lineTo = function _lineTo(element) {
    for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    return append.apply(void 0, [element, "l"].concat(args));
  };
  var verticalLineTo = function verticalLineTo(element, y) {
    return append(element, "V", y);
  };
  var _verticalLineTo = function _verticalLineTo(element, y) {
    return append(element, "v", y);
  };
  var horizontalLineTo = function horizontalLineTo(element, x) {
    return append(element, "H", x);
  };
  var _horizontalLineTo = function _horizontalLineTo(element, x) {
    return append(element, "h", x);
  };
  var ellipseTo = function ellipseTo(element) {
    for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
      args[_key8 - 1] = arguments[_key8];
    }

    return append.apply(void 0, [element, "A"].concat(args));
  };
  var _ellipseTo = function _ellipseTo(element) {
    for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }

    return append.apply(void 0, [element, "a"].concat(args));
  };
  var curveTo = function curveTo(element) {
    for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
      args[_key10 - 1] = arguments[_key10];
    }

    return append.apply(void 0, [element, "C"].concat(args));
  };
  var _curveTo = function _curveTo(element) {
    for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
      args[_key11 - 1] = arguments[_key11];
    }

    return append.apply(void 0, [element, "c"].concat(args));
  };
  var smoothCurveTo = function smoothCurveTo(element) {
    for (var _len12 = arguments.length, args = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
      args[_key12 - 1] = arguments[_key12];
    }

    return append.apply(void 0, [element, "S"].concat(args));
  };
  var _smoothCurveTo = function _smoothCurveTo(element) {
    for (var _len13 = arguments.length, args = new Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
      args[_key13 - 1] = arguments[_key13];
    }

    return append.apply(void 0, [element, "s"].concat(args));
  };
  var quadCurveTo = function quadCurveTo(element) {
    for (var _len14 = arguments.length, args = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
      args[_key14 - 1] = arguments[_key14];
    }

    return append.apply(void 0, [element, "Q"].concat(args));
  };
  var _quadCurveTo = function _quadCurveTo(element) {
    for (var _len15 = arguments.length, args = new Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
      args[_key15 - 1] = arguments[_key15];
    }

    return append.apply(void 0, [element, "q"].concat(args));
  };
  var smoothQuadCurveTo = function smoothQuadCurveTo(element) {
    for (var _len16 = arguments.length, args = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
      args[_key16 - 1] = arguments[_key16];
    }

    return append.apply(void 0, [element, "T"].concat(args));
  };
  var _smoothQuadCurveTo = function _smoothQuadCurveTo(element) {
    for (var _len17 = arguments.length, args = new Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
      args[_key17 - 1] = arguments[_key17];
    }

    return append.apply(void 0, [element, "t"].concat(args));
  };
  var close = function close(element) {
    return append(element, "Z");
  };
  var clear = function clear(element) {
    element.setAttribute("d", "");
    return element;
  };

  var Path = /*#__PURE__*/Object.freeze({
    __proto__: null,
    command: command,
    moveTo: moveTo,
    _moveTo: _moveTo,
    lineTo: lineTo,
    _lineTo: _lineTo,
    verticalLineTo: verticalLineTo,
    _verticalLineTo: _verticalLineTo,
    horizontalLineTo: horizontalLineTo,
    _horizontalLineTo: _horizontalLineTo,
    ellipseTo: ellipseTo,
    _ellipseTo: _ellipseTo,
    curveTo: curveTo,
    _curveTo: _curveTo,
    smoothCurveTo: smoothCurveTo,
    _smoothCurveTo: _smoothCurveTo,
    quadCurveTo: quadCurveTo,
    _quadCurveTo: _quadCurveTo,
    smoothQuadCurveTo: smoothQuadCurveTo,
    _smoothQuadCurveTo: _smoothQuadCurveTo,
    close: close,
    clear: clear
  });

  var attachStyleMethods = function attachStyleMethods(element) {
    element.appendTo = function (arg) {
      return appendTo(element, arg);
    };
  };
  var attachAppendableMethods = function attachAppendableMethods(element, methods) {
    Object.keys(methods).filter(function (key) {
      return element[key] === undefined;
    }).forEach(function (key) {
      element[key] = function () {
        var g = methods[key].apply(methods, arguments);
        element.appendChild(g);
        return g;
      };
    });
  };
  var attachArrowMethods = function attachArrowMethods(element) {
    element.head = function (options) {
      if (_typeof(options) === "object") {
        Object.assign(element.options.head, options);

        if (options.visible === undefined) {
          element.options.head.visible = true;
        }
      } else if (typeof options === "boolean") {
        element.options.head.visible = options;
      } else if (options == null) {
        element.options.head.visible = true;
      }

      setArrowPoints(element);
      return element;
    };

    element.tail = function (options) {
      if (_typeof(options) === "object") {
        Object.assign(element.options.tail, options);

        if (options.visible === undefined) {
          element.options.tail.visible = true;
        }

        element.options.tail.visible = true;
      } else if (typeof options === "boolean") {
        element.options.tail.visible = options;
      } else if (options == null) {
        element.options.tail.visible = true;
      }

      setArrowPoints(element);
      return element;
    };

    element.curve = function (amount) {
      element.options.curve = amount;
      setArrowPoints(element);
      return element;
    };

    element.pinch = function (amount) {
      element.options.pinch = amount;
      setArrowPoints(element);
      return element;
    };
  };
  var attachPathMethods = function attachPathMethods(element) {
    Object.keys(Path).forEach(function (key) {
      element[key] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return Path[key].apply(Path, [element].concat(args));
      };
    });
  };
  var attachDOMMethods = function attachDOMMethods(element) {
    Object.keys(DOM).filter(function (key) {
      return element[key] === undefined;
    }).forEach(function (key) {
      element[key] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return DOM[key].apply(DOM, [element].concat(args));
      };
    });
  };
  var attachTransformMethods = function attachTransformMethods(element) {
    Object.keys(Transform).forEach(function (key) {
      element[key] = function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return Transform[key].apply(Transform, [element].concat(args));
      };
    });
  };
  var attachViewBoxMethods = function attachViewBoxMethods(element) {
    Object.keys(ViewBox).filter(function (key) {
      return element[key] === undefined;
    }).forEach(function (key) {
      element[key] = function () {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
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

  var attachFunctionalStyleSetters = function attachFunctionalStyleSetters(element) {
    attributes.filter(function (key) {
      return element[toCamel(key)] === undefined;
    }).forEach(function (key) {
      element[toCamel(key)] = function () {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        element.setAttribute.apply(element, [key].concat(args));
        return element;
      };
    });
  };
  var attachClipMaskMakers = function attachClipMaskMakers(element, primitives) {
    if (element.clipPath === undefined) {
      element.clipPath = function () {
        var c = primitives.clipPath.apply(primitives, arguments);
        element.appendChild(c);
        return c;
      };
    }

    if (element.mask === undefined) {
      element.mask = function () {
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
    if (element.clipPath === undefined) {
      element.clipPath = function (parent) {
        var value = findIdURL(parent);

        if (value === undefined) {
          return element;
        }

        element.setAttribute("clip-path", value);
        return element;
      };
    }

    if (element.mask === undefined) {
      element.mask = function (parent) {
        var value = findIdURL(parent);

        if (value === undefined) {
          return element;
        }

        element.setAttribute("mask", value);
        return element;
      };
    }
  };

  var preparePrimitive = function preparePrimitive(element) {
    attachFunctionalStyleSetters(element);
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachClipMaskAttributes(element);

    if (element.tagName === "path") {
      attachPathMethods(element);
    }
  };

  var prepareArrow = function prepareArrow(element) {
    attachFunctionalStyleSetters(element);
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachClipMaskAttributes(element);
    attachArrowMethods(element);
  };

  var prepareText = function prepareText(element) {
    attachFunctionalStyleSetters(element);
    attachDOMMethods(element);
    attachClipMaskAttributes(element);
  };

  var prepareSVG = function prepareSVG(element, primitives) {
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachViewBoxMethods(element);
    attachClipMaskMakers(element, primitives);
    attachAppendableMethods(element, primitives);
  };

  var prepareGroup = function prepareGroup(element, primitives) {
    attachFunctionalStyleSetters(element);
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachClipMaskAttributes(element);
    attachAppendableMethods(element, primitives);
  };

  var prepareMaskClipPath = function prepareMaskClipPath(element, primitives) {
    attachFunctionalStyleSetters(element);
    attachDOMMethods(element);
    attachTransformMethods(element);
    attachClipMaskAttributes(element);
    attachAppendableMethods(element, primitives);
  };

  var prepareStyle = function prepareStyle(element) {
    attachStyleMethods(element);
  };

  var prepare = function prepare(type, element, primitiveList) {
    switch (type) {
      case "svg":
        prepareSVG(element, primitiveList);
        break;

      case "primitive":
        preparePrimitive(element);
        break;

      case "arrow":
        prepareArrow(element);
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

      case "style":
        prepareStyle(element);
        break;

      default:
        console.warn("prepare missing valid type (svg, group..");
        break;
    }
  };

  var line = function line() {
    var shape = win.document.createElementNS(NS, "line");

    for (var _len = arguments.length, endpoints = new Array(_len), _key = 0; _key < _len; _key++) {
      endpoints[_key] = arguments[_key];
    }

    setLinePoints.apply(void 0, [shape].concat(endpoints));
    prepare("primitive", shape);

    shape.setPoints = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return setLinePoints.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var circle = function circle(x, y, radius) {
    var shape = win.document.createElementNS(NS, "circle");
    setCenter(shape, x, y);

    if (radius != null) {
      shape.setAttributeNS(null, "r", radius);
    }

    prepare("primitive", shape);

    shape.setCenter = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return setCenter.apply(void 0, [shape].concat(args));
    };

    shape.setRadius = function (r) {
      shape.setAttributeNS(null, "r", r);
      return shape;
    };

    return shape;
  };
  var ellipse = function ellipse(x, y, rx, ry) {
    var shape = win.document.createElementNS(NS, "ellipse");

    if (x != null) {
      shape.setAttributeNS(null, "cx", x);
    }

    if (y != null) {
      shape.setAttributeNS(null, "cy", y);
    }

    if (rx != null) {
      shape.setAttributeNS(null, "rx", rx);
    }

    if (ry != null) {
      shape.setAttributeNS(null, "ry", ry);
    }

    prepare("primitive", shape);
    return shape;
  };
  var rect = function rect(x, y, width, height) {
    var shape = win.document.createElementNS(NS, "rect");

    if (x != null) {
      shape.setAttributeNS(null, "x", x);
    }

    if (y != null) {
      shape.setAttributeNS(null, "y", y);
    }

    if (width != null) {
      shape.setAttributeNS(null, "width", width);
    }

    if (height != null) {
      shape.setAttributeNS(null, "height", height);
    }

    prepare("primitive", shape);
    return shape;
  };
  var polygon = function polygon() {
    var shape = win.document.createElementNS(NS, "polygon");

    for (var _len4 = arguments.length, pointsArray = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      pointsArray[_key4] = arguments[_key4];
    }

    setPoints.apply(void 0, [shape].concat(pointsArray));
    prepare("primitive", shape);

    shape.setPoints = function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return setPoints.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var polyline = function polyline() {
    var shape = win.document.createElementNS(NS, "polyline");

    for (var _len6 = arguments.length, pointsArray = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      pointsArray[_key6] = arguments[_key6];
    }

    setPoints.apply(void 0, [shape].concat(pointsArray));
    prepare("primitive", shape);

    shape.setPoints = function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return setPoints.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var path = function path(d) {
    var shape = win.document.createElementNS(NS, "path");

    if (d != null) {
      shape.setAttributeNS(null, "d", d);
    }

    prepare("primitive", shape);
    return shape;
  };
  var bezier = function bezier(fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
    var shape = win.document.createElementNS(NS, "path");
    setBezier(shape, fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY);
    prepare("primitive", shape);

    shape.setBezier = function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return setBezier.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var text = function text(textString, x, y) {
    var shape = win.document.createElementNS(NS, "text");
    shape.innerHTML = textString;
    shape.setAttributeNS(null, "x", x);
    shape.setAttributeNS(null, "y", y);
    prepare("text", shape);
    return shape;
  };
  var arc = function arc(x, y, radius, angleA, angleB) {
    var shape = win.document.createElementNS(NS, "path");
    setArc(shape, x, y, radius, angleA, angleB, false);
    prepare("primitive", shape);

    shape.setArc = function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return setArc.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var wedge = function wedge(x, y, radius, angleA, angleB) {
    var shape = win.document.createElementNS(NS, "path");
    setArc(shape, x, y, radius, angleA, angleB, true);
    prepare("primitive", shape);

    shape.setArc = function () {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return setArc.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var arcEllipse = function arcEllipse(x, y, rx, ry, angleA, angleB) {
    var shape = win.document.createElementNS(NS, "path");
    setEllipticalArc(shape, x, y, rx, ry, angleA, angleB, false);
    prepare("primitive", shape);

    shape.setArc = function () {
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      return setEllipticalArc.apply(void 0, [shape].concat(args));
    };

    return shape;
  };
  var wedgeEllipse = function wedgeEllipse(x, y, rx, ry, angleA, angleB) {
    var shape = win.document.createElementNS(NS, "path");
    setEllipticalArc(shape, x, y, rx, ry, angleA, angleB, true);
    prepare("primitive", shape);

    shape.setArc = function () {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
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
  var roundRect = function roundRect(x, y, width, height) {
    var cornerRadius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    if (cornerRadius > width / 2) {
      cornerRadius = width / 2;
    }

    if (cornerRadius > height / 2) {
      cornerRadius = height / 2;
    }

    var w = width - cornerRadius * 2;
    var h = height - cornerRadius * 2;
    var pathString = "M".concat(x + (width - w) / 2, " ").concat(y, " h").concat(w, " A").concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(x + width, " ").concat(y + (height - h) / 2, " v").concat(h, " A").concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(x + width - cornerRadius, " ").concat(y + height, " h").concat(-w, " A").concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(x, " ").concat(y + height - cornerRadius, " v").concat(-h, " A").concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(x + cornerRadius, " ").concat(y, " ");
    return path(pathString);
  };
  var arrow = function arrow() {
    var shape = win.document.createElementNS(NS, "g");
    var tailPoly = win.document.createElementNS(NS, "polygon");
    var headPoly = win.document.createElementNS(NS, "polygon");
    var arrowPath = win.document.createElementNS(NS, "path");
    tailPoly.setAttributeNS(null, "class", "svg-arrow-tail");
    headPoly.setAttributeNS(null, "class", "svg-arrow-head");
    arrowPath.setAttributeNS(null, "class", "svg-arrow-path");
    tailPoly.setAttributeNS(null, "style", "stroke: none; pointer-events: none;");
    headPoly.setAttributeNS(null, "style", "stroke: none; pointer-events: none;");
    arrowPath.setAttributeNS(null, "style", "fill: none;");
    shape.appendChild(arrowPath);
    shape.appendChild(tailPoly);
    shape.appendChild(headPoly);
    shape.options = {
      head: {
        width: 0.5,
        height: 2,
        visible: false,
        padding: 0.0
      },
      tail: {
        width: 0.5,
        height: 2,
        visible: false,
        padding: 0.0
      },
      curve: 0.0,
      pinch: 0.618,
      endpoints: []
    };

    for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
      args[_key13] = arguments[_key13];
    }

    setArrowPoints.apply(void 0, [shape].concat(args));
    prepare("arrow", shape);

    shape.setPoints = function () {
      for (var _len14 = arguments.length, a = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        a[_key14] = arguments[_key14];
      }

      return setArrowPoints.apply(void 0, [shape].concat(a));
    };

    return shape;
  };

  var primitives = /*#__PURE__*/Object.freeze({
    __proto__: null,
    line: line,
    circle: circle,
    ellipse: ellipse,
    rect: rect,
    polygon: polygon,
    polyline: polyline,
    path: path,
    bezier: bezier,
    text: text,
    arc: arc,
    wedge: wedge,
    arcEllipse: arcEllipse,
    wedgeEllipse: wedgeEllipse,
    parabola: parabola,
    regularPolygon: regularPolygon,
    roundRect: roundRect,
    arrow: arrow
  });

  var constructorsSVG = {};
  var constructorsGroup = {};
  var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var randomString = function randomString() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return Array.from(Array(count)).map(function () {
      return Math.floor(Math.random() * abc.length);
    }).map(function (i) {
      return abc[i];
    }).reduce(function (a, b) {
      return "".concat(a).concat(b);
    }, "");
  };

  var generateUUID = function generateUUID() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    return prefix + randomString(count);
  };

  var svg = function svg() {
    var svgImage = win.document.createElementNS(NS, "svg");
    svgImage.setAttribute("version", "1.1");
    svgImage.setAttribute("xmlns", NS);
    prepare("svg", svgImage, constructorsSVG);
    return svgImage;
  };

  var group = function group() {
    var g = win.document.createElementNS(NS, "g");
    prepare("group", g, constructorsGroup);
    return g;
  };

  var defs = function defs() {
    var d = win.document.createElementNS(NS, "defs");
    prepare("defs", d, constructorsGroup);
    return d;
  };

  var cdata = function cdata(textContent) {
    var c = new win.DOMParser().parseFromString("<root></root>", "text/xml").createCDATASection("\n".concat(textContent, "\n"));
    return c;
  };

  var style = function style(textContent) {
    var s = win.document.createElementNS(NS, "style");
    s.setAttribute("type", "text/css");
    prepare("style", s);

    s.setTextContent = function (newText) {
      s.textContent = "";
      s.appendChild(cdata(newText));
    };

    s.appendChild(cdata(textContent));
    return s;
  };

  var clipPath = function clipPath() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : generateUUID(8, "clip-");
    var clip = win.document.createElementNS(NS, "clipPath");
    clip.setAttribute("id", id);
    prepare("clipPath", clip, constructorsGroup);
    return clip;
  };

  var mask = function mask() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : generateUUID(8, "mask-");
    var msk = win.document.createElementNS(NS, "mask");
    msk.setAttribute("id", id);
    prepare("mask", msk, constructorsGroup);
    return msk;
  };

  var createElement = function createElement(tagName) {
    return win.document.createElementNS(NS, tagName);
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
    style: style,
    createElement: createElement
  });

  var findWindowBooleanParam = function findWindowBooleanParam() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var objects = params.filter(function (arg) {
      return _typeof(arg) === "object";
    }).filter(function (o) {
      return typeof o.window === "boolean";
    });
    return objects.reduce(function (a, b) {
      return a.window || b.window;
    }, false);
  };

  var findElementInParams = function findElementInParams() {
    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
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
    var viewBox = svgElement.getAttribute("viewBox");

    if (numbers.length >= 2) {
      svgElement.setAttributeNS(null, "width", numbers[0]);
      svgElement.setAttributeNS(null, "height", numbers[1]);
      setViewBox(svgElement, 0, 0, numbers[0], numbers[1]);
    } else if (viewBox == null) {
      var frame = svgElement.getBoundingClientRect();
      setViewBox(svgElement, 0, 0, frame.width, frame.height);
    } else if (viewBox.split(" ").filter(function (n) {
      return n === "0" || n === 0;
    }).length === 4) {
      var _frame = svgElement.getBoundingClientRect();

      setViewBox(svgElement, 0, 0, _frame.width, _frame.height);
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
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    if (args.length === 2 && typeof args[0] === "number" && typeof args[1] === "number") {
      setViewBox.apply(void 0, [element, 0, 0].concat(args));
    } else if (args.length === 4 && _typeof(args.map(function (a) {
      return typeof a === "number";
    }).reduce(function (a, b) {
      return a && b;
    }, true))) {
      setViewBox.apply(void 0, [element].concat(args));
    }
  };

  var getFrame = function getFrame(element) {
    var frame = [0, 0, 0, 0];

    if (element.viewBox != null) {
      var viewBox = element.viewBox.baseVal;
      frame = [viewBox.x, viewBox.y, viewBox.width - viewBox.x, viewBox.height - viewBox.y];
    } else if (typeof element.getBoundingClientRect === "function") {
      var rr = element.getBoundingClientRect();
      frame = [rr.x, rr.y, rr.width, rr.height];
    }

    return frame;
  };

  var background = function background(element, color) {
    var setParent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (setParent === true) {
      var parent = element.parentElement;

      if (parent != null) {
        parent.setAttribute("style", "background-color: ".concat(color));
      }
    }

    var backRect = Array.from(element.childNodes).filter(function (child) {
      return child.getAttribute("class") === "svg-background-rectangle";
    }).shift();

    if (backRect != null) {
      backRect.setAttribute("fill", color);
    } else {
      backRect = rect.apply(void 0, _toConsumableArray(getFrame(element))).fill(color).setClass("svg-background-rectangle");
      element.insertBefore(backRect, element.firstChild);
    }
  };

  var findStyleSheet = function findStyleSheet(element) {
    var children = Array.from(element.childNodes);
    var topLevel = children.filter(function (child) {
      return child.getAttribute("tagName") === "style";
    }).shift();

    if (topLevel) {
      return topLevel;
    }

    var defs = children.filter(function (child) {
      return child.getAttribute("tagName") === "defs";
    }).shift();

    if (defs == null) {
      return defs;
    }

    var insideDefs = Array.from(defs.childNodes).filter(function (child) {
      return child.getAttribute("tagName") === "style";
    }).shift();

    if (insideDefs != null) {
      return insideDefs;
    }

    return undefined;
  };

  var stylesheet = function stylesheet(element, textContent) {
    var styleSection = findStyleSheet(element);

    if (styleSection == null) {
      styleSection = style(textContent);
      element.insertBefore(styleSection, element.firstChild);
    } else {
      styleSection.setTextContent(textContent);
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
    for (var _len4 = arguments.length, params = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      params[_key4] = arguments[_key4];
    }

    var element = svg();
    Events(element);

    element.controls = function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return controls.apply(void 0, [element].concat(args));
    };

    element.getWidth = function () {
      return getWidth(element);
    };

    element.getHeight = function () {
      return getHeight(element);
    };

    element.setWidth = function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return setWidth.apply(void 0, [element].concat(args));
    };

    element.setHeight = function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return setHeight.apply(void 0, [element].concat(args));
    };

    element.background = function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return background.apply(void 0, [element].concat(args));
    };

    element.size = function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
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

    element.stylesheet = function (textContent) {
      return stylesheet(element, textContent);
    };

    var initialize = function initialize() {
      var parent = findElementInParams.apply(void 0, params);

      if (parent != null) {
        parent.appendChild(element);
      }

      initSize(element, params);

      if (findWindowBooleanParam.apply(void 0, params)) {
        globalize(element);
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
  Object.assign(constructors, root, primitives);
  delete constructors.setConstructors;
  setConstructors(constructors);
  var elements = {};
  Object.keys(primitives).forEach(function (key) {
    elements[key] = primitives[key];
  });
  Object.keys(root).filter(function (key) {
    return key !== "setConstructors";
  }).forEach(function (key) {
    elements[key] = root[key];
  });
  delete elements.svg;

  Object.keys(elements).forEach(function (key) {
    SVG[key] = elements[key];
  });
  Object.keys(geometryMods).forEach(function (key) {
    SVG[key] = geometryMods[key];
  });
  Object.keys(ViewBox).forEach(function (key) {
    SVG[key] = ViewBox[key];
  });
  Object.keys(File).forEach(function (key) {
    SVG[key] = File[key];
  });
  SVG.NS = NS;

  return SVG;

}));
