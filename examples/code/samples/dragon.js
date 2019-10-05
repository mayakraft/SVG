size(600, 600);

function dragon(a, b, turn, level) {
  if (level < 0) {
    return [a, b];
  }
  let vector = { x: b.x - a.x, y: b.y - a.y };
  let midPt = {
    x: a.x + vector.x * 0.5 + turn * vector.y * 0.5,
    y: a.y + vector.y * 0.5 + (-1 * turn) * vector.x * 0.5
  };
  let first = dragon(a, midPt, 1, level - 1);
  let second = dragon(midPt, b, -1, level - 1);
  if (first.length > 1) { first.pop(); }
  return first.concat(second);
}

let a = {x: app.svg.w * 0.225, y: app.svg.h * 0.6 };
let b = {x: app.svg.w * 0.85, y: app.svg.h * 0.6 };

polyline(dragon(a, b, 1, 4))
  .fill("none").stroke("#158").opacity(0.5).strokeWidth(40);
polyline(dragon(a, b, 1, 7))
  .fill("none").stroke("#e53").opacity(0.8).strokeWidth(13);
polyline(dragon(a, b, 1, 1))
  .fill("none").stroke("#ec3").opacity(0.5).strokeWidth(90);
polyline(dragon(a, b, 1, 10))
  .fill("none").stroke("#158").opacity(1).strokeWidth(2);
