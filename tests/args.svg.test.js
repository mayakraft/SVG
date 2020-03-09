const SVG = require("../svg");
const { DOMParser } = require("xmldom");

test("argument parsing, svg", () => {
  const svg1 = SVG(400, 500);
  expect(svg1.getAttribute("viewBox")).toBe("0 0 400 500");

  const svg2 = SVG(1, 2, 400, 500);
  expect(svg2.getAttribute("viewBox")).toBe("1 2 400 500");

  const svg3 = SVG(1, 400, 500);
  const vb3 = svg3.getAttribute("viewBox");
  expect(vb3 == null || vb3 === "").toBe(true);
});

test("no parent", () => {
  const svg = SVG(600, 600);
  expect(svg.parentNode).toBe(null);
});

test("parent element", () => {
  const parent = (new DOMParser()).parseFromString("<div></div>", "text/xml").documentElement;
  const svg = SVG(600, 600, parent);
  expect(svg.parentNode.nodeName).toBe("div");
});
