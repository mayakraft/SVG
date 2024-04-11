/**
 * Rabbit Ear (c) Kraft
 */
// import window from "../../../environment/window.js";
// import NS from "../../../spec/namespace.js";
// import lib from "../../../environment/lib.js";
import TransformMethods from "../shared/transforms.js";
import URLMethods from "../shared/urls.js";
import * as DOM from "../shared/dom.js";

// const clearSVG = (element) => {
// 	Array.from(element.attributes)
// 		.filter(attr => attr.name !== "xmlns" && attr.name !== "version")
// 		.forEach(attr => element.removeAttribute(attr.name));
// 	return DOM.removeChildren(element);
// };

// const vertices = (...args) => {
// 	lib.ear.convert.foldToSvg.vertices(...args);
// 	const g = window().document.createElementNS(NS, "g");
// 	lib.ear.convert.foldToSvg.drawInto(g, ...args);
// 	return g;
// };

// const edges = (...args) => {
// 	console.log("edges");
// };

// const faces = (...args) => {
// 	console.log("faces");
// };

// these will end up as methods on the <svg> nodes
export default {
	// vertices,
	// edges,
	// faces,
	...TransformMethods,
	...URLMethods,
	...DOM,
};
