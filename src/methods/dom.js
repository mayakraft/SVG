/**
 * SVG (c) Kraft
 */
import { toKebab } from "../arguments/transformCase.js";

export const removeChildren = (element) => {
	while (element.lastChild) {
		element.removeChild(element.lastChild);
	}
	return element;
};

export const appendTo = (element, parent) => {
	if (parent && parent.appendChild) {
		parent.appendChild(element);
	}
	return element;
};

export const setAttributes = (element, attrs) => Object.keys(attrs)
	.forEach(key => element.setAttribute(toKebab(key), attrs[key]));

export const clearSVG = (element) => {
	Array.from(element.attributes)
		.filter(a => a !== "xmlns")
		.forEach(attr => element.removeAttribute(attr.name));
	return removeChildren(element);
};
