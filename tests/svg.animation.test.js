const SVG = require("../svg");

test("animation", () => {
  const svg = SVG();
  svg.play = e => {};
  svg.stop();
});
