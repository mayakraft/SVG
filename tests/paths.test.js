const SVG = require("../svg");

test("bezier", () => {
  let bez = SVG.bezier(0, 0, 25, 75, 75, 25, 100, 100);
  const d = Array.from(bez.attributes).filter(a => a.nodeName === "d").shift();
  expect(d.nodeValue).toBe("M 0,0 C 25,75 75,25 100,100");
  bez.setBezier(0, 0, 100, 0, 100, 100, 0, 100);
  const d2 = Array.from(bez.attributes).filter(a => a.nodeName === "d").shift();
  expect(d2.nodeValue).toBe("M 0,0 C 100,0 100,100 0,100");
});

test("polygon", () => {
  let poly = SVG.polygon([0, 0, 0, 1, 1, 1, 1, 0]);
  const points = Array.from(poly.attributes).filter(a => a.nodeName === "points").shift();
  expect(points.nodeValue).toBe("0,0 0,1 1,1 1,0 ");
  poly.setPoints(0, 1, 2, 3, 4, 5);
  const points2 = Array.from(poly.attributes).filter(a => a.nodeName === "points").shift();
  expect(points2.nodeValue).toBe("0,1 2,3 4,5 ");
  poly.setPoints([[0, 1], [2, 3], [4, 5]]);
  const points3 = Array.from(poly.attributes).filter(a => a.nodeName === "points").shift();
  expect(points3.nodeValue).toBe("0,1 2,3 4,5 ");
  poly.setPoints({ x: 2, y: 3 }, { x: 4, y: 5 }, { x: 6, y: 7 });
  const points4 = Array.from(poly.attributes).filter(a => a.nodeName === "points").shift();
  expect(points4.nodeValue).toBe("2,3 4,5 6,7 ");
});
