/**
 * SVG (c) Kraft
 */
import arcPath from "../arc/arcPath";
import * as S from "../../../environment/strings";

const wedgeArguments = (a, b, c, d, e) => [arcPath(a, b, c, d, e, true)];

export default {
	wedge: {
		nodeName: S.str_path,
		args: wedgeArguments,
		attributes: ["d"],
		methods: {
			setArc: (el, ...args) => el.setAttribute("d", wedgeArguments(...args)),
		},
	},
};
