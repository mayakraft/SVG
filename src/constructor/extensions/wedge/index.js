/**
 * Rabbit Ear (c) Kraft
 */
import makeArcPath from "../shared/makeArcPath.js";
import { str_path } from "../../../environment/strings.js";
import TransformMethods from "../shared/transforms.js";

const wedgeArguments = (a, b, c, d, e) => [makeArcPath(a, b, c, d, e, true)];

export default {
	wedge: {
		nodeName: str_path,
		args: wedgeArguments,
		attributes: ["d"],
		methods: {
			setArc: (el, ...args) => el.setAttribute("d", wedgeArguments(...args)),
			...TransformMethods,
		},
	},
};
