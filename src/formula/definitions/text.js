/**
 * SVG (c) Kraft
 */
import window from "../../environment/window.js";
import makeCoordinates from "../../arguments/makeCoordinates.js";
import { str_string } from "../../environment/strings.js";
/**
 * @description SVG text element
 * @memberof SVG
 * @linkcode SVG ./src/nodes/spec/text.js 11
 */
export default {
	text: {
		// assuming people will at most supply coordinate (x,y,z) and text
		args: (a, b, c) => makeCoordinates(...[a, b, c].flat()).slice(0, 2),
		init: (element, a, b, c, d) => {
			const text = [a, b, c, d].filter(el => typeof el === str_string).shift();
			element.appendChild(window().document.createTextNode(text || ""));
		},
	},
};
