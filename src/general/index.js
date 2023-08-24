/**
 * SVG (c) Kraft
 */
import * as svgMath from "./algebra.js";
import * as dom from "./dom.js";
import makeCDATASection from "./makeCDATASection.js";
import * as pathMethods from "./path.js";
import * as transforms from "./transforms.js";
import * as viewBox from "./viewBox.js";

export default {
	...svgMath,
	...dom,
	makeCDATASection,
	...pathMethods,
	...transforms,
	...viewBox,
};
