/**
 * SVG (c) Robby Kraft
 */

const is_iterable = obj => obj != null
  && typeof obj[Symbol.iterator] === "function";

const flatten_input = function (...args) {
  switch (args.length) {
    case undefined:
    case 0: return args;
    // only if its an array (is iterable) and NOT a string
    case 1: return is_iterable(args[0]) && typeof args[0] !== "string"
      ? flatten_input(...args[0])
      : [args[0]];
    default:
      return Array.from(args)
        .map(a => (is_iterable(a)
          ? [...flatten_input(a)]
          : a))
        .reduce((a, b) => a.concat(b), []);
  }
};

/**
 *  modifiers
 */
export const setPoints = function (shape, ...pointsArray) {
  const flat = flatten_input(...pointsArray);
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
};

export const setLinePoints = function (shape, ...pointsArray) {
  const flat = flatten_input(...pointsArray);
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
  if (points[0]) { shape.setAttributeNS(null, "x1", points[0]); }
  if (points[1]) { shape.setAttributeNS(null, "y1", points[1]); }
  if (points[2]) { shape.setAttributeNS(null, "x2", points[2]); }
  if (points[3]) { shape.setAttributeNS(null, "y2", points[3]); }
};

export const setArc = function (shape, x, y, radius,
  startAngle, endAngle, includeCenter = false) {
  if (endAngle == null) { return; }
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
};

export const setEllipticalArc = function (shape, x, y, rX, rY,
  startAngle, endAngle, includeCenter = false) {
  if (endAngle == null) { return; }
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
};

export const setBezier = function (shape, fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
  if (toY == null) { return; }
  const pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]]
    .map(p => p.join(","));
  const d = `M ${pts[0]} C ${pts[1]} ${pts[2]} ${pts[3]}`;
  shape.setAttributeNS(null, "d", d);
};
