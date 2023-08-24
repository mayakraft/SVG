const { test, expect } = require("@jest/globals");
const SVG = require("../svg.js");

test("colors hexToRgb", () => {
	const rgb1 = SVG.hexToRgb("#158");
	const rgb2 = SVG.hexToRgb("#115588");
	expect(JSON.stringify(rgb1)).toBe(JSON.stringify(rgb2));
	[17, 85, 136]
		.forEach((value, i) => expect(value).toBeCloseTo(rgb1[i]));
});

test("colors hslToRgb", () => {
	const rgb1 = SVG.hslToRgb(0, 0, 100);
	const rgb2 = SVG.hslToRgb(0, 100, 100);
	expect(JSON.stringify(rgb1)).toBe(JSON.stringify(rgb2));
});

test("colors hslToRgb 2", () => {
	const colorR = SVG.hslToRgb(0, 100, 50);
	[255, 0, 0].forEach((value, i) => expect(value).toBeCloseTo(colorR[i]));
	const colorG = SVG.hslToRgb(120, 100, 50);
	[0, 255, 0].forEach((value, i) => expect(value).toBeCloseTo(colorG[i]));
	const colorB = SVG.hslToRgb(240, 100, 50);
	[0, 0, 255].forEach((value, i) => expect(value).toBeCloseTo(colorB[i]));
});

test("parseColorToRgb", () => {
	const color1 = SVG.parseColorToRgb("red");
	const color2 = SVG.parseColorToRgb("#f00");
	const color3 = SVG.parseColorToRgb("#ff0000");
	const color4 = SVG.parseColorToRgb("rgb(255, 0, 0)");
	const color5 = SVG.parseColorToRgb("hsl(0, 100%, 50%)");
	const colorAlpha1 = SVG.parseColorToRgb("rgba(255, 0, 0, 1)");
	const colorAlpha2 = SVG.parseColorToRgb("hsla(0, 100%, 50%, 1)");
	expect(JSON.stringify(color1)).toBe(JSON.stringify(color2));
	expect(JSON.stringify(color1)).toBe(JSON.stringify(color3));
	expect(JSON.stringify(color1)).toBe(JSON.stringify(color4));
	expect(JSON.stringify(color1)).toBe(JSON.stringify(color5));
	expect(JSON.stringify(colorAlpha1)).toBe(JSON.stringify(colorAlpha2));
	expect(JSON.stringify(color1)).not.toBe(JSON.stringify(colorAlpha1));
});

test("empty parseColorToRgb", () => {
	const color1 = SVG.parseColorToRgb("rgb()");
	const color2 = SVG.parseColorToRgb("hsl()");
	const colorAlpha1 = SVG.parseColorToRgb("rgba()");
	const colorAlpha2 = SVG.parseColorToRgb("hsla()");
	expect(JSON.stringify(color1)).toBe(JSON.stringify(color2));
	expect(JSON.stringify(color1)).toBe(JSON.stringify(colorAlpha1));
	expect(JSON.stringify(color1)).toBe(JSON.stringify(colorAlpha2));
});

test("invalid parseColorToRgb", () => {
	const notacolor = SVG.parseColorToRgb("notacolor");
	expect(notacolor).toBe(undefined);
});
