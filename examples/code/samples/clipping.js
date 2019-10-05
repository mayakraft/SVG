size(1, 1);
background("#edb");

let mask = app.svg.mask();
let points = Array.from(Array(100))
  .map(() => [Math.random(), Math.random()]);

circle(Math.random(), Math.random(), 0.5)
  .fill("#e53");

polygon(points)
  .fill("#edb")
  .fillRule("evenodd");

polygon(points)
  .fill("#fff")
  .fillRule("evenodd")
  .appendTo(mask);

circle(Math.random(), Math.random(), 0.5)
  .fill("#black")
  .mask(mask);