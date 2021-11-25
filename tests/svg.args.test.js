const SVG = require("../svg");
const { DOMParser } = require("@xmldom/xmldom");

test("argument parsing, svg", () => {
  const svg0 = SVG();
  const vb0 = svg0.getAttribute("viewBox");
  expect(vb0 == null || vb0 === "").toBe(true);

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

test("svg embed as string", () => {
  // this string contains \n newlines, the load method targets and removes them
  // by testing the <line> element at [0] this is also testing the newline removal
  const svgString = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="0" x2="300" y2="150" stroke="black" stroke-width="5"/>
</svg>`;
  const svg = SVG(svgString);
  expect(svg.childNodes.length).toBe(1);
  expect(svg.childNodes[0].nodeName).toBe("line");
})