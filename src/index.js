/**
 * SVG (c) Kraft
 */
import { setSVGWindow } from "./environment/window.js";
import NS from "./spec/namespace.js";
// import argumentMethods from "./arguments/index.js";
// import methods from "./methods/index.js";
import extensions from "./constructor/extensions/index.js";
import constructor from "./constructor/index.js";
import nodes from "./spec/nodes.js";
import nodes_attributes from "./spec/nodes_attributes.js";
import nodes_children from "./spec/nodes_children.js";

// the top level container object is also an <svg> constructor
const svg = (...args) => constructor("svg", null, ...args);

// constants and methods at the top level of the library
Object.assign(svg, {
	NS,
	nodes_attributes,
	nodes_children,
	extensions,
	// ...argumentMethods,
	// ...methods,
});

nodes.forEach(nodeName => {
	svg[nodeName] = (...args) => constructor(nodeName, null, ...args);
});

// the window object, from which the document is used to createElement.
// if using a browser, no need to interact with this,
// if using node.js, set this to the library @xmldom/xmldom.
Object.defineProperty(svg, "window", {
	enumerable: false,
	set: value => { setSVGWindow(value); },
});

export default svg;
