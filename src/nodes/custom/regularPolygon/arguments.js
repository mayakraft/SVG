/**
 * SVG (c) Robby Kraft
 */

const regularPolygonArguments = (sides, cX, cY, radius) => {
  const origin = [cX, cY];
  // default is point-aligned along the axis.
  // if we want edge-aligned, add this value to the angle.
  // const halfwedge = Math.PI / sides;
  return Array.from(Array(sides))
    .map((el, i) => 2 * Math.PI * i / sides)
    .map(a => [Math.cos(a), Math.sin(a)])
    .map(pts => origin.map((o, i) => o + radius * pts[i]));
};

const polygonPathString = (sides, cX = 0, cY = 0, radius = 1) => [
  regularPolygonArguments(sides, cX, cY, radius)
    .map(a => `${a[0]},${a[1]}`).join(" ")
];

export default polygonPathString;
