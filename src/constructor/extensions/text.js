/**
 * Rabbit Ear (c) Kraft
 */
import svgNS from "../../spec/namespace.js";
import window from "../../environment/window.js";
import makeCoordinates from "../../arguments/makeCoordinates.js";
import { str_string } from "../../environment/strings.js";
import TransformMethods from "./shared/transforms.js";
import URLMethods from "./shared/urls.js";
import { appendTo, setAttributes } from "./shared/dom.js";
/**
 * @description SVG text element
 * @memberof SVG
 * @linkcode SVG ./src/nodes/spec/text.js 11
 */
export default {
	text: {
		// assuming people will at most supply coordinate (x,y,z) and text
		args: (a, b, c) => makeCoordinates(...[a, b, c].flat()).slice(0, 2),
		init: (a, b, c, d) => {
			const element = window().document.createElementNS(svgNS, "text");
			const text = [a, b, c, d].filter(el => typeof el === str_string).shift();
			element.appendChild(window().document.createTextNode(text || ""));
			return element;
		},
		methods: {
			...TransformMethods,
			...URLMethods,
			appendTo,
			setAttributes,
		},
	},
};
