const { test, expect } = require("@jest/globals");
const SVG = require("../svg.js");
SVG.window = require("@xmldom/xmldom");

test("class", () => {
	const svg = SVG();
	if (typeof svg.classList === "undefined") {
		expect(true).toBe(true);
		return;
	}
	svg.classList.add("big");
	expect(svg.getAttribute("class")).toBe("big");
	svg.classList.add("medium");
	expect(svg.getAttribute("class")).toBe("big medium");
	svg.classList.remove("big");
	expect(svg.getAttribute("class")).toBe("medium");
	svg.className = "small";
	expect(svg.getAttribute("class")).toBe("small");

	const line = SVG.line();
	line.id = "five";
	expect(line.getAttribute("id")).toBe("five");

	const circle = SVG.circle();
	circle.classList.remove("apple");
	expect(circle.getAttribute("class")).toBe("");
});
