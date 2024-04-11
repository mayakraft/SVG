/**
 * Rabbit Ear (c) Kraft
 */
import semiFlattenArrays from "../../arguments/semiFlattenArrays.js";
import makeCoordinates from "../../arguments/makeCoordinates.js";
import nodes_attributes from "../../spec/nodes_attributes.js";
import TransformMethods from "./shared/transforms.js";
import URLMethods from "./shared/urls.js";
import * as DOM from "./shared/dom.js";

const Args = (...args) => makeCoordinates(...semiFlattenArrays(...args)).slice(0, 4);

const setPoints = (element, ...args) => {
	Args(...args).forEach((value, i) => element.setAttribute(nodes_attributes.line[i], value));
	return element;
};
/**
 * @name line
 * @description SVG Line element
 * @memberof SVG
 * @linkcode SVG ./src/nodes/spec/line.js 18
 */
export default {
	line: {
		args: Args,
		methods: {
			setPoints,
			...TransformMethods,
			...URLMethods,
			...DOM,
		},
	},
};
