svg.size(1, 1);
svg.background("#edb");

// a mask will hide or show parts of shapes
// depending on the contents. white: visible, black: invisible
var maskA = svg.mask();
var maskB = svg.mask();

// a polygon from 100 connected random points
var points = Array.from(Array(100))
  .map(() => [random(-1, 2), random(-1, 2)]);

// each mask gets the same polygon
// but the polygon and background color alternate
// white/black and black/white
maskA.polygon(points).fill("white").fillRule("evenodd");
maskB.rect(0, 0, 1, 1).fill("white");
maskB.polygon(points).fill("black").fillRule("evenodd");

// two circles, assigned to different masks
svg.circle(random(), random(), 0.5)
  .fill("black")
  .mask(maskA);

svg.circle(random(), random(), 0.5)
  .fill("#e53")
  .mask(maskB);
