/**
 * SVG (c) Robby Kraft
 */

import { add2, sub2, scale2 } from "../../../methods/math";

// endpoints is an array of 4 numbers
const makeCurvePath = (endpoints = [], bend = 0, pinch = 0.5) => {
  const tailPt = [endpoints[0] || 0, endpoints[1] || 0];
  const headPt = [endpoints[2] || 0, endpoints[3] || 0];
  const vector = sub2(headPt, tailPt);
  const midpoint = add2(tailPt, scale2(vector, 0.5));
  const perpendicular = [vector[1], -vector[0]];
  const bezPoint = add2(midpoint, scale2(perpendicular, bend));
  const tailControl = add2(tailPt, scale2(sub2(bezPoint, tailPt), pinch));
  const headControl = add2(headPt, scale2(sub2(bezPoint, headPt), pinch));
  return `M${tailPt[0]},${tailPt[1]}C${tailControl[0]},${tailControl[1]} ${headControl[0]},${headControl[1]} ${headPt[0]},${headPt[1]}`;
};

export default makeCurvePath;
