import { expect, test } from "vitest";
import SVG from "../src/index.js";

// anything involving hsl is within 1 unit

test("all conversions with alpha", () => {
	const rgbaValues = [17, 85, 136, 0.25];
	const hslaValues = [206, 77.777, 30, 0.25];
	const hex = "#11558840";
	const rgb = "rgba(17, 85, 136)";
	const rgba = "rgba(17, 85, 136, 0.25)";
	const hsl = "hsla(206, 77.777%, 30%)";
	const hsla = "hsla(206, 77.777%, 30%, 0.25)";

	// core conversion methods
	expect(SVG.rgbToHex(...rgbaValues)).toBe(hex);
	SVG.hexToRgb(hex)
		.forEach((n, i) => expect(n).toBe(rgbaValues[i]));
	SVG.hslToRgb(...hslaValues)
		.map((n, i) => Math.abs(n - rgbaValues[i]))
		.forEach(diff => expect(diff < 1).toBe(true));

	// parser methods
	SVG.parseColorToRgb(hex)
		.forEach((n, i) => expect(n).toBe(rgbaValues[i]));
	SVG.parseColorToRgb(rgb)
		.forEach((n, i) => expect(n).toBe(rgbaValues[i]));
	SVG.parseColorToRgb(rgba)
		.forEach((n, i) => expect(n).toBe(rgbaValues[i]));
	SVG.parseColorToRgb(hsl)
		.map((n, i) => Math.abs(n - rgbaValues[i]))
		.forEach(diff => expect(diff < 1).toBe(true));
	SVG.parseColorToRgb(hsla)
		.map((n, i) => Math.abs(n - rgbaValues[i]))
		.forEach(diff => expect(diff < 1).toBe(true));

	expect(SVG.parseColorToHex(hex)).toBe(hex);
	expect(SVG.parseColorToHex(rgb)).toBe("#115588");
	expect(SVG.parseColorToHex(rgba)).toBe(hex);
	// these are off by one. 54 instead of 55. unfortunately,
	// I think we just have to deal with this error in conversion.
	expect(SVG.parseColorToHex(hsl)).toBe("#115488");
	expect(SVG.parseColorToHex(hsla)).toBe("#11548840");
	expect(SVG.parseColorToHex("red")).toBe("#FF0000");
	expect(SVG.parseColorToHex("blue")).toBe("#0000FF");
	expect(SVG.parseColorToHex("")).toBe(undefined);
});

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
