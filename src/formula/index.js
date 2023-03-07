import customDefinitions from "./definitions/index.js";
import nodeNames from "../spec/nodes.js";
import nodes_attributes from "../spec/nodes_attributes.js";

const formula = {
	...customDefinitions,
};

// in most cases the key === value. "line": "line"
// except custom shapes: "regularPolygon": "polygon"
// Object.keys(N)
// 	.forEach(key => N[key]
// 		.filter(nodeName => Nodes[nodeName] === undefined)
// 		.forEach((nodeName) => {
// 			Nodes[nodeName] = {};
// 		}));

const passthrough = function () { return Array.from(arguments); };

nodeNames
	.filter(nodeName => !formula[nodeName])
	.forEach(nodeName => { formula[nodeName] = {}; });

// complete the lookup table. empty entries where nothing existed
nodeNames.forEach((nodeName) => {
	// if (!formula[nodeName].nodeName) { formula[nodeName].nodeName = nodeName; }
	if (!formula[nodeName].init) { formula[nodeName].init = passthrough; }
	if (!formula[nodeName].args) { formula[nodeName].args = passthrough; }
	if (!formula[nodeName].methods) { formula[nodeName].methods = {}; }
	if (!formula[nodeName].attributes) {
		formula[nodeName].attributes = nodes_attributes[nodeName] || [];
	}
});

export default formula;
