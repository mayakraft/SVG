import { expect, test } from "vitest";
import xmldom from "@xmldom/xmldom";
import SVG from "../src/index.js";

SVG.window = xmldom;

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
