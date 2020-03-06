/**
 * SVG (c) Robby Kraft
 */

const vec = (a, d) => [Math.cos(a) * d, Math.sin(a) * d];

const arcPath = (x, y, radius, startAngle, endAngle, includeCenter = false) => {
  if (endAngle == null) { return ""; }
  const start = vec(startAngle, radius);
  const end = vec(endAngle, radius);
  const arcVec = [end[0] - start[0], end[1] - start[1]];
  const py = start[0] * end[1] - start[1] * end[0];
  const px = start[0] * end[0] + start[1] * end[1];
  const arcdir = (Math.atan2(py, px) > 0 ? 0 : 1);
  let d = (includeCenter
    ? `M ${x},${y} l ${start[0]},${start[1]} `
    : `M ${x+start[0]},${y+start[1]} `);
  d += ["a ", radius, radius, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
  if (includeCenter) { d += " Z"; }
  return d;
};

// export const setEllipticalArc = function (shape, x, y, rX, rY,
//   startAngle, endAngle, includeCenter = false) {
//   if (endAngle == null) { return undefined; }
//   const start = [
//     x + Math.cos(startAngle) * rX,
//     y + Math.sin(startAngle) * rY];
//   const vecStart = [
//     Math.cos(startAngle) * rX,
//     Math.sin(startAngle) * rY];
//   const vecEnd = [
//     Math.cos(endAngle) * rX,
//     Math.sin(endAngle) * rY];
//   const arcVec = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
//   const py = vecStart[0] * vecEnd[1] - vecStart[1] * vecEnd[0];
//   const px = vecStart[0] * vecEnd[0] + vecStart[1] * vecEnd[1];
//   const arcdir = (Math.atan2(py, px) > 0 ? 0 : 1);
//   let d = (includeCenter
//     ? `M ${x},${y} l ${vecStart[0]},${vecStart[1]} `
//     : `M ${start[0]},${start[1]} `);
//   d += ["a ", rX, rY, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
//   if (includeCenter) { d += " Z"; }
//   shape.setAttributeNS(null, "d", d);
//   return shape;
// };


const arcArguments = (a, b, c, d, e) => arcPath(a, b, c, d, e, false);
// const wedgeArguments = (a, b, c, d, e) => arcPath(a, b, c, d, e, true);

export default arcArguments;

