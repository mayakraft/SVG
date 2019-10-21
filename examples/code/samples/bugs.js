size(-1, -1, 2, 2);

animate = function (e) {
  circle(noise(e.time + 10), noise(e.time + 90), 0.01).fill("#ec3");
  circle(noise(e.time + 20), noise(e.time + 80), 0.01).fill("#ec3");
  circle(noise(e.time + 30), noise(e.time + 70), 0.01).fill("#ec3");
  circle(noise(e.time + 40), noise(e.time + 60), 0.01).fill("#ec3");

  while (svg.childNodes.length > 60) {
    svg.firstChild.remove();
  }
};
