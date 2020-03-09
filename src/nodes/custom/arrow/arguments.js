/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
import flatten from "../../arguments/flatten";

const arrowArguments = function (...args) {
  const flat = flatten(...args);
  let endpoints = [];
  if (typeof flat[0] === K.number) {
    endpoints = flat;
  }
  if (typeof flat[0] === K.object) {
    if (typeof flat[0].x === K.number) {
      endpoints = flat.map(p => [p[0], p[1]]).reduce((a, b) => a.concat(b), []);
    }
    if (typeof flat[0][0] === K.number) {
      endpoints = flat.reduce((a, b) => a.concat(b), []);
    }
  }
  if (!endpoints.length && shape.endpoints != null) {
    // get endpoints from cache
    endpoints = shape.endpoints;
  }
  if (!endpoints.length) { return ""; }
  // we have to cache the endpoints in case we need to rebuild
  shape.endpoints = endpoints;

  const o = shape.options;

  let tailPt = [endpoints[0], endpoints[1]];
  let headPt = [endpoints[2], endpoints[3]];
  let vector = [headPt[0] - tailPt[0], headPt[1] - tailPt[1]];
  let midpoint = [tailPt[0] + vector[0] / 2, tailPt[1] + vector[1] / 2];
  // make sure arrow isn't too small
  const len = Math.sqrt((vector[0] ** 2) + (vector[1] ** 2));
  const minLength = (
    (o.tail.visible ? (1 + o.tail.padding) * o.tail.height * 2.5 : 0)
  + (o.head.visible ? (1 + o.head.padding) * o.head.height * 2.5 : 0)
  );
  if (len < minLength) {
    const minVec = len === 0 // exactly 0. don't use epsilon here
      ? [minLength, 0]
      : [vector[0] / len * minLength, vector[1] / len * minLength];
    tailPt = [midpoint[0] - minVec[0] * 0.5, midpoint[1] - minVec[1] * 0.5];
    headPt = [midpoint[0] + minVec[0] * 0.5, midpoint[1] + minVec[1] * 0.5];
    vector = [headPt[0] - tailPt[0], headPt[1] - tailPt[1]];
  }
  let perpendicular = [vector[1], -vector[0]];
  let bezPoint = [
    midpoint[0] + perpendicular[0] * o.curve,
    midpoint[1] + perpendicular[1] * o.curve
  ];

  const bezTail = [bezPoint[0] - tailPt[0], bezPoint[1] - tailPt[1]];
  const bezHead = [bezPoint[0] - headPt[0], bezPoint[1] - headPt[1]];
  const bezTailLen = Math.sqrt((bezTail[0] ** 2) + (bezTail[1] ** 2));
  const bezHeadLen = Math.sqrt((bezHead[0] ** 2) + (bezHead[1] ** 2));
  const bezTailNorm = bezTailLen === 0
    ? bezTail
    : [bezTail[0] / bezTailLen, bezTail[1] / bezTailLen];
  const bezHeadNorm = bezTailLen === 0
    ? bezHead
    : [bezHead[0] / bezHeadLen, bezHead[1] / bezHeadLen];
  const tailVector = [-bezTailNorm[0], -bezTailNorm[1]];
  const headVector = [-bezHeadNorm[0], -bezHeadNorm[1]];
  const tailNormal = [tailVector[1], -tailVector[0]];
  const headNormal = [headVector[1], -headVector[0]];

  const tailArc = [
    tailPt[0] + bezTailNorm[0] * o.tail.height * ((o.tail.visible ? 1 : 0) + o.tail.padding),
    tailPt[1] + bezTailNorm[1] * o.tail.height * ((o.tail.visible ? 1 : 0) + o.tail.padding)
  ];
  const headArc = [
    headPt[0] + bezHeadNorm[0] * o.head.height * ((o.head.visible ? 1 : 0) + o.head.padding),
    headPt[1] + bezHeadNorm[1] * o.head.height * ((o.head.visible ? 1 : 0) + o.head.padding)
  ];
  // readjust bezier curve now that the arrow heads push inwards
  vector = [headArc[0] - tailArc[0], headArc[1] - tailArc[1]];
  perpendicular = [vector[1], -vector[0]];
  midpoint = [tailArc[0] + vector[0] / 2, tailArc[1] + vector[1] / 2];
  bezPoint = [
    midpoint[0] + perpendicular[0] * o.curve,
    midpoint[1] + perpendicular[1] * o.curve
  ];

  // done adjust
  const tailControl = [
    tailArc[0] + (bezPoint[0] - tailArc[0]) * o.pinch,
    tailArc[1] + (bezPoint[1] - tailArc[1]) * o.pinch
  ];
  const headControl = [
    headArc[0] + (bezPoint[0] - headArc[0]) * o.pinch,
    headArc[1] + (bezPoint[1] - headArc[1]) * o.pinch
  ];

  const tailPolyPts = [
    [tailArc[0] + tailNormal[0] * -o.tail.width, tailArc[1] + tailNormal[1] * -o.tail.width],
    [tailArc[0] + tailNormal[0] * o.tail.width, tailArc[1] + tailNormal[1] * o.tail.width],
    [tailArc[0] + tailVector[0] * o.tail.height, tailArc[1] + tailVector[1] * o.tail.height]
  ];
  const headPolyPts = [
    [headArc[0] + headNormal[0] * -o.head.width, headArc[1] + headNormal[1] * -o.head.width],
    [headArc[0] + headNormal[0] * o.head.width, headArc[1] + headNormal[1] * o.head.width],
    [headArc[0] + headVector[0] * o.head.height, headArc[1] + headVector[1] * o.head.height]
  ];

  return `M${tailArc[0]},${tailArc[1]}C${tailControl[0]},${tailControl[1]},${headControl[0]},${headControl[1]},${headArc[0]},${headArc[1]}`;
};

export default arrowArguments;
