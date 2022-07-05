/**
 * SVG (c) Kraft
 */
import SVG, { SVG_Constructor } from "./library";
import Nodes from "./nodes/index";
import Constructor from "./nodes/constructor";
import window, { setWindow } from "./environment/window";
import NS from "./environment/namespace";
import * as S from "./environment/strings";
import linker from "./environment/linker";
// import use from "./environment/use";
import load from "./file/load";
import save from "./file/save";
// core methods
import Case from "./arguments/case";
import coordinates from "./arguments/coordinates";
import flatten from "./arguments/flatten";
import attributes from "./attributes/singleElements";
import cdata from "./environment/cdata";
// import detect from "./environment/detect";
import classMethods from "./methods/classId";
import dom from "./methods/dom";
import * as svg_algebra from "./methods/algebra";
import transforms from "./methods/transforms";
import * as viewBox from "./methods/viewBox";
import children from "./nodes/nodesChildren";

const initialize = function (svg, ...args) {
	args.filter(arg => typeof arg === S.str_function)
		.forEach(func => func.call(svg, svg));
};

SVG_Constructor.init = function () {
	const svg = Constructor(S.str_svg, null, ...arguments);
	// call initialize as soon as possible. check if page has loaded
	if (window().document.readyState === "loading") {
		window().document.addEventListener("DOMContentLoaded", () => initialize(svg, ...arguments));
	} else {
		initialize(svg, ...arguments);
	}
	return svg;
};

// const SVG = function () {
// 	const svg = Constructor(S.str_svg, null, ...arguments);
// 	// call initialize as soon as possible. check if page has loaded
// 	if (window().document.readyState === "loading") {
// 		window().document.addEventListener("DOMContentLoaded", () => initialize(svg, ...arguments));
// 	} else {
// 		initialize(svg, ...arguments);
// 	}
// 	return svg;
// };

SVG.NS = NS;
SVG.linker = linker.bind(SVG);
// SVG.use = use.bind(SVG);
Object.assign(SVG, Nodes);
SVG.core = Object.assign(Object.create(null), {
	load,
	save,
	coordinates,
	flatten,
	attributes,
	children,
	cdata,
}, Case, classMethods, dom, svg_algebra, transforms, viewBox);

// the window object, from which the document is used to createElement.
// when using Node.js, this must be set to to the
// default export of the library @xmldom/xmldom
Object.defineProperty(SVG, "window", {
	enumerable: false,
	set: value => { setWindow(value); },
});

export default SVG;
