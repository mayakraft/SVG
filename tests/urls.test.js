const { test, expect } = require("@jest/globals");
const SVG = require("../svg.js");
SVG.window = require("@xmldom/xmldom");

test("custom id names", () => {
	["clipPath", "symbol", "mask", "marker"].forEach(nodeName => {
		const svg = SVG();
		const test1 = svg[nodeName]();
		const test2 = svg[nodeName]("what is");
		expect(test1.getAttribute("id").length).toBe(5);
		expect(test2.getAttribute("id")).toBe("what is");
	});
});

test("assign to types", () => {
	const svg = SVG();
	const things = ["clipPath", "symbol", "mask", "marker", "marker", "marker"]
		.map(nodeName => svg[nodeName]());
	const line = svg.line(1, 2, 3, 4);
	["clipPath", "mask", "symbol", "markerEnd", "markerMid", "markerStart"]
		.forEach((method, i) => line[method](things[i]));

	// these should be the attributes
	["x1", "y1", "x2", "y2", "clip-path", "mask", "symbol", "marker-end", "marker-mid", "marker-start"]
		.forEach((attr, i) => expect(line.attributes[i].name).toBe(attr));
});
