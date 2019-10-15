size(256, 256);
background("#158", false);
svg.fps = 12;

var p = polyline().fill("none")
  .stroke("#ec3").strokeLinejoin("round").strokeLinecap("round");

var penX = getWidth() / 2;
var penY = getHeight() / 2;
var points = [];

svg.animate = function (event) {
  var step = Math.sin(event.time) * getWidth() / 5;
  penX += random(-step, step);
  penY += random(-step, step);

  if (penX < 0) { penX = -penX; }
  if (penY < 0) { penY = -penY; }
  if (penX > getWidth()) { penX = -penX + getWidth() * 2; }
  if (penY > getHeight()) { penY = -penY + getHeight() * 2; }

  points.push([penX, penY]);
  p.setPoints(points);
};