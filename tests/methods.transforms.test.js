const SVG = require("../svg");

test("transforms", () => {
  const svg = SVG();

  const transformString = "translate(20 100) rotate(45) translate(50 50) matrix(0 -1 1 0 0 0)";

  ["svg", "g", "circle", "ellipse", "line", "path",
   "polygon", "polyline", "rect"] // , "text"
    .map(node => svg[node]()
      .translate("20 100")
      .rotate(45)
      .translate(50, 50)
      .matrix(0, -1, 1, 0, 0, 0))
    .forEach(p => expect(p.getAttribute("transform"))
      .toBe(transformString));
});

test("clear transform", () => {
  const svg = SVG();
  const l = svg.line(0, 0, 400, 400)
    .rotate(45)
    .translate(50, 50)
    .clearTransform();
  const transform = l.getAttribute("transform");
  expect(transform == null || transform === "").toBe(true);
});
