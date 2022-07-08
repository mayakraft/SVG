const { test, expect } = require("@jest/globals");
const SVG = require("../svg");
SVG.window = require("@xmldom/xmldom");

test("circle arguments", () => {
	expect(SVG.circle(1).getAttribute("r")).toBe("1");
	expect(SVG.circle(5).getAttribute("r")).toBe("5");
	expect(SVG.circle(2, 3).getAttribute("cx")).toBe("2");
	expect(SVG.circle(2, 3).getAttribute("cy")).toBe("3");
	expect(SVG.circle(2, 3).getAttribute("r") === null
		|| SVG.circle(2, 3).getAttribute("r") === "").toBe(true);

	expect(SVG.circle(1, 2, 3).getAttribute("cx")).toBe("1");
	expect(SVG.circle(1, 2, 3).getAttribute("cy")).toBe("2");
	expect(SVG.circle(1, 2, 3).getAttribute("r")).toBe("3");

	expect(parseFloat(SVG.circle(1, 2, 3, 4).getAttribute("r")))
		.toBeCloseTo(2 * Math.sqrt(2));
	expect(SVG.circle(1, 2, 3, 4).getAttribute("cx")).toBe("1");
	expect(SVG.circle(1, 2, 3, 4).getAttribute("cy")).toBe("2");
});

test("circle setters", () => {
	expect(SVG.circle().radius(5).getAttribute("r")).toBe("5");
	expect(SVG.circle().setRadius(5).getAttribute("r")).toBe("5");
	expect(SVG.circle().origin(2, 3).getAttribute("cx")).toBe("2");
	expect(SVG.circle().origin(2, 3).getAttribute("cy")).toBe("3");
	expect(SVG.circle().setOrigin(2, 3).getAttribute("cx")).toBe("2");
	expect(SVG.circle().setOrigin(2, 3).getAttribute("cy")).toBe("3");
	expect(SVG.circle().center(2, 3).getAttribute("cx")).toBe("2");
	expect(SVG.circle().center(2, 3).getAttribute("cy")).toBe("3");
	expect(SVG.circle().setCenter(2, 3).getAttribute("cx")).toBe("2");
	expect(SVG.circle().setCenter(2, 3).getAttribute("cy")).toBe("3");
	expect(SVG.circle().position(2, 3).getAttribute("cx")).toBe("2");
	expect(SVG.circle().position(2, 3).getAttribute("cy")).toBe("3");
	expect(SVG.circle().setPosition(2, 3).getAttribute("cx")).toBe("2");
	expect(SVG.circle().setPosition(2, 3).getAttribute("cy")).toBe("3");

	const attrs = ["cx", "cy"];
	let c = SVG.circle();
	c.setCenter(1, 2, 3, 4);
	attrs.forEach((attr, i) => expect(c.getAttribute(attr)).toBe(String([1, 2][i])));
	expect(c.attributes.length).toBe(2);

	c.setRadius(10);
	attrs.forEach((attr, i) => expect(c.getAttribute(attr)).toBe(String([1, 2][i])));
	expect(c.getAttribute("r")).toBe("10");
	expect(c.attributes.length).toBe(3);
});
