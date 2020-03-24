svg.size(-1, -1, 2, 2);
svg.background("black");

// dots and lines are separated to their own layers
var lines = svg.g().strokeWidth(0.003);
var dots = svg.g().fill("#ec3");

// the line endpoint, as vertices 0, 1, 2, 3
var i = [0, 1];
var stroke = "#158";

svg.play = function (e) {
  // every 25th frame or so, change the line color
  // and which points the line connects
  if (Math.random() < 1/25) {
    i[0] = randomInt(4);
    i[1] = randomInt(4);
    stroke = random(["#158", "#e53"]);
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
  ).stroke(stroke);

  // limit number of lines and dots
  while (dots.childNodes.length > 60) { dots.firstChild.remove(); }
  while (lines.childNodes.length > 100) { lines.firstChild.remove(); }
};
