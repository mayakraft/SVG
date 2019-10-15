size(600, 600);
background("#edb");

function dragon(x1, y1, x2, y2, turn, i) {
  if (i < 0) { return [[x1, y1], [x2, y2]]; }
  var midX = x1 + (x2 - x1) * 0.5 + turn * (y2 - y1) * 0.5;
  var midY = y1 + (y2 - y1) * 0.5 + (-1 * turn) * (x2 - x1) * 0.5;
  var first = dragon(x1, y1, midX, midY, 1, i - 1);
  if (first.length > 1) { first.pop(); }
  return first.concat(dragon(midX, midY, x2, y2, -1, i - 1));
}

var attrs = { strokeLinecap: "square", fill: "none" };

var x1 = getWidth() * 0.225;
var y1 = getHeight() * 0.6;
var x2 = getWidth() * 0.85;
var y2 = getHeight() * 0.6;
var i1 = random(3); 
var i2 = random(3, 6);
var i3 = random(6, 9);
var i4 = random(8, 11);

polyline(dragon(x1, y1, x2, y2, 1, i1))
  .setAttributes(attrs).stroke("#ec3").strokeWidth(81);
polyline(dragon(x1, y1, x2, y2, 1, i2))
  .setAttributes(attrs).stroke("#158a").strokeWidth(27);
polyline(dragon(x1, y1, x2, y2, 1, i3))
  .setAttributes(attrs).stroke("#e53").strokeWidth(9);
polyline(dragon(x1, y1, x2, y2, 1, i4))
  .setAttributes(attrs).stroke("#158").strokeWidth(3);
