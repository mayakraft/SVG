/**
 * SVG (c) Kraft
 */
import N from "./nodes.js";
import Spec from "./spec/index.js";
import CustomNodes from "./custom/index.js";
import Attributes from "../attributes/index.js";
import ManyElements from "../attributes/manyElements.js";
import classId from "../methods/classId.js";
import DOM from "../methods/dom.js";
import Transforms from "../methods/transforms.js";
import URLs from "../methods/urls.js";

// incorporate custom nodes as if they are drawing primitives.
const Nodes = {
	...Spec,
};

// in most cases the key === value. "line": "line"
// except custom shapes: "regularPolygon": "polygon"
Object.keys(N)
	.forEach(key => N[key]
		.filter(nodeName => Nodes[nodeName] === undefined)
		.forEach((nodeName) => {
			Nodes[nodeName] = {};
		}));

const passthrough = function () { return Array.from(arguments); };

// complete the lookup table. empty entries where nothing existed
Object.keys(Nodes).forEach((key) => {
	if (!Nodes[key].nodeName) { Nodes[key].nodeName = key; }
	if (!Nodes[key].init) { Nodes[key].init = passthrough; }
	if (!Nodes[key].args) { Nodes[key].args = passthrough; }
	if (!Nodes[key].methods) { Nodes[key].methods = {}; }
	if (!Nodes[key].attributes) {
		Nodes[key].attributes = Attributes[key] || [];
	}
});

const assignMethods = (groups, Methods) => {
	groups.forEach(n => Object
		.keys(Methods).forEach((method) => {
			Nodes[n].methods[method] = function () {
				Methods[method](...arguments);
				return arguments[0];
			};
		}));
};

assignMethods([N.t, N.v, N.g, N.s, N.p, N.i, N.h, N.d].flat(), classId);
assignMethods([N.t, N.v, N.g, N.s, N.p, N.i, N.h, N.d].flat(), DOM);
assignMethods([N.v, N.g, N.s].flat(), Transforms);
assignMethods([N.t, N.v, N.g].flat(), URLs);

export default Nodes;
