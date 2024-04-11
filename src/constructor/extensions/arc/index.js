/**
 * Rabbit Ear (c) Kraft
 */
import makeArcPath from "../shared/makeArcPath.js";
import { str_path } from "../../../environment/strings.js";
import TransformMethods from "../shared/transforms.js";

const arcArguments = (a, b, c, d, e) => [makeArcPath(a, b, c, d, e, false)];

export default {
	arc: {
		nodeName: str_path,
		attributes: ["d"],
		args: arcArguments,
		methods: {
			setArc: (el, ...args) => el.setAttribute("d", arcArguments(...args)),
			...TransformMethods,
		},
	},
};
