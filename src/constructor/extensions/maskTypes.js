/**
 * SVG (c) Kraft
 */
import * as S from "../../environment/strings.js";
import makeUUID from "../../arguments/makeUUID.js";
import { setViewBox } from "../../methods/viewBox.js";
import { removeChildren } from "./shared/dom.js";
import TransformMethods from "./shared/transforms.js";
import URLMethods from "./shared/urls.js";

const makeIDString = function () {
	return Array.from(arguments)
		.filter(a => typeof a === S.str_string || a instanceof String)
		.shift() || makeUUID();
};

const maskArgs = (...args) => [makeIDString(...args)];

export default {
	mask: {
		args: maskArgs,
		methods: {
			removeChildren,
			...TransformMethods,
			...URLMethods,
		},
	},
	clipPath: {
		args: maskArgs,
		methods: {
			removeChildren,
			...TransformMethods,
			...URLMethods,
		},
	},
	symbol: {
		args: maskArgs,
		methods: {
			removeChildren,
			...TransformMethods,
			...URLMethods,
		},
	},
	marker: {
		args: maskArgs,
		methods: {
			size: setViewBox,
			setViewBox: setViewBox,
			removeChildren,
			...TransformMethods,
			...URLMethods,
		},
	},
};
