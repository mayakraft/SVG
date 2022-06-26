/**
 * SVG (c) Kraft
 */
const parseCSSText = function (styleContent) {
	const styleElement = document.createElement("style");
	styleElement.textContent = styleContent;
	document.body.appendChild(styleElement);
	const rules = styleElement.sheet.cssRules;
	document.body.removeChild(styleElement);
	return rules;
};
