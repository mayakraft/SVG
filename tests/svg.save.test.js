const SVG = require("../svg");

test("set background", () => {
  const svg = SVG();
  svg.background("black", true);
  svg.background("#332698", false);
  expect(svg.childNodes.length).toBe(1);
});

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


test("svg export with comments", () => {
  const svgString = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <!-- this is a comment-->
    <line x1="0" y1="0" x2="300" y2="150" stroke="black" stroke-width="5"/>
  <!--a comment with <xml> things <inside/> </inside>< ></ >< / > it-->
</svg>`;
  const svg = SVG(svgString);
  const asSvg = svg.save({output: "svg"});
  expect(asSvg.childNodes.length).toBe(3);
  expect(asSvg.childNodes[0].nodeName).toBe("#comment");
  expect(asSvg.childNodes[1].nodeName).toBe("line");
  expect(asSvg.childNodes[2].nodeName).toBe("#comment");
});

