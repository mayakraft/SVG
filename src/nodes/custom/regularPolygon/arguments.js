/**
 * SVG (c) Robby Kraft
 */

const regularPolygonArguments = (cX, cY, radius, sides) => {
  const origin = [cX, cY];
  // default is point-aligned along the axis.
  // if we want edge-aligned, add this value to the angle.
  // const halfwedge = Math.PI / sides;
  return Array.from(Array(sides))
    .map((el, i) => 2 * Math.PI * i / sides)
    .map(a => [Math.cos(a), Math.sin(a)])
    .map(pts => origin.map((o, i) => o + radius * pts[i]));
};

const polygonPathString = (cX, cY, radius, sides) => [
  regularPolygonArguments(cX, cY, radius, sides)
    .map(a => `${a[0]},${a[1]}`).join(" ")
];

export default polygonPathString;
