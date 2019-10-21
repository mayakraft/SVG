size(1, 1);
background("#edb", true);

var points = Array.from(Array(100))
  .map(() => [random(-1, 2), random(-1, 2)]);

var maskA = mask();
var maskB = mask();

maskA.polygon(points).fill("white").fillRule("evenodd");
maskB.rect(-1, -1, 3, 3).fill("white");
maskB.polygon(points).fill("black").fillRule("evenodd");

circle(random(), random(), 0.5).fill("black").mask(maskA);
circle(random(), random(), 0.5).fill("#e53").mask(maskB);
