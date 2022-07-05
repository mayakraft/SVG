/**
 * SVG (c) Kraft
 */
import * as S from "../environment/strings";

const getClassList = (element) => {
	if (element == null) { return []; }
	const currentClass = element.getAttribute(S.str_class);
	return (currentClass == null
		? []
		: currentClass.split(" ").filter(s => s !== ""));
};

export default {
	addClass: (element, newClass) => {
		const classes = getClassList(element)
			.filter(c => c !== newClass);
		classes.push(newClass);
		element.setAttributeNS(null, S.str_class, classes.join(" "));
	},
	removeClass: (element, removedClass) => {
		const classes = getClassList(element)
			.filter(c => c !== removedClass);
		element.setAttributeNS(null, S.str_class, classes.join(" "));
	},
	setClass: (element, className) => {
		element.setAttributeNS(null, S.str_class, className);
	},
	setId: (element, idName) => {
		element.setAttributeNS(null, S.str_id, idName);
	},
};
