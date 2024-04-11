import { expect, test } from "vitest";
import xmldom from "@xmldom/xmldom";
import SVG from "../src/index.js";

SVG.window = xmldom;

test("parseTransform", () => {
	const transformString = "translate(20 100) rotate(45) scale(2 1) matrix(0 -1 1 0 0 0)";
	const result = SVG.parseTransform(transformString);
	["translate", "rotate", "scale", "matrix"]
		.forEach((name, i) => expect(result[i].transform).toBe(name));
});

test("transformStringToMatrix", () => {
	const transformString = "translate(20 100) rotate(45) scale(2 1) matrix(0 -1 1 0 0 0)";
	expect(SVG.transformStringToMatrix(transformString).length).toBe(6);

	const transformString2 = "translate(20) skewX(4) rotate(45 2 3) skewY(2) scale(2)";
	expect(SVG.transformStringToMatrix(transformString2).length).toBe(6);
});

test("transformStringToMatrix bad input", () => {
	const transformString = "translate() rotate() scale() skewX() skewY()";
	expect(SVG.transformStringToMatrix(transformString).length).toBe(6);
});

test("transforms", () => {
	const svg = SVG();

	const transformString = "translate(20 100) rotate(45) translate(50 50) matrix(0 -1 1 0 0 0)";

	["svg", "g", "circle", "ellipse", "line", "path", "polygon", "polyline", "rect"]
	// , "text"
		.map(node => svg[node]()
			.translate("20 100")
			.rotate(45)
			.translate(50, 50)
			.matrix(0, -1, 1, 0, 0, 0))
		.forEach(p => expect(p.getAttribute("transform"))
			.toBe(transformString));
});

test("clear transform", () => {
	const svg = SVG();
	const l = svg.line(0, 0, 400, 400)
		.rotate(45)
		.translate(50, 50)
		.clearTransform();
	const transform = l.getAttribute("transform");
	expect(transform == null || transform === "").toBe(true);
});
