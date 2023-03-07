/**
 * SVG (c) Kraft
 */
import window from "../environment/window.js";
import svgNS from "../environment/namespace.js";
import nodes_children from "../spec/nodes_children.js";
import { toCamel } from "../arguments/transformCase.js";
import formula from "../formula/index.js";

const RequiredAttrMap = {
	svg: {
		version: "1.1",
		xmlns: svgNS,
	},
	style: {
		type: "text/css",
	},
};

// required attributes for elements like <svg>, <style>
const applyStaticAttributes = (element, nodeName) => {
	if (!RequiredAttrMap[nodeName]) { return; }
	Object.keys(RequiredAttrMap[nodeName])
		.forEach(key => element.setAttribute(key, RequiredAttrMap[nodeName][key]));
};

const methodThis = {};

const constructor = (nodeName, parent, ...initArgs) => {
	const { init, args: ARGS, methods, attributes } = formula[nodeName];

	// create the element itself under the svg namespace.
	const element = window().document.createElementNS(svgNS, nodeName);
	// const element = window().document.createElementNS(svgNS, Formula[nodeName].nodeName);

	// if the parent exists, make this element a child
	if (parent) { parent.appendChild(element); }

	// only a few elements require attributes with a required constant value.
	// these attributes and their values are applied here
	applyStaticAttributes(element, nodeName);

	// initialize the element
	init(element, ...initArgs);

	// most elements (especially the visible shape elements) get supplied with
	// the relevant attribute values at the time of initialization
	ARGS(...initArgs).forEach((v, i) => {
		element.setAttribute(formula[nodeName].attributes[i], v);
		// if (NodeSpec[nodeName].attributes[i] != null) {
		//	element.setAttribute(NodeSpec[nodeName].attributes[i], v);
		// }
	});
	// camelCase functional style attribute setters, like .stroke() .strokeWidth()
	attributes.forEach((attribute) => {
		Object.defineProperty(element, toCamel(attribute), {
			value: function () {
				element.setAttribute(attribute, ...arguments);
				return element;
			},
		});
	});
	// custom methods from each primitive's definition
	Object.keys(methods).forEach(methodName => Object
		.defineProperty(element, methodName, {
			value: function () {
				return methods[methodName].call(methodThis, element, ...arguments);
			},
		}));
	// a method to create a child and automatically append it to this node
	if (nodes_children[nodeName]) {
		nodes_children[nodeName].forEach((childNode) => {
			const value = function () { return constructor(childNode, element, ...arguments); };
			// static methods have to be created in runtime,
			// after the object has been initialized.
			// if (formula[childNode].static) {
			// 	Object.keys(formula[childNode].static).forEach(key => {
			// 		value[key] = function () {
			// 			return formula[childNode].static[key](element, ...arguments);
			// 		};
			// 	});
			// }
			Object.defineProperty(element, childNode, { value });
		});
	}
	return element;
};

methodThis.Constructor = constructor;

export default constructor;
