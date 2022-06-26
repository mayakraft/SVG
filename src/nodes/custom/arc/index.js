/**
 * SVG (c) Kraft
 */
import arcPath from "./arcPath";
import * as S from "../../../environment/strings";

const arcArguments = (a, b, c, d, e) => [arcPath(a, b, c, d, e, false)];

export default {
	arc: {
		nodeName: S.str_path,
		attributes: ["d"],
		args: arcArguments,
		methods: {
			setArc: (el, ...args) => el.setAttribute("d", arcArguments(...args)),
		}
	}
};
