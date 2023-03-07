/**
 * SVG (c) Kraft
 */
import * as svgMath from "./algebra.js";
import makeCDATASection from "./makeCDATASection.js";
import * as pathMethods from "./path.js";
import * as viewBox from "./viewBox.js";

export default {
	...svgMath,
	makeCDATASection,
	...pathMethods,
	...viewBox,
};
