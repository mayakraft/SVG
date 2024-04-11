/**
 * Rabbit Ear (c) Kraft
 */
import svgNS from "../../spec/namespace.js";
import window from "../../environment/window.js";
// import * as S from "../../environment/strings.js";
// import { sync } from "../../file/load.js";
// import { moveChildren } from "../../methods/dom.js";
import TransformMethods from "./shared/transforms.js";
import URLMethods from "./shared/urls.js";
import * as DOM from "./shared/dom.js";

const loadGroup = (group, ...sources) => {
	// const elements = sources.map(source => sync(source))
	// 	.filter(a => a !== undefined);
	// elements.filter(element => element.tagName === S.str_svg)
	// 	.forEach(element => moveChildren(group, element));
	// elements.filter(element => element.tagName !== S.str_svg)
	// 	.forEach(element => group.appendChild(element));
	return group;
};

const init = (...sources) => {
	const group = window().document.createElementNS(svgNS, "g");
	return loadGroup(group, ...sources);
};

export default {
	g: {
		// init,
		methods: {
			// load: loadGroup,
			...TransformMethods,
			...URLMethods,
			...DOM,
		},
	},
};
