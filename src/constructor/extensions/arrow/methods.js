/**
 * Rabbit Ear (c) Kraft
 */
import * as S from "../../../environment/strings.js";
import { toCamel } from "../../../general/string.js";
import semiFlatten from "../../../arguments/semiFlattenArrays.js";
import makeCoordinates from "../../../arguments/makeCoordinates.js";
import makeArrowPaths from "./makeArrowPaths.js";
import TransformMethods from "../shared/transforms.js";

// end is "head" or "tail"
const setArrowheadOptions = (element, options, which) => {
	if (typeof options === S.str_boolean) {
		element.options[which].visible = options;
	} else if (typeof options === S.str_object) {
		Object.assign(element.options[which], options);
		if (options.visible == null) {
			element.options[which].visible = true;
		}
	} else if (options == null) {
		element.options[which].visible = true;
	}
};

const setArrowStyle = (element, options = {}, which = S.str_head) => {
	const path = element.getElementsByClassName(`${S.str_arrow}-${which}`)[0];
	// find options which translate to object methods (el.stroke("red"))
	Object.keys(options)
		.map(key => ({ key, fn: path[toCamel(key)] }))
		.filter(el => typeof el.fn === S.str_function && el.key !== "class")
		.forEach(el => el.fn(options[el.key]));
	// find options which don't work as methods, set as attributes
	// Object.keys(options)
	// 	.map(key => ({ key, fn: path[toCamel(key)] }))
	// 	.filter(el => typeof el.fn !== S.str_function && el.key !== "class")
	// 	.forEach(el => path.setAttribute(el.key, options[el.key]));
	//
	// apply a class attribute (add, don't overwrite existing classes)
	Object.keys(options)
		.filter(key => key === "class")
		.forEach(key => path.classList.add(options[key]));
};

const redraw = (element) => {
	const paths = makeArrowPaths(element.options);
	Object.keys(paths)
		.map(path => ({
			path,
			element: element.getElementsByClassName(`${S.str_arrow}-${path}`)[0],
		}))
		.filter(el => el.element)
		.map(el => { el.element.setAttribute("d", paths[el.path]); return el; })
		.filter(el => element.options[el.path])
		.forEach(el => el.element.setAttribute(
			"visibility",
			element.options[el.path].visible
				? "visible"
				: "hidden",
		));
	return element;
};

const setPoints = (element, ...args) => {
	element.options.points = makeCoordinates(...semiFlatten(...args)).slice(0, 4);
	return redraw(element);
};

const bend = (element, amount) => {
	element.options.bend = amount;
	return redraw(element);
};

const pinch = (element, amount) => {
	element.options.pinch = amount;
	return redraw(element);
};

const padding = (element, amount) => {
	element.options.padding = amount;
	return redraw(element);
};

const head = (element, options) => {
	setArrowheadOptions(element, options, S.str_head);
	setArrowStyle(element, options, S.str_head);
	return redraw(element);
};

const tail = (element, options) => {
	setArrowheadOptions(element, options, S.str_tail);
	setArrowStyle(element, options, S.str_tail);
	return redraw(element);
};

const getLine = element => element.getElementsByClassName(`${S.str_arrow}-line`)[0];
const getHead = element => element.getElementsByClassName(`${S.str_arrow}-${S.str_head}`)[0];
const getTail = element => element.getElementsByClassName(`${S.str_arrow}-${S.str_tail}`)[0];

export default {
	setPoints,
	points: setPoints,
	bend,
	pinch,
	padding,
	head,
	tail,
	getLine,
	getHead,
	getTail,
	...TransformMethods,
};
