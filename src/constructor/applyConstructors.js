/**
 * SVG (c) Kraft
 */
// import nodeNames from "../spec/nodes.js";
import formula from "../formula/index.js";
import constructor from "./constructor.js";

const applyConstructors = (library) => {
	Object.keys(formula).forEach(nodeName => {
		library[nodeName] = (...args) => constructor(nodeName, null, ...args);
	});
};

export default applyConstructors;
