/**
 * SVG (c) Robby Kraft
 */

const regularPolygonArguments = (cX, cY, radius, sides) => {
  const halfwedge = 2 * Math.PI / sides * 0.5;
  const r = Math.cos(halfwedge) * radius;
  return Array.from(Array(sides)).map((el, i) => {
    const a = -2 * Math.PI * i / sides + halfwedge;
    const x = cX + r * Math.sin(a);
    const y = cY + r * Math.cos(a);
    return [x, y];
  });
};

const polygonPathString = (cX, cY, radius, sides) => [
  regularPolygonArguments(cX, cY, radius, sides)
    .map(a => `${a[0]},${a[1]}`).join(" ")
];

export default polygonPathString;
