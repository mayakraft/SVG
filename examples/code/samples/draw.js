svg.size(100, 100);

var points = [];

var p = svg.polygon()
  .fillRule("evenodd")
  .fill("#e53")
  .stroke("#158");

svg.onMove = function (mouse) {
  points.push([mouse.x, mouse.y]);
  if (points.length > 100) { points.shift(); }
  p.setPoints(points);
};

// draw!
