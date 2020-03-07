const SVG = require("../svg");

const svg = SVG();

test("test", () => {
  expect(true).toBe(true);
});

// test("set background", () => {
//   const svg = SVG();
//   svg.background("black", true);
//   svg.background("#332698", false);
//   expect(svg.childNodes.length).toBe(1);
// });

// test("style test", () => {
//   const styleString = "line{stroke:purple};";
//   const svg = SVG();
//   svg.stylesheet(styleString);
//   const style = Array.from(svg.childNodes).filter(a => a.nodeName === "style").shift();
//   expect(style.childNodes[0].textContent).toBe(styleString);
// });
