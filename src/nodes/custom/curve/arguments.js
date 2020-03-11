/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
import flatten from "../../../arguments/flatten";
import coordinates from "../../../arguments/coordinates";

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const scale = (a, s) => [a[0] * s, a[1] * s];

const curveArguments = function (...args) {
  const params = coordinates(...flatten(...args))
  const endpoints = params.slice(0, 4);
  if (!endpoints.length) { return [""]; }
  const o_curve = params[4] || 0;
  const o_pinch = params[5] || 0.5;

  const tailPt = [endpoints[0], endpoints[1]];
  const headPt = [endpoints[2], endpoints[3]];
  const vector = sub(headPt, tailPt);
  const midpoint = add(tailPt, scale(vector, 0.5));
  const perpendicular = [vector[1], -vector[0]];
  const bezPoint = add(midpoint, scale(perpendicular, o_curve));
  const tailControl = add(tailPt, scale(sub(bezPoint, tailPt), o_pinch));
  const headControl = add(headPt, scale(sub(bezPoint, headPt), o_pinch));

  return [`M${tailPt[0]},${tailPt[1]}C${tailControl[0]},${tailControl[1]} ${headControl[0]},${headControl[1]} ${headPt[0]},${headPt[1]}`];
};

export default curveArguments;
