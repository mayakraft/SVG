/**
 * SVG (c) Robby Kraft
 */

import flatten from "../nodes/arguments/flatten";

/**
 *  modifiers
 */
export const setPoints = function (shape, ...pointsArray) {
  const flat = flatten(...pointsArray);
  let pointsString = "";
  if (typeof flat[0] === "number") {
    pointsString = Array.from(Array(Math.floor(flat.length / 2)))
      .reduce((a, b, i) => `${a}${flat[i * 2]},${flat[i * 2 + 1]} `, "");
  }
  if (typeof flat[0] === "object") {
    if (typeof flat[0].x === "number") {
      pointsString = flat.reduce((prev, curr) => `${prev}${curr.x},${curr.y} `, "");
    }
    if (typeof flat[0][0] === "number") {
      pointsString = flat.reduce((prev, curr) => `${prev}${curr[0]},${curr[1]} `, "");
    }
  }
  shape.setAttributeNS(null, "points", pointsString);
  return shape;
};

export const setLinePoints = function (shape, ...pointsArray) {
  const flat = flatten(...pointsArray);
  let points = [];
  if (typeof flat[0] === "number") {
    points = flat;
  }
  if (typeof flat[0] === "object") {
    if (typeof flat[0].x === "number") {
      points = flat.map(p => [p[0], p[1]]).reduce((a, b) => a.concat(b), []);
    }
    if (typeof flat[0][0] === "number") {
      points = flat.reduce((a, b) => a.concat(b), []);
    }
  }
  if (points[0] != null) { shape.setAttributeNS(null, "x1", points[0]); }
  if (points[1] != null) { shape.setAttributeNS(null, "y1", points[1]); }
  if (points[2] != null) { shape.setAttributeNS(null, "x2", points[2]); }
  if (points[3] != null) { shape.setAttributeNS(null, "y2", points[3]); }
  return shape;
};

export const setCenter = function (shape, ...args) {
  const flat = flatten(...args);
  if (typeof flat[0] === "number") {
    if (flat[0] != null) { shape.setAttributeNS(null, "cx", flat[0]); }
    if (flat[1] != null) { shape.setAttributeNS(null, "cy", flat[1]); }
  }
  if (typeof flat.x === "number") {
    if (flat.x != null) { shape.setAttributeNS(null, "cx", flat.x); }
    if (flat.y != null) { shape.setAttributeNS(null, "cy", flat.y); }
  }
  return shape;
};

export const setArc = function (shape, x, y, radius,
  startAngle, endAngle, includeCenter = false) {
  if (endAngle == null) { return undefined; }
  const start = [
    x + Math.cos(startAngle) * radius,
    y + Math.sin(startAngle) * radius];
  const vecStart = [
    Math.cos(startAngle) * radius,
    Math.sin(startAngle) * radius];
  const vecEnd = [
    Math.cos(endAngle) * radius,
    Math.sin(endAngle) * radius];
  const arcVec = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
  const py = vecStart[0] * vecEnd[1] - vecStart[1] * vecEnd[0];
  const px = vecStart[0] * vecEnd[0] + vecStart[1] * vecEnd[1];
  const arcdir = (Math.atan2(py, px) > 0 ? 0 : 1);
  let d = (includeCenter
    ? `M ${x},${y} l ${vecStart[0]},${vecStart[1]} `
    : `M ${start[0]},${start[1]} `);
  d += ["a ", radius, radius, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
  if (includeCenter) { d += " Z"; }
  shape.setAttributeNS(null, "d", d);
  return shape;
};

export const setEllipticalArc = function (shape, x, y, rX, rY,
  startAngle, endAngle, includeCenter = false) {
  if (endAngle == null) { return undefined; }
  const start = [
    x + Math.cos(startAngle) * rX,
    y + Math.sin(startAngle) * rY];
  const vecStart = [
    Math.cos(startAngle) * rX,
    Math.sin(startAngle) * rY];
  const vecEnd = [
    Math.cos(endAngle) * rX,
    Math.sin(endAngle) * rY];
  const arcVec = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
  const py = vecStart[0] * vecEnd[1] - vecStart[1] * vecEnd[0];
  const px = vecStart[0] * vecEnd[0] + vecStart[1] * vecEnd[1];
  const arcdir = (Math.atan2(py, px) > 0 ? 0 : 1);
  let d = (includeCenter
    ? `M ${x},${y} l ${vecStart[0]},${vecStart[1]} `
    : `M ${start[0]},${start[1]} `);
  d += ["a ", rX, rY, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
  if (includeCenter) { d += " Z"; }
  shape.setAttributeNS(null, "d", d);
  return shape;
};

export const setBezier = function (shape, fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
  if (toY == null) { return undefined; }
  const pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]]
    .map(p => p.join(","));
  const d = `M ${pts[0]} C ${pts[1]} ${pts[2]} ${pts[3]}`;
  shape.setAttributeNS(null, "d", d);
  return shape;
};

export const setArrowPoints = function (shape, ...args) {
  const children = Array.from(shape.childNodes);
  const path = children.filter(node => node.tagName === "path").shift();
  const polys = ["svg-arrow-head", "svg-arrow-tail"]
    .map(c => children.filter(n => n.getAttribute("class") === c).shift());

  const flat = flatten(...args);
  let endpoints = [];
  if (typeof flat[0] === "number") {
    endpoints = flat;
  }
  if (typeof flat[0] === "object") {
    if (typeof flat[0].x === "number") {
      endpoints = flat.map(p => [p[0], p[1]]).reduce((a, b) => a.concat(b), []);
    }
    if (typeof flat[0][0] === "number") {
      endpoints = flat.reduce((a, b) => a.concat(b), []);
    }
  }
  if (!endpoints.length && shape.endpoints != null) {
    // get endpoints from cache
    endpoints = shape.endpoints;
  }
  if (!endpoints.length) { return shape; }
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

  // draw
  // if straight or curved
  path.setAttribute("d", `M${tailArc[0]},${tailArc[1]}C${tailControl[0]},${tailControl[1]},${headControl[0]},${headControl[1]},${headArc[0]},${headArc[1]}`);

  if (o.head.visible) {
    polys[0].removeAttribute("display");
    setPoints(polys[0], headPolyPts);
  } else {
    polys[0].setAttribute("display", "none");
  }

  if (o.tail.visible) {
    polys[1].removeAttribute("display");
    setPoints(polys[1], tailPolyPts);
  } else {
    polys[1].setAttribute("display", "none");
  }
  return shape;
};

const setArrowPointsStraightOnly = function (shape, ...args) {
  const children = Array.from(shape.childNodes);
  const path = children.filter(node => node.tagName === "path").shift();
  const polys = ["svg-arrow-head", "svg-arrow-tail"]
    .map(c => children.filter(n => n.getAttribute("class") === c).shift());

  const flat = flatten(...args);
  let endpoints = [];
  if (typeof flat[0] === "number") {
    endpoints = flat;
  }
  if (typeof flat[0] === "object") {
    if (typeof flat[0].x === "number") {
      endpoints = flat.map(p => [p[0], p[1]]).reduce((a, b) => a.concat(b), []);
    }
    if (typeof flat[0][0] === "number") {
      endpoints = flat.reduce((a, b) => a.concat(b), []);
    }
  }
  if (!endpoints.length && shape.endpoints != null) {
    // get endpoints from cache
    endpoints = shape.endpoints;
  }
  if (!endpoints.length) { return shape; }
  // we have to cache the endpoints in case we need to rebuild
  shape.endpoints = endpoints;

  const o = shape.options;

  let tailPt = [endpoints[0], endpoints[1]];
  let headPt = [endpoints[2], endpoints[3]];

  const vec = [headPt[0] - tailPt[0], headPt[1] - tailPt[1]];
  const arrowLength = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
  const arrowVector = [vec[0] / arrowLength, vec[1] / arrowLength];
  const arrow90 = [arrowVector[1], -arrowVector[0]];

  // adjust tailPt and headPt if there's padding
  tailPt = [
    tailPt[0] + arrowVector[0] * (o.head.visible ? 1 : 0) * o.head.padding,
    tailPt[1] + arrowVector[1] * (o.head.visible ? 1 : 0) * o.head.padding,
  ];
  headPt = [
    headPt[0] - arrowVector[0] * (o.tail.visible ? 1 : 0) * o.tail.padding,
    headPt[1] - arrowVector[1] * (o.tail.visible ? 1 : 0) * o.tail.padding,
  ];

  // black triangle
  const headCoords = [
    [headPt[0] + arrow90[0] * o.head.width, headPt[1] + arrow90[1] * o.head.width],
    [headPt[0] - arrow90[0] * o.head.width, headPt[1] - arrow90[1] * o.head.width],
    [headPt[0] + arrowVector[0] * o.head.height, headPt[1] + arrowVector[1] * o.head.height],
  ];
  const tailCoords = [
    [tailPt[0] - arrow90[0] * o.tail.width, tailPt[1] - arrow90[1] * o.tail.width],
    [tailPt[0] + arrow90[0] * o.tail.width, tailPt[1] + arrow90[1] * o.tail.width],
    [tailPt[0] - arrowVector[0] * o.tail.height, tailPt[1] - arrowVector[1] * o.tail.height],
  ];

  // if straight or curved
  path.setAttribute("d", `M${tailPt[0]},${tailPt[1]}L${headPt[0]},${headPt[1]}`);

  if (o.head.visible) {
    polys[0].removeAttribute("display");
    setPoints(polys[0], headCoords);
  } else {
    polys[0].setAttribute("display", "none");
  }

  if (o.tail.visible) {
    polys[1].removeAttribute("display");
    setPoints(polys[1], tailCoords);
  } else {
    polys[1].setAttribute("display", "none");
  }
  return shape;
};
