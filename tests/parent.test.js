const SVG = require("../svg");
const { DOMParser } = require("xmldom");

test("no parent", () => {
	const svg = SVG(600, 600);
	expect(svg.parentNode).toBe(null);
});

test("parent element", () => {
	const parent = (new DOMParser()).parseFromString("<div></div>", "text/xml").documentElement;
	const svg = SVG(600, 600, parent);
	expect(svg.parentNode.nodeName).toBe("div");
});
