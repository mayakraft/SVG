
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
export const setPoints = function (polygon, ...pointsArray) {
  const flat = flatten_input(...pointsArray);
  const pointsString = typeof flat[0] === "object" && flat[0].x != null
    ? flat.reduce((prev, curr) => `${prev}${curr.x},${curr.y} `, "")
    : Array.from(Array(Math.floor(flat.length / 2)))
      .reduce((a, b, i) => `${a}${flat[i * 2]},${flat[i * 2 + 1]} `, "");
  polygon.setAttributeNS(null, "points", pointsString);
};

export const setArc = function (shape, x, y, radius,
  startAngle, endAngle, includeCenter = false) {
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

export const setBezier = function (shape, fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
  const pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]]
    .map(p => p.join(","));
  const d = `M ${pts[0]} C ${pts[1]} ${pts[2]} ${pts[3]}`;
  shape.setAttributeNS(null, "d", d);
};
