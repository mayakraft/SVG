const { test, expect } = require("@jest/globals");
const SVG = require("../svg");
SVG.window = require("@xmldom/xmldom");

test("animation", () => {
	const svg = SVG();
	svg.play = e => {};
	svg.stop();
});
