const SVG = require("../svg");

// const svg = SVG();

test("set background", () => {
  // const svg = SVG();
  // svg.background("black", true);
  // svg.background("#332698", false);
  // expect(svg.childNodes.length).toBe(1);
  let c = SVG.circle(1,2,3)
  console.log(c.tagName);
  console.log(c.nodeName);
  expect(true).toBe(true);
});
