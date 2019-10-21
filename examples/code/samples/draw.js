size(100, 100);
background("#edb");

var points = [];

var p = polygon()
  .fillRule("evenodd")
  .fill("#e53")
  .stroke("#158")
  .strokeLinecap("round");

mouseMoved = function (mouse) {
  points.push(mouse);
  if (points.length > 100) { points.shift(); }
  p.setPoints(points);
};

// draw!
