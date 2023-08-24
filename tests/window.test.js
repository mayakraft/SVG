const { test, expect } = require("@jest/globals");
const xmldom = require("@xmldom/xmldom");
const SVG = require("../svg.js");

SVG.window = xmldom;

test("environment", () => {
	expect(true).toBe(true);
});
