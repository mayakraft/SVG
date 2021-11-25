/**
 * SVG (c) Robby Kraft
 */
import * as K from "../../../environment/keys";
import { add2, sub2, scale2, magnitude2 } from "../../../methods/algebra";

const ends = [K._tail, K._head];
const stringifyPoint = p => p.join(",");
const pointsToPath = (points) => "M" + points.map(pt => pt.join(",")).join("L") + "Z";

const makeArrowPaths = function (options) {
  // throughout, tail is 0, head is 1
  let pts = [[0,1], [2,3]].map(pt => pt.map(i => options.points[i] || 0));
  let vector = sub2(pts[1], pts[0]);
  let midpoint = add2(pts[0], scale2(vector, 0.5));
  // make sure arrow isn't too small
  const len = magnitude2(vector);
  const minLength = ends
    .map(s => (options[s].visible
      ? (1 + options[s].padding) * options[s].height * 2.5
      : 0))
    .reduce((a, b) => a + b, 0);
  if (len < minLength) {
    // check len === exactly 0. don't compare to epsilon here
    const minVec = len === 0 ? [minLength, 0] : scale2(vector, minLength / len);
    pts = [sub2, add2].map(f => f(midpoint, scale2(minVec, 0.5)));
    vector = sub2(pts[1], pts[0]);
  } else {
    // allow padding to be able to be applied. but still cap it at minLength
    // if (options.padding) {}
  }
  let perpendicular = [vector[1], -vector[0]];
  let bezPoint = add2(midpoint, scale2(perpendicular, options.bend));
  const bezs = pts.map(pt => sub2(bezPoint, pt));
  const bezsLen = bezs.map(v => magnitude2(v));
  const bezsNorm = bezs.map((bez, i) => bezsLen[i] === 0
    ? bez
    : scale2(bez, 1 / bezsLen[i]));
  const vectors = bezsNorm.map(norm => scale2(norm, -1));
  const normals = vectors.map(vec => [vec[1], -vec[0]]);
  // get padding from either head/tail options or root of options
  const pad = ends.map((s, i) => options[s].padding
    ? options[s].padding
    : (options.padding ? options.padding : 0.0));
  const scales = ends
    .map((s, i) => options[s].height * (options[s].visible ? 1 : 0))
    .map((n, i) => n + pad[i]);
    // .map((s, i) => options[s].height * ((options[s].visible ? 1 : 0) + pad[i]));
  const arcs = pts.map((pt, i) => add2(pt, scale2(bezsNorm[i], scales[i])));
  // readjust bezier curve now that the arrow heads push inwards
  vector = sub2(arcs[1], arcs[0]);
  perpendicular = [vector[1], -vector[0]];
  midpoint = add2(arcs[0], scale2(vector, 0.5));
  bezPoint = add2(midpoint, scale2(perpendicular, options.bend));
  // done adjust
  const controls = arcs
    .map((arc, i) => add2(arc, scale2(sub2(bezPoint, arc), options.pinch)))
  const polyPoints = ends.map((s, i) => [
    add2(arcs[i], scale2(vectors[i], options[s].height)),
    add2(arcs[i], scale2(normals[i], options[s].width / 2)),
    add2(arcs[i], scale2(normals[i], -options[s].width / 2)),
  ]);
  return {
    line: `M${stringifyPoint(arcs[0])}C${stringifyPoint(controls[0])},${stringifyPoint(controls[1])},${stringifyPoint(arcs[1])}`,
    tail: pointsToPath(polyPoints[0]),
    head: pointsToPath(polyPoints[1]),
  };
};

export default makeArrowPaths;
