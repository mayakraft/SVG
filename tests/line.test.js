const { test, expect } = require("@jest/globals");
const SVG = require("../svg.js");
SVG.window = require("@xmldom/xmldom");

test("argument parsing, line", () => {
	const lines = [
		SVG.line(1, 2, 3, 4),
		SVG.line([1, 2, 3, 4]),
		SVG.line([[1, 2, 3, 4]]),
		SVG.line([1, 2], [3, 4]),
		SVG.line({ x: 1, y: 2 }, { x: 3, y: 4 }),
		SVG.line([{ x: 1, y: 2 }, { x: 3, y: 4 }]),
		SVG.line([1, 2, 9], [3, 4, 9]),
		SVG.line([[1, 2, 9], [3, 4, 9]]),
		SVG.line({ x: 1, y: 2, z: 9 }, { x: 3, y: 4, z: 9 }),
	];
	// SVG.line([1], [2], [3], [4]),
	// SVG.line([{x:1, y:2}], [{x:3, y:4}]),
	// SVG.line([[{x:1, y:2}], [{x:3, y:4}]]),
	const result = lines
		.map(el => ["x1", "y1", "x2", "y2"]
			.map(attr => el.getAttribute(attr))
			.map((value, i) => value === String(i + 1))
			.reduce((a, b) => a && b, true))
		.reduce((a, b) => a && b, true);
	expect(result).toBe(true);
});

test("line arguments, missing arguments", () => {
	const result1 = SVG.line(1, 2, 3);
	expect(result1.getAttribute("x2")).toBe("3");
	expect(result1.getAttribute("y2")).toBe("");

	const result2 = SVG.line({ x: 1, y: 2 }, { x: 3 });
	expect(result2.getAttribute("x2")).toBe("3");
	// expect(result2.getAttribute("y2")).toBe("");
});

test("line setters", () => {
	const attrs = ["x1", "y1", "x2", "y2"];

	let l = SVG.line();
	l.setPoints(1, 2, 3, 4);
	attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1, 2, 3, 4][i])));

	l.setPoints([[1, 2, 3, 4]]);
	attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1, 2, 3, 4][i])));

	l.setPoints([[1, 2], [3, 4]]);
	attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1, 2, 3, 4][i])));
	expect(l.attributes.length).toBe(4);

	// this will not work
	l.setPoints([[1, 2], [3, 4], 5, [6, 7]]);
	// attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1, 2, 3, 4][i])));
	// expect(l.attributes.length).toBe(4);

	// this will not work
	l.setPoints("9", "8", "7", "6");
	// attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([1, 2, 3, 4][i])));

	l.setPoints({ x: 5, y: 6 }, { x: 7, y: 8 }, { x: 9, y: 10 });
	attrs.forEach((attr, i) => expect(l.getAttribute(attr)).toBe(String([5, 6, 7, 8][i])));
	expect(l.attributes.length).toBe(4);
});
