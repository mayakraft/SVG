const SVG = require("../svg");
SVG.window = require("@xmldom/xmldom");

test("coordinates, two points", () => {
	SVG.core.coordinates(1, 2, 3, 4)
		.forEach((n, i) => expect(n).toBe([1,2,3,4][i]));
	SVG.core.coordinates([1, 2], [3, 4])
		.forEach((n, i) => expect(n).toBe([1,2,3,4][i]));
	SVG.core.coordinates([1, 2, 3], [4, 5, 6])
		.forEach((n, i) => expect(n).toBe([1,2,4,5][i]));
	SVG.core.coordinates([1], [2])
		.forEach((n, i) => expect(n).toBe([1, undefined, 2, undefined][i]));
});

test("coordinates, not two points", () => {
	expect(SVG.core.coordinates().length).toBe(0);
	expect(SVG.core.coordinates([]).length).toBe(0);
	expect(SVG.core.coordinates([[]]).length).toBe(0);
	expect(SVG.core.coordinates([], []).length).toBe(0);

	SVG.core.coordinates([1,2], [3,4], [5,6])
		.forEach((n, i) => expect(n).toBe([1, 2, 3, 4, 5, 6][i]));
})