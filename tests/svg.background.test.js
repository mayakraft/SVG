const { test, expect } = require("@jest/globals");
const SVG = require("../svg.js");
SVG.window = require("@xmldom/xmldom");

test("set background", () => {
	const svg = SVG();
	svg.background("black", true);
	svg.background("#332698", false);
	expect(svg.childNodes.length).toBe(1);
});
