/**
 * SVG (c) Kraft
 */
// import SVG, { SVG_Constructor } from "./library.js";
// import Nodes from "./nodes/index.js";
// import Constructor from "./nodes/constructor.js";
import NS from "./environment/namespace.js";
import argumentMethods from "./arguments/index.js";
import methods from "./methods/index.js";

import formula from "./formula/index.js";

import nodes_attributes from "./spec/nodes_attributes.js";
import nodes_children from "./spec/nodes_children.js";

import applyConstructors from "./constructor/applyConstructors.js";

const svg = {
	formula,
	nodes_attributes,
	nodes_children,
	NS,
	...argumentMethods,
	...methods,
};

applyConstructors(svg);

export default svg;
