import { expect, test } from "vitest";
import xmldom from "@xmldom/xmldom";
import SVG from "../src/index.js";

SVG.window = xmldom;

test("removeChildren()", () => {
	const svg = SVG();
	svg.line(1, 2, 3, 4);
	expect(svg.childNodes.length).toBe(1);
	svg.removeChildren();
	expect(svg.childNodes.length).toBe(0);
});

// test("appendTo()", () => {
// 	const svg = SVG();
// 	expect(svg.childNodes.length).toBe(0);
// 	const line = SVG.line();
// 	const circle = SVG.circle();
// 	const ellipse = SVG.ellipse();
// 	const rect = SVG.rect();
// 	const path = SVG.path();
// 	const polygon = SVG.polygon();
// 	const polyline = SVG.polyline();
// 	const group = SVG.g();
// 	[line, circle, ellipse, rect, path, polygon, polyline, group]
// 		.forEach(primitive => primitive.appendTo(svg));
// 	expect(svg.childNodes.length).toBe(8);
// });

// test("setAttributes()", () => {
// 	const props = { a: "10", display: "block", style: "color:red" };
// 	const line = SVG.line();
// 	line.setAttributes(props);
// 	expect(line.getAttribute("display")).toBe("block");
// 	const group = SVG.g();
// 	group.setAttributes(props);
// 	expect(group.getAttribute("style")).toBe("color:red");
// 	const svg = SVG();
// 	svg.setAttributes(props);
// 	expect(svg.getAttribute("display")).toBe("block");
// });
