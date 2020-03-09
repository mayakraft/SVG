svg.size(1, 1);
svg.background("#edb", true);

var points = Array.from(Array(100))
  .map(() => [random(-1, 2), random(-1, 2)]);

var maskA = svg.mask();
var maskB = svg.mask();

maskA.polygon(points).fill("white").fillRule("evenodd");
maskB.rect(-1, -1, 3, 3).fill("white");
maskB.polygon(points).fill("black").fillRule("evenodd");

var boundary = svg.clipPath();
boundary.rect(0,0,1,1);
let g = svg.g().clipPath(boundary);

g.circle(random(), random(), 0.5).fill("black").mask(maskA);
g.circle(random(), random(), 0.5).fill("#e53").mask(maskB);
