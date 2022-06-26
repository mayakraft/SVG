/**
 * SVG (c) Kraft
 */
import * as S from "../environment/strings";
import Nodes from "../nodes/nodeNames";
import Case from "../arguments/case";

// for the clip-path and mask values. looks for the ID as a "url(#id-name)" string
const findIdURL = function (arg) {
	if (arg == null) { return ""; }
	if (typeof arg === S.str_string) {
		return arg.slice(0, 3) === "url"
			? arg
			: `url(#${arg})`;
	}
	if (arg.getAttribute != null) {
		const idString = arg.getAttribute(S.str_id);
		return `url(#${idString})`;
	}
	return "";
};

const methods = {};

// these do not represent the nodes that these methods are applied to
// every node gets these attribute-setting method (pointing to a mask)
["clip-path",
	"mask",
	"symbol",
	"marker-end",
	"marker-mid",
	"marker-start",
].forEach(attr => {
	methods[Case.toCamel(attr)] = (element, parent) => element.setAttribute(attr, findIdURL(parent));
});

export default methods;
