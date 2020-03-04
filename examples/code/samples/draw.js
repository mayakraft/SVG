svg.size(100, 100);

var points = [];

var p = svg.polygon()
  .fillRule("evenodd")
  .fill("#e53")
  .stroke("#158");

svg.mouseMoved = function (mouse) {
  points.push(mouse);
  if (points.length > 100) { points.shift(); }
  p.setPoints(points);
};

// draw!
