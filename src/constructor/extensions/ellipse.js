/**
 * SVG (c) Kraft
 */
import makeCoordinates from "../../arguments/makeCoordinates.js";
import nodes_attributes from "../../spec/nodes_attributes.js";
import TransformMethods from "./shared/transforms.js";
import URLMethods from "./shared/urls.js";

// const setRadii = (el, rx, ry) => [,,rx,ry]
//   .forEach((value, i) => el.setAttribute(nodes_attributes.ellipse[i], value));
const setRadii = (el, rx, ry) => {
	[, , rx, ry].forEach((value, i) => el.setAttribute(nodes_attributes.ellipse[i], value));
	return el;
};

const setOrigin = (el, a, b) => {
	[...makeCoordinates(...[a, b].flat()).slice(0, 2)]
		.forEach((value, i) => el.setAttribute(nodes_attributes.ellipse[i], value));
	return el;
};

export default {
	ellipse: {
		args: (a, b, c, d) => {
			const coords = makeCoordinates(...[a, b, c, d].flat()).slice(0, 4);
			switch (coords.length) {
			case 0: case 1: case 2: return [, , ...coords];
			default: return coords;
			}
		},
		methods: {
			radius: setRadii,
			setRadius: setRadii,
			origin: setOrigin,
			setOrigin,
			center: setOrigin,
			setCenter: setOrigin,
			position: setOrigin,
			setPosition: setOrigin,
			...TransformMethods,
			...URLMethods,
		},
	},
};
