/**
 * SVG (c) Kraft
 */
import window from "../environment/window";
import svgNS from "../environment/namespace";
import NodesChildren from "./nodesChildren";
import Case from "../arguments/case";
import NodeSpec from "./nodes";

const RequiredAttrMap = {
	svg: {
		version: "1.1",
		xmlns: svgNS,
	},
	style: {
		type: "text/css"
	}
};

// required attributes for elements like <svg>, <style>
const RequiredAttributes = (element, nodeName) => {
	if (RequiredAttrMap[nodeName]) {
		Object.keys(RequiredAttrMap[nodeName])
			.forEach(key => element.setAttribute(key, RequiredAttrMap[nodeName][key]));
	}
};

const bound = {};

const constructor = (nodeName, parent, ...args) => {
	const element = window().document.createElementNS(svgNS, NodeSpec[nodeName].nodeName);
	if (parent) { parent.appendChild(element); }
	RequiredAttributes(element, nodeName);
	NodeSpec[nodeName].init(element, ...args);
	NodeSpec[nodeName].args(...args).forEach((v, i) => {
		if (NodeSpec[nodeName].attributes[i] != null) {
			element.setAttribute(NodeSpec[nodeName].attributes[i], v);
		}
	});
	// camelCase functional style attribute setters, like .stroke() .strokeWidth()
	NodeSpec[nodeName].attributes.forEach((attribute) => {
		Object.defineProperty(element, Case.toCamel(attribute), {
			value: function () {
				element.setAttribute(attribute, ...arguments);
				return element;
			}
		});
	});
	// custom methods from each primitive's definition
	Object.keys(NodeSpec[nodeName].methods).forEach(methodName =>
		Object.defineProperty(element, methodName, {
			value: function () {
				// all custom methods are attached to the node.
				// if there is no return value specified,
				// the method will return the element itself
				// to encourage method-chaining design.
				// nevermind.
				// things need to be able to return undefined
				return NodeSpec[nodeName].methods[methodName].call(bound, element, ...arguments);// || element;
			}
		}));
	// a method to create a child and automatically append it to this node
	if (NodesChildren[nodeName]) {
		NodesChildren[nodeName].forEach((childNode) => {
			const value = function () { return constructor(childNode, element, ...arguments); };
			// static methods have to be created in runtime,
			// after the object has been initialized.
			if (NodeSpec[childNode].static) {
				Object.keys(NodeSpec[childNode].static).forEach(key => {
					value[key] = function () {
						return NodeSpec[childNode].static[key](element, ...arguments);
					};
				});
			}
			Object.defineProperty(element, childNode, { value });
		});
	}
	return element;
};

bound.Constructor = constructor;

export default constructor;
