const SVG = require("../svg");

test("svg and group", () => {
  const svg = SVG();
  svg.appendChild(SVG.g());
  expect(svg.childNodes.length).toBe(1);
});

test("all primitives", () => {
  const group = SVG.g();
  group.appendChild(SVG.line(0, 1, 2, 3));
  group.appendChild(SVG.rect(0, 1, 2, 3));
  group.appendChild(SVG.circle(0, 1, 2));
  group.appendChild(SVG.ellipse(0, 1, 2));
  group.appendChild(SVG.polygon([[0, 1], [2, 3], [4, 5]]));
  group.appendChild(SVG.polyline([[0, 1], [2, 3], [4, 5]]));
  group.appendChild(SVG.text("abc", 0, 1));
  const nodeNames = ["line", "rect", "circle", "ellipse", "polygon", "polyline", "text"];
  Array.from(group.childNodes).forEach((el, i) => {
    expect(el.nodeName).toBe(nodeNames[i]);
  });
  expect(group.childNodes.length).toBe(7);
});


// test("custom primitives", () => {
//   const group = SVG.g();
//   group.appendChild(SVG.bezier(0, 1, 2, 3, 4, 5, 6, 7));
//   group.appendChild(SVG.arc(0, 1, 2, 3, 4));
//   group.appendChild(SVG.wedge(0, 1, 2, 3, 4));
//   group.appendChild(SVG.arcEllipse(0, 1, 2, 3, 4, 5));
//   group.appendChild(SVG.wedgeEllipse(0, 1, 2, 3, 4, 5));
//   group.appendChild(SVG.arrow([0, 1], [2, 3]));
//   const nodeNames = ["path", "path", "path", "path", "path", "g"];
//   Array.from(group.childNodes).forEach((el, i) => {
//     expect(el.nodeName).toBe(nodeNames[i]);
//   });
//   expect(group.childNodes.length).toBe(6);
// });
