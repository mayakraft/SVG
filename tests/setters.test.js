const SVG = require("../svg");

test("line setters", () => {
  const attrs = ["x1", "y1", "x2", "y2"];

  let l = SVG.line();
  l.setPoints(1,2,3,4);
  attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1,2,3,4][i])));

  l.setPoints([[1,2,3,4]]);
  attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1,2,3,4][i])));

  l.setPoints([[1,2],[3,4],5,[6,7]]);
  attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1,2,3,4][i])));
  expect(l.attributes.length).toBe(4);

  // this will not work
  l.setPoints("9", "8", "7", "6");
  attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1, 2, 3, 4][i])));

  l.setPoints({x:5, y:6}, {x:7, y:8}, {x:9, y:10});
  attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([5, 6, 7, 8][i])));
  expect(l.attributes.length).toBe(4);
});

test("circle setters", () => {
  const attrs = ["cx", "cy"];
  let c = SVG.circle();
  c.setCenter(1,2,3,4);
  attrs.forEach((attr, i) => expect(c.getAttribute(attr)).toBe(String([1,2][i])));
  expect(c.attributes.length).toBe(2);

  c.setRadius(10);
  attrs.forEach((attr, i) => expect(c.getAttribute(attr)).toBe(String([1,2][i])));
  expect(c.getAttribute("r")).toBe("10");
  expect(c.attributes.length).toBe(3);
});


// test("ellipse setters", () => {
//   const attrs = ["cx", "cy"];
//   let c = SVG.circle();
//   c.setCenter(1,2,3,4);
//   attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1,2,3,4][i])));
//   expect(l.attributes.length).toBe(4);
// });


// test("path setters", () => {
// });

// test("polyline setters", () => {
// });

// test("polygon setters", () => {
// });
