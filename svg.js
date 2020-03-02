/* SVG (c) Robby Kraft, MIT License */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SVG = factory());
}(this, (function () { 'use strict';

  var svgNS = "http://www.w3.org/2000/svg";

  var prepare = function prepare(tagName) {
    for (var _len = arguments.length, a = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      a[_key - 1] = arguments[_key];
    }

    switch (tagName) {
      case "line":
        return a;
    }

    return a;
  };

  var map = {
    line: ["x1", "y1", "x2", "y2"],
    rect: ["x", "y", "width", "height"],
    circle: ["cx", "cy", "r"],
    ellipse: ["cx", "cy", "rx", "ry"]
  };

  var args = function args(element, tagName) {
    console.log("args 1", tagName);
    var keys = map[tagName];

    if (keys === undefined) {
      return;
    }

    for (var _len2 = arguments.length, a = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      a[_key2 - 2] = arguments[_key2];
    }

    var values = prepare.apply(void 0, [tagName].concat(a));
    console.log("args 2", keys, values);
    keys.forEach(function (key, i) {
      if (values[i] != null) {
        element.setAttribute(key, values[i]);
      }
    });
  };

  var constructor = function constructor(tagName) {
    var el = window.document.createElementNS(svgNS, tagName);

    for (var _len = arguments.length, args$1 = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args$1[_key - 1] = arguments[_key];
    }

    args.apply(void 0, [el, tagName].concat(args$1));
    return el;
  };

  var T = {
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

  var attributes = {
    svg: {
      version: "1.1",
      xmlns: svgNS
    },
    style: {
      type: "text/css"
    }
  };

  var childElements = {
    svg: [T.svg, T.defs, T.header, T.patterns, T.nonVisible, T.group, T.drawings, T.text],
    defs: [T.header, T.patterns, T.nonVisible],
    filter: [T.childOfFilter],
    marker: [T.group, T.drawings, T.text],
    symbol: [T.group, T.drawings, T.text],
    clipPath: [T.group, T.drawings, T.text],
    mask: [T.group, T.drawings, T.text],
    g: [T.group, T.drawings, T.text],
    text: [T.childOfText],
    linearGradient: [T.childOfGradients],
    radialGradient: [T.childOfGradients]
  };
  Object.keys(childElements).forEach(function (key) {
    childElements[key] = childElements[key].reduce(function (a, b) {
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
  T.drawings.forEach(function (key) {
    elemAttr[key] = [Attr.general];
  });
  T.childOfFilter.forEach(function (key) {
    elemAttr[key] = [Attr.effects];
  });
  elemAttr.svg = [Attr.general];
  elemAttr.defs = [Attr.general];
  elemAttr.filter = [Attr.effects];
  elemAttr.clipPath = [Attr.clipPath];
  elemAttr.g = [Attr.general];
  elemAttr.text = [Attr.general, Attr.text];
  elemAttr.textPath = [Attr.general, Attr.text];
  elemAttr.tspan = [Attr.general, Attr.text];
  elemAttr.linearGradient = [Attr.gradient, Attr.linearGradient];
  elemAttr.radialGradient = [Attr.gradient, Attr.radialGradient];
  Object.keys(elemAttr).forEach(function (key) {
    elemAttr[key] = elemAttr[key].reduce(function (a, b) {
      return a.concat(b);
    }, []);
  });

  var toCamel = function toCamel(s) {
    return s.replace(/([-_][a-z])/ig, function ($1) {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  };

  var prepare$1 = function prepare(element, tagName) {
    if (_typeof(attributes[tagName]) === "object" && attributes[tagName] !== null) {
      Object.keys(attributes[tagName]).forEach(function (key) {
        return element.setAttribute(key, attributes[tagName][key]);
      });
    }

    if (_typeof(childElements[tagName]) === "object" && childElements[tagName] !== null) {
      childElements[tagName].forEach(function (childTag) {
        Object.defineProperty(element, childTag, {
          value: function value() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var el = constructor.apply(void 0, [childTag].concat(args));
            prepare(el, childTag);
            element.appendChild(el);
            return el;
          }
        });
      });
    }

    if (_typeof(elemAttr[tagName]) === "object" && elemAttr[tagName] !== null) {
      elemAttr[tagName].forEach(function (attribute) {
        Object.defineProperty(element, toCamel(attribute), {
          value: function value() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
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
  Object.keys(T).forEach(function (key) {
    return T[key].forEach(function (tagName) {
      elements[tagName] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return prepare$1(constructor.apply(void 0, [tagName].concat(args)), tagName);
      };
    });
  });

  var SVG = {};
  Object.assign(SVG, elements);

  return SVG;

})));
