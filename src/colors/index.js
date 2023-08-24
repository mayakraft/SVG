/**
 * SVG (c) Kraft
 */
import cssColors from "./cssColors.js";
import * as convert from "./convert.js";
import * as parseColor from "./parseColor.js";

export default {
	cssColors,
	...convert,
	...parseColor,
};
