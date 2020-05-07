/**
 * SVG (c) Robby Kraft
 */

// this object will be completed with all remaining nodeName keys
// with an empty array value
export default {
  // the order of indices matter
  svg: ["viewBox"],
  line: ["x1", "y1", "x2", "y2"],
  rect: ["width", "height", "x", "y"],
  circle: ["r", "cx", "cy"],
  ellipse: ["rx", "ry", "cx", "cy"],
  polygon: ["points"],
  polyline: ["points"],
  path: ["d"],
  text: ["x", "y"],
  mask: ["id"],
  symbol: ["id"],
  clipPath: [
    "id",
    "clip-rule", // use with clipPath
  ],
  marker: [
    "id",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "orient",
    "refX",
    "refY",
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
  ],
  stop: [
    "offset",
    "stop-color",
    "stop-opacity",
  ],
  pattern: [
    "patternContentUnits", // only <pattern>
    "patternTransform", // only <pattern>
    "patternUnits", // only <pattern>
  ],
};
