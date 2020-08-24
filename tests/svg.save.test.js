const SVG = require("../svg");

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

test("svg export", () => {
  const svg = SVG();
  svg.line(0, 0, 300, 150).stroke("black").strokeWidth(5);
  const asString = svg.save();
  const asSvg = svg.save({output: "svg"});
  const expectedString = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
	<line x1="0" y1="0" x2="300" y2="150" stroke="black" stroke-width="5"/>
</svg>`;
  // const expectedString = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="300" y2="150" stroke="black" stroke-width="5"/></svg>`;
  expect(asString).toBe(expectedString);
  expect(asSvg.childNodes.length).toBe(1);
  expect(asSvg.childNodes[0].nodeName).toBe("line");
});

