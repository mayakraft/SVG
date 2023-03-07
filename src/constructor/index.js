/**
 * SVG (c) Kraft
 */
import window from "../environment/window.js";
import svgNS from "../spec/namespace.js";
import nodes_children from "../spec/nodes_children.js";
import nodes_attributes from "../spec/nodes_attributes.js";
import { toCamel } from "../arguments/transformCase.js";
import extensions from "./extensions/index.js";

const passthroughArgs = (...args) => args;
/**
 * @description a constructor to build a "smart" SVG element. this element
 * will be assigned methods which do things like set an attribute value or
 * create a child of this object. This can create all elements from the SVG
 * spec, some of which are programmed to be highly customized under a system
 * which supports custom elements and the ability to extend the lookup
 * for this constructor to include your custom element.
 * @param {string} name the name of the element, although, slightly abstracted
 * from the actual element name, like "line" for <line> because it supports
 * custom elements, "arrow", which in turn will create a <g> or <path> etc..
 * @param {object} parent the parent to append this new node as a child to.
 */
const Constructor = (name, parent, ...initArgs) => {
	// the node name (like "line" for <line>) which is usually the
	// same as "name", but can sometimes differ in the case of custom elements
	const nodeName = extensions[name] && extensions[name].nodeName
		? extensions[name].nodeName
		: name;
	const { init, args, methods } = extensions[nodeName] || {};
	const attributes = nodes_attributes[nodeName] || [];
	const children = nodes_children[nodeName] || [];

	// create the element itself under the svg namespace.
	// or, if the extension specifies a custom initializer, run it instead
	const element = init
		?	init(...initArgs)
		: window().document.createElementNS(svgNS, nodeName);

	// if the parent exists, make this element a child
	if (parent) { parent.appendChild(element); }

	// some element initializers can set some attributes set right after
	// initialization, if the extension specifies how to assign them,
	// if so, they will map to the indices in the nodes nodes_attributes.
	const processArgs = args || passthroughArgs;
	processArgs(...initArgs).forEach((v, i) => {
		element.setAttribute(nodes_attributes[nodeName][i], v);
	});

	// if the extension specifies methods these will be bound to the object
	if (methods) {
		Object.keys(methods)
			.forEach(methodName => Object.defineProperty(element, methodName, {
				value: function () {
					return methods[methodName](element, ...arguments);
				},
			}));
	}

	// camelCase functional style attribute setters, like .stroke() .strokeWidth()
	attributes.forEach((attribute) => {
		const attrNameCamel = toCamel(attribute);
		if (element[attrNameCamel]) { return; }
		Object.defineProperty(element, attrNameCamel, {
			value: function () {
				element.setAttribute(attribute, ...arguments);
				return element;
			},
		});
	});

	// allow this element to initialize another element, and this
	// child element will be automatically appended to this element
	children.forEach((childNode) => {
		if (element[childNode]) { return; }
		const value = function () { return Constructor(childNode, element, ...arguments); };
		Object.defineProperty(element, childNode, { value });
	});

	return element;
};

export default Constructor;
