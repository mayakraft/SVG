svg.size(600, 600);
svg.background("white", true);

function dragon(x1, y1, x2, y2, turn, i) {
  if (i < 0) { return [[x1, y1], [x2, y2]]; }
  var midX = x1 + (x2 - x1) * 0.5 + turn * (y2 - y1) * 0.5;
  var midY = y1 + (y2 - y1) * 0.5 + (-1 * turn) * (x2 - x1) * 0.5;
  var first = dragon(x1, y1, midX, midY, 1, i - 1);
  if (first.length > 1) { first.pop(); }
  return first.concat(dragon(midX, midY, x2, y2, -1, i - 1));
}

var attrs = { strokeLinecap: "square", fill: "none" };

var x1 = svg.getWidth() * 0.25;
var y1 = svg.getHeight() * 0.6;
var x2 = svg.getWidth() * 0.85;
var y2 = svg.getHeight() * 0.6;

svg.polyline(dragon(x1, y1, x2, y2, 1, random(4, 8)))
  .setAttributes(attrs).stroke("#ec3").strokeWidth(7);
svg.polyline(dragon(x1, y1, x2, y2, 1, random(10, 12)))
  .setAttributes(attrs).stroke("#158").strokeWidth(3);
