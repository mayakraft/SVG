const SVG = require("../svg");

test("style test", () => {
  const styleString = "line{stroke:purple};";
  const svg = SVG();
  svg.stylesheet(styleString);
  const style = Array.from(svg.childNodes).filter(a => a.tagName === "style").shift();
  expect(style.childNodes[0].textContent).toBe(styleString);
});
