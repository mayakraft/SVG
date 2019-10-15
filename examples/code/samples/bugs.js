size(-1, -1, 2, 2);

svg.animate = function (e) {
  removeChildren();
  circle(noise(e.time + 10), noise(e.time + 90), 0.01).fill("#eb4");
  circle(noise(e.time + 20), noise(e.time + 80), 0.01).fill("#eb4");
  circle(noise(e.time + 30), noise(e.time + 70), 0.01).fill("#eb4");
  circle(noise(e.time + 40), noise(e.time + 60), 0.01).fill("#eb4");
};
