const { test, expect } = require("@jest/globals");
const SVG = require("../svg");
SVG.window = require("@xmldom/xmldom");

test("class", () => {
	const svg = SVG();
	svg.addClass("big");
	expect(svg.getAttribute("class")).toBe("big");
	svg.addClass("medium");
	expect(svg.getAttribute("class")).toBe("big medium");
	svg.removeClass("big");
	expect(svg.getAttribute("class")).toBe("medium");
	svg.setClass("small");
	expect(svg.getAttribute("class")).toBe("small");

	const line = SVG.line();
	line.setId("five");
	expect(line.getAttribute("id")).toBe("five");

	const circle = SVG.circle();
	circle.removeClass("apple");
	expect(circle.getAttribute("class")).toBe("");
});
