/**
 * Rabbit Ear (c) Kraft
 */
import cssColors from "./cssColors.js";
import {
	hexToRgb,
	hslToRgb,
	rgbToHex,
} from "./convert.js";
/**
 *
 */
const getParenNumbers = str => {
	const match = str.match(/\(([^\)]+)\)/g);
	if (match == null || !match.length) { return []; }
	return match[0]
		.substring(1, match[0].length - 1)
		.split(/[\s,]+/)
		.map(parseFloat);
};
/**
 * @description input a color as a string and get back the RGB
 * values as three numbers in an array. This supports CSS/SVG
 * color strings like named colors, hex colors, rgb(), hsl().
 * @returns {number[] | undefined} red green blue values between 0 and 255,
 * with possible 4th value between 0 and 1.
 */
export const parseColorToRgb = (string) => {
	if (cssColors[string]) { return hexToRgb(cssColors[string]); }
	if (string[0] === "#") { return hexToRgb(string); }
	if (string.substring(0, 4) === "rgba"
		|| string.substring(0, 3) === "rgb") {
		const values = getParenNumbers(string);
		[0, 1, 2]
			.filter(i => values[i] === undefined)
			.forEach(i => { values[i] = 0; });
		return values;
	}
	if (string.substring(0, 4) === "hsla"
		|| string.substring(0, 3) === "hsl") {
		const values = getParenNumbers(string);
		[0, 1, 2]
			.filter(i => values[i] === undefined)
			.forEach(i => { values[i] = 0; });
		const rgb = hslToRgb(...values);
		if (values.length === 4) { rgb.push(values[3]); }
		return rgb;
	}
	return undefined;
};
/**
 * @description input a color as a string and return the
 * same color as a hex value string. This supports CSS/SVG
 * color strings like named colors, hex colors, rgb(), hsl().
 */
export const parseColorToHex = (string) => {
	if (cssColors[string]) { return cssColors[string].toUpperCase(); }
	// convert back and forth, this converts 3 or 4 digit hex to 6 or 8.
	if (string[0] === "#") { return rgbToHex(...hexToRgb(string)); }
	if (string.substring(0, 4) === "rgba"
		|| string.substring(0, 3) === "rgb") {
		return rgbToHex(...getParenNumbers(string));
	}
	if (string.substring(0, 4) === "hsla"
		|| string.substring(0, 3) === "hsl") {
		const values = getParenNumbers(string);
		[0, 1, 2]
			.filter(i => values[i] === undefined)
			.forEach(i => { values[i] = 0; });
		const rgb = hslToRgb(...values);
		if (values.length === 4) { rgb.push(values[3]); }
		[0, 1, 2].forEach(i => { rgb[i] *= 255; });
		rgbToHex(...rgb);
	}
	return undefined;
};
