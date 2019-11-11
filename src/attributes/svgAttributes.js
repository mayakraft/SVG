/**
 * SVG (c) Robby Kraft
 */

/*
const keys = {
  // "accent-height", // deprecated
  "accumulate": ["animate", "animateColor", "animateMotion", "animateTransform"],
  "additive": ["animate", "animateColor", "animateMotion", "animateTransform"],
  "alignment-baseline": ["tspan", "tref", "altGlyph", "textPath"],
  // "allowReorder", // red
  // "alphabetic", // deprecated
  "amplitude":  ["feFuncA", "feFuncB", "feFuncG", "feFuncR"],
  // "arabic-form", // deprecated
  // "ascent", // deprecated
  "attributeName": ["animate", "animateColor", "animateTransform", "set"],
  // "attributeType",  // deprecated
  // "autoReverse",  // red
  "azimuth": ["feDistantLight"],
  // "BSection", // not exist
  "baseFrequency": ["feTurbulence"],
  // "baseline-shift",  // use vertical-align instead
  // "baseProfile", // deprecated
  // "bbox", // deprecated
  "begin": ["animate", "animateColor", "animateMotion", "animateTransform", "discard", "set"],
  "bias": ["feConvolveMatrix"],
  "by": ["animate", "animateColor", "animateMotion", "animateTransform"],
  // "CSection",
  "calcMode": ["animate", "animateColor", "animateMotion", "animateTransform"],
  // "cap-height", // deprecated
  "class": ["a", "altGlyph", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use" ],
  // "clip", // deprecated
  // "clipPathUnits",
  // "clip-path",
  "clip-rule": [], // any shape
*/


// these are attributes across the entire SVG language, not just <svg> element
export default [
  // "accent-height", // deprecated
  "accumulate", // controls whether or not an animation is cumulative
  "additive", // controls whether or not an animation is additive
  "alignment-baseline", // specifies how an object is aligned with respect to its parent
  // "allowReorder",  // unclear usage.
  // "alphabetic", // deprecated
  "amplitude", // controls the amplitude of the gamma function
  // "arabic-form", // deprecated
  // "ascent", // deprecated
  "attributeName", // used by: <animate>, <animateColor>, <animateTransform>, and <set>
  // "attributeType", // deprecated
  // "autoReverse", // unclear usage
  "azimuth", // only used by: <feDistantLight>
  // "BSection", // unclear usage
  "baseFrequency",
  "baseline-shift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "CSection",
  "calcMode",
  "cap-height",
  // "class",
  "clip",
  // "clipPathUnits",
  // "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  // "cx",
  // "cy",
  "DSection",
  // "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominant-baseline",
  "dur",
  // "dx",
  // "dy",
  "ESection",
  "edgeMode",
  "elevation",
  "enable-background",
  "end",
  "exponent",
  "externalResourcesRequired",
  "FSection",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "filterRes",
  "filterUnits",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "format",
  "from",
  "fr",
  "fx",
  "fy",
  "GSection",
  "g1",
  "g2",
  "glyph-name",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "HSection",
  "hanging",
  // "height",
  "href",
  "hreflang",
  "horiz-adv-x",
  "horiz-origin-x",
  "ISection",
  // "id",
  // "ideographic", // deprecated
  "image-rendering", // provides a hint to the browser about how to make speed vs. quality tradeoffs as it performs image processing
  "in", // identifies input for the given filter primitive.
  "in2", // identifies the second input for the given filter primitive.
  "intercept", // defines the intercept of the linear function of color component transfers
  // "KSection", // unclear usage
  // "k", // deprecated
  "k1", // only used by: <feComposite>
  "k2", // only used by: <feComposite>
  "k3", // only used by: <feComposite>
  "k4", // only used by: <feComposite>
  "kernelMatrix", // only used by: <feConvolveMatrix>
  // "kernelUnitLength", // deprecated
  // "kerning", // deprecated
  "keyPoints", // used by: <animate>, <animateColor>, <animateMotion>, <animateTransform>, and <set>
  "keySplines",
  "keyTimes",
  "LSection",
  "lang",
  // "lengthAdjust",
  "letter-spacing",
  "lighting-color",
  "limitingConeAngle",
  "local",
  "MSection",
  "marker-end",
  "marker-mid",
  "marker-start",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  // "mask",
  // "maskContentUnits",
  // "maskUnits",
  "mathematical",
  "max",
  "media",
  "method",
  "min",
  "mode",
  "NSection",
  "name",
  "numOctaves",
  "OSection",
  // "offset", // unclear usage
  "opacity",
  "operator",
  "order",
  "orient", // Only used by: <marker>
  // "orientation",  // deprecated
  // "origin", // possibly not used at all. only used by <animateMotion> 
  "overflow",
  "overline-position",
  "overline-thickness",
  "PSection",
  // "panose-1",  // deprecated
  "paint-order",
  // "path",   // Robby removed this
  // "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  // "ping", // unclear usage
  "pointer-events",
  // "points",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "RSection",
  // "r",
  "radius",
  // "referrerPolicy", // unclear usage
  "refX",
  "refY",
  // "rel", // unclear usage
  "rendering-intent",
  "repeatCount",
  "repeatDur",
  // "requiredExtensions", // unclear usage
  "requiredFeatures",
  "restart",
  "result",
  // "rotate",
  // "rx",
  // "ry",
  "SSection",
  // "scale",  // Robby removed this. transforms
  "seed",
  "shape-rendering",
  // "slope", // unclear usage
  "spacing",
  "specularConstant",
  "specularExponent",
  // "speed", // unclear usage
  "spreadMethod",
  "startOffset", // <textPath>
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stop-color",
  "stop-opacity",
  "strikethrough-position",
  "strikethrough-thickness",
  // "string", // deprecated
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  // "style",
  "surfaceScale",
  // "systemLanguage",
  "TSection",
  "tabindex",
  "tableValues",
  "target", // only used in: <a>
  "targetX", // only used in: <feConvolveMatrix>
  "targetY", // only used in: <feConvolveMatrix>
  "text-anchor",
  "text-decoration",
  "text-rendering",
  // "textLength",
  "to", // final value of the attribute that will be modified during the animation
  // "transform",
  "transform-origin", // i added this -Robby
  "type", // many different uses
  "USection",
  "u1",
  "u2",
  "underline-position",
  "underline-thickness",
  "unicode",
  // "unicode-bidi", // unclear usage
  "unicode-range",
  "units-per-em",
  "VSection",
  "v-alphabetic",
  "v-hanging",
  "v-ideographic",
  "v-mathematical",
  "values",
  "vector-effect",
  "version",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  // "viewBox", // we have our own custom function for this
  "viewTarget",
  "visibility",
  "WSection",
  // "width",
  "widths",
  "word-spacing",
  "writing-mode",
  "XSection",
  // "x",
  // "x-height", // deprecated
  // "x1",
  // "x2",
  "xChannelSelector", // <feDisplacementMap>
  // "xlink:actuate",
  // "xlink:arcrole",
  // "xlink:href",
  // "xlink:role",
  // "xlink:show",
  // "xlink:title",
  // "xlink:type",
  // "xml:base",
  // "xml:lang",
  // "xml:space",
  "YSection",
  // "y",
  // "y1",
  // "y2",
  "yChannelSelector",
  "ZSection",
  // "z",
  // "zoomAndPan" // unclear usage
];
