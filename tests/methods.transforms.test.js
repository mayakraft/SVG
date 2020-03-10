const SVG = require("../svg");

test("transforms", () => {
  let svg = SVG();
  let l = svg.line(0, 0, 400, 400)
    .translate("20 100")
    .rotate(45)
    .translate(50, 50)
    .matrix(0, -1, 1, 0, 0, 0);
  expect(l.getAttribute("transform"))
    .toBe("translate(20 100) rotate(45) translate(50 50) matrix(0 -1 1 0 0 0)");
});

test("clear transform", () => {
  let svg = SVG();
  let l = svg.line(0, 0, 400, 400)
    .rotate(45)
    .translate(50, 50)
    .clearTransform();
  const transform = l.getAttribute("transform");
  expect(transform == null || transform === "").toBe(true);
});
