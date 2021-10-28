/**
 * SVG (c) Robby Kraft
 */
import * as K from "../environment/keys";
// this object will be completed with all remaining nodeName keys
// with an empty array value
export default Object.assign(Object.create(null), {
  // the order of indices matter
  svg: [K.viewBox],
  line: ["x1", "y1", "x2", "y2"],
  rect: ["x", "y", "width", "height"],
  circle: ["cx", "cy", "r"],
  ellipse: ["cx", "cy", "rx", "ry"],
  polygon: [K.points],
  polyline: [K.points],
  path: ["d"],
  text: ["x", "y"],
  mask: [K.id],
  symbol: [K.id],
  clipPath: [
    K.id,
    "clip-rule", // use with clipPath
  ],
  marker: [
    K.id,
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
