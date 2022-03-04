/**
 * SVG (c) Robby Kraft
 */
import * as S from "../environment/strings";
// this object will be completed with all remaining nodeName keys
// with an empty array value
export default Object.assign(Object.create(null), {
  // the order of indices matter
  svg: [S.str_viewBox],
  line: ["x1", "y1", "x2", "y2"],
  rect: ["x", "y", "width", "height"],
  circle: ["cx", "cy", "r"],
  ellipse: ["cx", "cy", "rx", "ry"],
  polygon: [S.str_points],
  polyline: [S.str_points],
  path: ["d"],
  text: ["x", "y"],
  mask: [S.str_id],
  symbol: [S.str_id],
  clipPath: [
    S.str_id,
    "clip-rule", // use with clipPath
  ],
  marker: [
    S.str_id,
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
