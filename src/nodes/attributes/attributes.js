/**
 * SVG (c) Robby Kraft
 */

export default {
  general: [
    "color",
    "color-interpolation",
    "cursor", // mouse cursor
    "direction", // rtl right to left
    "display", // none, inherit
    "fill",
    "fill-opacity",
    "fill-rule",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "image-rendering", // provides a hint to the browser about how to make speed vs. quality tradeoffs as it performs image processing
    "letter-spacing",
    "marker-end",  // marker like arrowhead
    "marker-mid",  // marker like arrowhead
    "marker-start",  // marker like arrowhead
    "markerHeight",  // marker like arrowhead
    "markerUnits",  // marker like arrowhead
    "markerWidth",  // marker like arrowhead
    "opacity",
    "overflow",
    "paint-order",
    "pointer-events",
    "preserveAspectRatio",
    "shape-rendering",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "tabindex",
    "transform-origin", // added by Robby
    "user-select", // added by Robby
    "vector-effect",
    "visibility"
  ],
  animation: [
    "accumulate", // controls whether or not an animation is cumulative
    "additive", // controls whether or not an animation is additive
    "attributeName", // used by: <animate>, <animateColor>, <animateTransform>, and <set>
    "begin",
    "by",
    "calcMode",
    "dur",
    "end",
    "from",
    "keyPoints", // used by: <animate>, <animateColor>, <animateMotion>, <animateTransform>, and <set>
    "keySplines",
    "keyTimes",
    "max",
    "min",
    "repeatCount",
    "repeatDur",
    "restart",
    "to", // final value of the attribute that will be modified during the animation
    "values",
  ],
  effects: [
    "azimuth", // only used by: <feDistantLight>
    "baseFrequency",
    "bias",
    "color-interpolation-filters",
    "diffuseConstant",
    "divisor",
    "edgeMode",
    "elevation",
    "exponent",
    "filter",
    "filterRes",
    "filterUnits",
    "flood-color",
    "flood-opacity",
    "in", // identifies input for the given filter primitive.
    "in2", // identifies the second input for the given filter primitive.
    "intercept", // defines the intercept of the linear function of color component transfers
    "k1", // only used by: <feComposite>
    "k2", // only used by: <feComposite>
    "k3", // only used by: <feComposite>
    "k4", // only used by: <feComposite>
    "kernelMatrix", // only used by: <feConvolveMatrix>
    "lighting-color",
    "limitingConeAngle",
    "mode",
    "numOctaves",
    "operator",
    "order",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "primitiveUnits",
    "radius",
    "result",
    "seed",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "targetX", // only used in: <feConvolveMatrix>
    "targetY", // only used in: <feConvolveMatrix>
    "type", // many different uses, in animate, and <style> <script>
    "xChannelSelector", // <feDisplacementMap>
    "yChannelSelector",
  ],
  text: [
    "alignment-baseline", // specifies how a text alignts vertically
    "baseline-shift",
    "dominant-baseline",
    "method", // for <textPath> only
    "overline-position",
    "overline-thickness",
    "spacing",
    "startOffset", // <textPath>
    "strikethrough-position",
    "strikethrough-thickness",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "textLength",
    "underline-position",
    "underline-thickness",
    "word-spacing",
    "writing-mode",
  ],
  clipPath: [
    "clip-rule", // use with clipPath
  ],
  marker: [
    "refX", // <marker>
    "refY", // <marker>
  ],
  pattern: [
    "patternContentUnits", // only <pattern>
    "patternTransform", // only <pattern>
    "patternUnits", // only <pattern>
  ],
  gradient: [
    "gradientTransform", // linear/radial gradient
    "gradientUnits", // linear/radial gradient
    "spreadMethod", // linear/radial gradient
  ],
  linearGradient: [
    "x1", // <linearGradient>
    "x2", // <linearGradient>
    "y1", // <linearGradient>
    "y2", // <linearGradient>
  ],
  radialGradient: [
    "cx", // <radialGradient>
    "cy", // <radialGradient>
    "r",  // <radialGradient>
    "fr", // <radialGradient>
    "fx", // <radialGradient>
    "fy", // <radialGradient>
  ]
};

const unused = [
  // specific to various elements
  "media", // for <style> only. @media
  "stop-color",  // <stop>
  "stop-opacity", // <stop>
  "target", // only used in: <a>
  "href", // anmations, effect images, gradients, 
  "requiredExtensions", // used in conjunction with <switch>
  "systemLanguage", // used in conjunction with <switch>
];
