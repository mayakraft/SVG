/**
 * SVG (c) Robby Kraft
 */

export const arcPath = (x, y, radius, startAngle, endAngle, includeCenter = false) => {
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
};
