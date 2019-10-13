size(1, 1);
background("#edb");

var points = Array.from(Array(100))
  .map(() => [Math.random(), Math.random()]);

var maskA = mask();
var maskB = mask();

maskA.polygon(points).fill("white").fillRule("evenodd");
maskB.rect(0, 0, 1, 1).fill("white");
maskB.polygon(points).fill("black").fillRule("evenodd");

circle(Math.random(), Math.random(), 0.5)
  .fill("black").mask(maskA);
circle(Math.random(), Math.random(), 0.5)
  .fill("#e53").mask(maskB);
