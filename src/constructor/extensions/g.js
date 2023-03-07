/**
 * SVG (c) Kraft
 */
import svgNS from "../../spec/namespace.js";
import window from "../../environment/window.js";
// import * as S from "../../environment/strings.js";
// import { sync } from "../../file/load.js";
// import { moveChildren } from "../../methods/dom.js";
import { removeChildren } from "./shared/dom.js";
import TransformMethods from "./shared/transforms.js";
import URLMethods from "./shared/urls.js";

const loadGroup = (...sources) => {
	const group = window().document.createElementNS(svgNS, "g");
	// const elements = sources.map(source => sync(source))
	// 	.filter(a => a !== undefined);
	// elements.filter(element => element.tagName === S.str_svg)
	// 	.forEach(element => moveChildren(group, element));
	// elements.filter(element => element.tagName !== S.str_svg)
	// 	.forEach(element => group.appendChild(element));
	return group;
};

export default {
	g: {
		init: loadGroup,
		methods: {
			load: loadGroup,
			removeChildren,
			...TransformMethods,
			...URLMethods,
		},
	},
};
