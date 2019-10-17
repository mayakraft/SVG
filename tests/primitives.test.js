const SVG = require("../svg");

test("svg and group", () => {
  const svg = SVG();
  svg.appendChild(SVG.group());
  expect(svg.childNodes.length).toBe(1);
});

test("all primitives", () => {
  const group = SVG.group();
  group.appendChild(SVG.line(0, 1, 2, 3));
  group.appendChild(SVG.rect(0, 1, 2, 3));
  group.appendChild(SVG.circle(0, 1, 2));
  group.appendChild(SVG.ellipse(0, 1, 2));
  group.appendChild(SVG.polygon([[0, 1], [2, 3], [4, 5]]));
  group.appendChild(SVG.polyline([[0, 1], [2, 3], [4, 5]]));
  group.appendChild(SVG.bezier(0, 1, 2, 3, 4, 5, 6, 7));
  group.appendChild(SVG.text("abc", 0, 1));
  group.appendChild(SVG.arc(0, 1, 2, 3, 4));
  group.appendChild(SVG.wedge(0, 1, 2, 3, 4));
  group.appendChild(SVG.arcEllipse(0, 1, 2, 3, 4, 5));
  group.appendChild(SVG.wedgeEllipse(0, 1, 2, 3, 4, 5));
  group.appendChild(SVG.arcArrow([0, 1], [2, 3], {}));
  group.appendChild(SVG.straightArrow([0, 1], [2, 3], {}));
  const nodeNames = ["line", "rect", "circle", "ellipse", "polygon", "polyline", "path", "text", "path", "path", "path", "path", "g", "g"];
  Array.from(group.childNodes).forEach((el, i) => {
    expect(el.nodeName).toBe(nodeNames[i]);
  });
  expect(group.childNodes.length).toBe(14);
});
