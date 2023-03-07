const { test, expect } = require("@jest/globals");
const SVG = require("../svg.js");
SVG.window = require("@xmldom/xmldom");

test("argument parsing, polygon", () => {
	let poly = SVG.polygon([0, 0, 0, 1, 1, 1, 1, 0]);
	expect(poly.getAttribute("points")).toBe("0,0 0,1 1,1 1,0");
	const polygons = [
		SVG.polygon(0, 1, 2, 3, 4, 5),
		SVG.polygon([0, 1], [2, 3], [4, 5]),
		SVG.polygon([[0, 1], [2, 3], [4, 5]]),
		SVG.polygon([[0, 1]], [[2, 3]], [[4, 5]]),
		SVG.polygon({ x: 0, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 5 }),
		SVG.polygon([{ x: 0, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 5 }]),
		SVG.polygon([0, 1, 9], [2, 3, 9], [4, 5, 9]),
		SVG.polygon([[0, 1, 9], [2, 3, 9], [4, 5, 9]]),
		SVG.polygon([[0, 1, 9]], [[2, 3, 9]], [[4, 5, 9]]),
		SVG.polygon({ x: 0, y: 1, z: 9 }, { x: 2, y: 3, z: 9 }, { x: 4, y: 5, z: 9 }),
		// SVG.polygon([{x:0, y:1}], [{x:2, y:3}], [{x:4, y:5}]),
		// SVG.polygon([[{x:0, y:1}], [{x:2, y:3}], [{x:4, y:5}]]),
	];
	const result = polygons
		.map(p => p.getAttribute("points"))
		.map(points => points === "0,1 2,3 4,5")
		.reduce((a, b) => a && b, true);
	expect(result).toBe(true);
});

test("polygon point methods", () => {
	const poly = SVG.polygon([0, 0, 0, 1, 1, 1, 1, 0]);
	expect(poly.getAttribute("points")).toBe("0,0 0,1 1,1 1,0");
	poly.addPoint(6, 7);
	expect(poly.getAttribute("points")).toBe("0,0 0,1 1,1 1,0 6,7");
	poly.addPoint([3, 4]);
	expect(poly.getAttribute("points")).toBe("0,0 0,1 1,1 1,0 6,7 3,4");
});
