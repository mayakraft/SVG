size(256, 256);
background("#158", false);

var p = polyline().fill("none")
  .stroke("#ec3").strokeLinejoin("round").strokeLinecap("round");

var x = getWidth() / 2;
var y = getHeight() / 2;
var points = [];

svg.animate = function (event) {
  x += noise(event.time + 10);
  y += noise(event.time);

  if (x < 0) { x = -x; }
  if (y < 0) { y = -y; }
  if (x > getWidth()) { x = -x + getWidth() * 2; }
  if (y > getHeight()) { y = -y + getHeight() * 2; }

  points.push([x, y]);
  p.setPoints(points);
};
