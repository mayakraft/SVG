const SVG = require("../svg");

test("set background", () => {
  const svg = SVG();
  svg.background("black", true);
  svg.background("#332698", false);
  expect(svg.childNodes.length).toBe(1);
});
