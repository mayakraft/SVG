/**
 * SVG (c) Kraft
 */
import * as S from "../../environment/strings";
import UUID from "../../arguments/uuid";
import { setViewBox } from "../../methods/viewBox";

const makeIDString = function () {
	return Array.from(arguments)
		.filter(a => typeof a === S.str_string || a instanceof String)
		.shift() || UUID();
};

const maskArgs = (...args) => [makeIDString(...args)];

export default {
	mask: { args: maskArgs },
	clipPath: { args: maskArgs },
	symbol: { args: maskArgs },
	marker: {
		args: maskArgs,
		methods: {
			size: setViewBox,
			setViewBox: setViewBox,
		},
	},
};
