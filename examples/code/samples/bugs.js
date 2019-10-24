size(-1, -1, 2, 2);

var lines = group().stroke("#888").strokeWidth(0.003);
var dots = group().fill("#ec3");
var i = [0, 1];

animate = function (e) {
  if (Math.random() < 0.04) {
    i[0] = Math.floor(Math.random() * 4);
    i[1] = Math.floor(Math.random() * 4);
  }
  dots.circle(noise(e.time + 0), noise(e.time + 100), 0.01);
  dots.circle(noise(e.time + 10), noise(e.time + 90), 0.01);
  dots.circle(noise(e.time + 20), noise(e.time + 80), 0.01);
  dots.circle(noise(e.time + 30), noise(e.time + 70), 0.01);
  lines.line(
    noise(e.time + 10 * i[0]),
    noise(e.time + 100 - 10 * i[0]),
    noise(e.time + 10 * i[1]),
    noise(e.time + 100 - 10 * i[1])
  );

  while (dots.childNodes.length > 60) {
    dots.firstChild.remove();
  }
  while (lines.childNodes.length > 100) {
    lines.firstChild.remove();
  }
};
