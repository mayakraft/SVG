import { expect, test } from "vitest";
import xmldom from "@xmldom/xmldom";
import SVG from "../src/index.js";

SVG.window = xmldom;

test("set background", () => {
	const svg = SVG();
	svg.background("black", true);
	svg.background("#332698", false);
	expect(svg.childNodes.length).toBe(1);
});
