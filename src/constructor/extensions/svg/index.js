/**
 * Rabbit Ear (c) Kraft
 */
import svgNS from "../../../spec/namespace.js";
import window from "../../../environment/window.js";
import makeViewBox from "../../../arguments/makeViewBox.js";
import makeCoordinates from "../../../arguments/makeCoordinates.js";
import methods from "./methods.js";
// import methods, { loadSVG } from "./methods.js";
import Touch from "./touch.js";
import Animation from "./animation.js";
import Controls from "./controls.js";

export default {
	svg: {
		args: (...args) => [makeViewBox(makeCoordinates(...args))].filter(a => a != null),
		methods,
		init: (...args) => {
			const element = window().document.createElementNS(svgNS, "svg");
			element.setAttribute("version", "1.1");
			element.setAttribute("xmlns", svgNS);
			// args.filter(a => typeof a === str_string)
			// 	.forEach(string => loadSVG(element, string));
			args.filter(a => a != null)
				.filter(el => el.appendChild)
				.forEach(parent => parent.appendChild(element));
			Touch(element);
			Animation(element);
			Controls(element);
			return element;
		},
	},
};
