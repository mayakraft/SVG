/**
 * SVG (c) Kraft
 */
import * as S from "../../environment/strings.js";
import makeUUID from "../../general/makeUUID.js";
import { setViewBox } from "../../general/viewBox.js";
import TransformMethods from "./shared/transforms.js";
import URLMethods from "./shared/urls.js";
import * as DOM from "./shared/dom.js";

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
			...TransformMethods,
			...URLMethods,
			...DOM,
		},
	},
	clipPath: {
		args: maskArgs,
		methods: {
			...TransformMethods,
			...URLMethods,
			...DOM,
		},
	},
	symbol: {
		args: maskArgs,
		methods: {
			...TransformMethods,
			...URLMethods,
			...DOM,
		},
	},
	marker: {
		args: maskArgs,
		methods: {
			size: setViewBox,
			setViewBox: setViewBox,
			...TransformMethods,
			...URLMethods,
			...DOM,
		},
	},
};
