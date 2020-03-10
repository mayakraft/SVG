const SVG = require("../svg");

test("argument parsing, line", () => {
  const lines = [
    SVG.line(1,2,3,4),
    SVG.line([1,2,3,4]),
    SVG.line([[1,2,3,4]]),
    SVG.line([1,2],[3,4]),
    SVG.line([1],[2],[3],[4]),
    SVG.line({x:1,y:2}, {x:3,y:4}),
    SVG.line([{x:1,y:2}, {x:3,y:4}]),
    SVG.line([{x:1,y:2}], [{x:3,y:4}]),
    SVG.line([[{x:1,y:2}], [{x:3,y:4}]]),
  ];
  const result = lines
    .map(el => ["x1", "y1", "x2", "y2"]
      .map(attr => el.getAttribute(attr))
      .map((value, i) => value === String(i + 1))
      .reduce((a, b) => a && b, true))
    .reduce((a, b) => a && b, true);
  expect(result).toBe(true);
});

test("argument parsing, polygon", () => {
  let poly = SVG.polygon([0, 0, 0, 1, 1, 1, 1, 0]);
  expect(poly.getAttribute("points")).toBe("0,0 0,1 1,1 1,0");
  const polygons = [
    SVG.polygon(0, 1, 2, 3, 4, 5),
    SVG.polygon([0, 1], [2, 3], [4, 5]),
    SVG.polygon([[0, 1], [2, 3], [4, 5]]),
    SVG.polygon([[0, 1]], [[2, 3]], [[4, 5]]),
    SVG.polygon({x:0, y:1}, {x:2, y:3}, {x:4, y:5}),
    SVG.polygon([{x:0, y:1}, {x:2, y:3}, {x:4, y:5}]),
    SVG.polygon([{x:0, y:1}], [{x:2, y:3}], [{x:4, y:5}]),
    SVG.polygon([[{x:0, y:1}], [{x:2, y:3}], [{x:4, y:5}]]),
  ];
  const result = polygons
    .map(p => p.getAttribute("points"))
    .map(points => points === "0,1 2,3 4,5")
    .reduce((a, b) => a && b, true);
  expect(result).toBe(true);
});
