/**
 * SVG (c) Robby Kraft
 */
import * as K from "../environment/keys";
// this object will be completed with all remaining nodeName keys
// with an empty array value
export default Object.assign(Object.create(null), {
  // the order of indices matter
  svg: [K._viewBox],
  line: ["x1", "y1", "x2", "y2"],
  rect: ["x", "y", "width", "height"],
  circle: ["cx", "cy", "r"],
  ellipse: ["cx", "cy", "rx", "ry"],
  polygon: [K._points],
  polyline: [K._points],
  path: ["d"],
  text: ["x", "y"],
  mask: [K._id],
  symbol: [K._id],
  clipPath: [
    K._id,
    "clip-rule", // use with clipPath
  ],
  marker: [
    K._id,
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
});
