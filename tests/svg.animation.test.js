import { expect, test } from "vitest";
import xmldom from "@xmldom/xmldom";
import SVG from "../src/index.js";

SVG.window = xmldom;

test("animation", () => {
	const svg = SVG();
	svg.play = e => {};
	svg.stop();
});
