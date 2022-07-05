/**
 * SVG (c) Kraft
 */
import * as S from "../environment/strings";

const getAttr = (element) => {
	const t = element.getAttribute(S.str_transform);
	return (t == null || t === "") ? undefined : t;
};

const TransformMethods = {
	clearTransform: (el) => { el.removeAttribute(S.str_transform); return el; },
};

["translate", "rotate", "scale", "matrix"].forEach(key => {
	TransformMethods[key] = (element, ...args) => element.setAttribute(
		S.str_transform,
		[getAttr(element), `${key}(${args.join(" ")})`]
			.filter(a => a !== undefined)
			.join(" "),
	);
});

export default TransformMethods;
