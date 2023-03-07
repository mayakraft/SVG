/**
 * SVG (c) Kraft
 */
// import * as S from "../../../environment/strings.js";
import makeViewBox from "../../../arguments/makeViewBox.js";
import makeCoordinates from "../../../arguments/makeCoordinates.js";
import methods from "./methods.js";
// import methods, { loadSVG } from "./methods.js";
// import Touch from "../../../events/touch.js";
// import Animation from "../../../events/animation.js";
// import Controls from "../../../events/controls.js";

// const findWindowBooleanParam = (...params) => params
//   .filter(arg => typeof arg === S.str_object)
//   .filter(o => typeof o.window === S.str_boolean)
//   .reduce((a, b) => a.window || b.window, false);

export default {
	svg: {
		args: (...args) => [makeViewBox(makeCoordinates(...args))].filter(a => a != null),
		methods,
		init: (element, ...args) => {
			// args.filter(a => typeof a === S.str_string)
			// 	.forEach(string => loadSVG(element, string));
			args.filter(a => a != null)
				.filter(el => el.appendChild)
				.forEach(parent => parent.appendChild(element));
			// Touch(element);
			// Animation(element);
			// Controls(element);
		},
	},
};
