size(600, 600);

function dragon(a, b, turn, level) {
  if (level < 0) {
    return [a, b];
  }
  var vector = { x: b.x - a.x, y: b.y - a.y };
  var midPt = {
    x: a.x + vector.x * 0.5 + turn * vector.y * 0.5,
    y: a.y + vector.y * 0.5 + (-1 * turn) * vector.x * 0.5
  };
  var first = dragon(a, midPt, 1, level - 1);
  var second = dragon(midPt, b, -1, level - 1);
  if (first.length > 1) { first.pop(); }
  return first.concat(second);
}

var a = {x: getWidth() * 0.225, y: getHeight() * 0.6 };
var b = {x: getWidth() * 0.85, y: getHeight() * 0.6 };

var attrs = {
  strokeLinecap: "square",
  fill: "none"
};

var i1 = Math.floor(Math.random() * 3); 
var i2 = Math.floor(Math.random() * 3) + 3;
var i3 = Math.floor(Math.random() * 3) + 6;
var i4 = Math.floor(Math.random() * 3) + 8;

polyline(dragon(a, b, 1, i1)).setAttributes(attrs)
  .stroke("#ec3").strokeWidth(90).opacity(0.5);
polyline(dragon(a, b, 1, i2)).setAttributes(attrs)
  .stroke("#158").strokeWidth(40).opacity(0.5);
polyline(dragon(a, b, 1, i3)).setAttributes(attrs)
  .stroke("#e53").strokeWidth(13).opacity(0.8);
polyline(dragon(a, b, 1, i1)).setAttributes(attrs)
  .stroke("#ec3").strokeWidth(6);
polyline(dragon(a, b, 1, i4)).setAttributes(attrs)
  .stroke("#158").strokeWidth(2);
