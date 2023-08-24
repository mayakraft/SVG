/**
 * SVG (c) Kraft
 */
import {
	str_object,
	str_arrow,
	str_class,
	str_path,
	str_tail,
	str_head,
	str_style,
	str_stroke,
	str_none,
} from "../../../environment/strings.js";
import NS from "../../../spec/namespace.js";
import window from "../../../environment/window.js";
import ArrowMethods from "./methods.js";
import { makeArrowOptions } from "./options.js";
// import Library from "../../../library.js";

const arrowKeys = Object.keys(makeArrowOptions());

const matchingOptions = (...args) => {
	for (let a = 0; a < args.length; a += 1) {
		if (typeof args[a] !== str_object) { continue; }
		const keys = Object.keys(args[a]);
		for (let i = 0; i < keys.length; i += 1) {
			if (arrowKeys.includes(keys[i])) {
				return args[a];
			}
		}
	}
	return undefined;
};

const init = function (element, ...args) {
	element.classList.add(str_arrow);
	// element.setAttribute(str_class, str_arrow);
	const paths = ["line", str_tail, str_head].map(key => {
		const path = window().document.createElementNS(NS, str_path);
		path.className = `${str_arrow}-${key}`;
		element.appendChild(path);
		return path;
	});
		// .map(key => Library.path().addClass(`${str_arrow}-${key}`).appendTo(element));
	paths[0].setAttribute(str_style, "fill:none;");
	paths[1].setAttribute(str_stroke, str_none);
	paths[2].setAttribute(str_stroke, str_none);
	element.options = makeArrowOptions();
	ArrowMethods.setPoints(element, ...args);
	const options = matchingOptions(...args);
	if (options) {
		Object.keys(options)
			.filter(key => ArrowMethods[key])
			.forEach(key => ArrowMethods[key](element, options[key]));
	}
	return element;
};

export default init;
