/**
 * SVG (c) Robby Kraft
 */

export default {
  childOfText: [
    "textPath",   // <text>  path and href attributes
    "tspan",      // <text>
  ],
  childOfGradients: [
    "stop",           // <linearGradient> <radialGrandient>
  ],
  childOfFilter: [
    "feBlend",             // <filter>
    "feColorMatrix",       // <filter>
    "feComponentTransfer", // <filter>
    "feComposite",         // <filter>
    "feConvolveMatrix",    // <filter>
    "feDiffuseLighting",   // <filter>
    "feDisplacementMap",   // <filter>
    "feDistantLight",      // <filter>
    "feDropShadow",        // <filter>
    "feFlood",             // <filter>
    "feFuncA",             // <filter>
    "feFuncB",             // <filter>
    "feFuncG",             // <filter>
    "feFuncR",             // <filter>
    "feGaussianBlur",      // <filter>
    "feImage",             // <filter>
    "feMerge",             // <filter>
    "feMergeNode",         // <filter>
    "feMorphology",        // <filter>
    "feOffset",            // <filter>
    "fePointLight",        // <filter>
    "feSpecularLighting",  // <filter>
    "feSpotLight",         // <filter>
    "feTile",              // <filter>
    "feTurbulence",        // <filter>
  ],
  text: [
    "text",
  ],
  drawings: [
    "circle",
    "ellipse",
    "line",
    "path",
    "polygon",
    "polyline",
    "rect",
    // "arc",              // custom primitives
    // "wedge",            // custom primitives
    // "parabola",         // custom primitives
    // "regularPolygon",   // custom primitives
    // "roundRect",        // custom primitives
  ],
  group: [
    "g",  // can contain drawings
  ],
  // can contain drawings
  nonVisible: [
    "marker",    // anywhere, usually top level SVG, or <defs>
    "symbol",    // anywhere, usually top level SVG, or <defs>
    "clipPath",  // anywhere, usually top level SVG, or <defs>
    "mask",      // anywhere, usually top level SVG, or <defs>
  ],
  patterns: [
    "linearGradient", // <defs>
    "radialGradient", // <defs>
    "pattern",        // <defs>
  ],
  cdata: [
    "cdata",
  ],
  header: [
    "desc",      // anywhere, usually top level SVG, or <defs>
    "filter",    // anywhere, usually top level SVG, or <defs>
    "metadata",  // anywhere, usually top level SVG, or <defs>
    "style",     // anywhere, usually top level SVG, or <defs>
    "script",    // anywhere, usually top level SVG, or <defs>
    "title",     // anywhere, usually top level SVG, or <defs>
    "view",      // anywhere.  use attrs ‘viewBox’, ‘preserveAspectRatio’, ‘zoomAndPan’
  ],
  defs: [
    "defs",      // svg
  ],
  svg: [
    "svg",
  ]
};


//
// unimplemented
// 

const logic = [
  "switch",    // anywhere
  "use",       // anywhere
];

const animate = [
  "animate",
  "animateMotion",
  "animateTransform",
  "discard",
  "mpath",     // motion path
  "set",
];

const unused = [
  "unknown",
];

const embedded = [
  "audio",          //  requires html namespace
  "canvas",         //  requires html namespace
  "foreignObject",  //  <switch>
  "iframe",         //  requires html namespace
  "image",          //  requires html namespace
  "video",          //  requires html namespace
];

const linking = [
  "a",  // anywhere
];

