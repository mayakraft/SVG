/**
 * SVG (c) Kraft
 */
import * as S from "../../../environment/strings.js";
import makeCDATASection from "../../../methods/makeCDATASection.js";
// import { clearSVG, assignSVG } from "../../../methods/dom.js";
// import Load from "../../../file/load.js";
// import Save from "../../../file/save.js";
import { getViewBox, setViewBox } from "../../../methods/viewBox.js";

// check if the loader is running synchronously or asynchronously
// export const loadSVG = (target, data) => {
// 	const result = Load(data);
// 	if (result == null) { return; }
// 	return (typeof result.then === S.str_function)
// 		? result.then(svg => assignSVG(target, svg))
// 		: assignSVG(target, result);
// };

const getFrame = function (element) {
	const viewBox = getViewBox(element);
	if (viewBox !== undefined) {
		return viewBox;
	}
	if (typeof element.getBoundingClientRect === S.str_function) {
		const rr = element.getBoundingClientRect();
		return [rr.x, rr.y, rr.width, rr.height];
	}
	// return Array(4).fill(undefined);
	return [];
};

const setPadding = function (element, padding) {
	const viewBox = getViewBox(element);
	if (viewBox !== undefined) {
		setViewBox(element, ...[-padding, -padding, padding * 2, padding * 2]
			.map((nudge, i) => viewBox[i] + nudge));
	}
	return element;
};

const bgClass = "svg-background-rectangle";

// i prevented circular dependency by passing a pointer to Constructor through 'this'
// every function is bound
const background = function (element, color) {
	let backRect = Array.from(element.childNodes)
		.filter(child => child.getAttribute(S.str_class) === bgClass)
		.shift();
	if (backRect == null) {
		backRect = this.Constructor("rect", null, ...getFrame(element));
		backRect.setAttribute(S.str_class, bgClass);
		backRect.setAttribute(S.str_stroke, S.str_none);
		element.insertBefore(backRect, element.firstChild);
	}
	backRect.setAttribute(S.str_fill, color);
	return element;
};

const findStyleSheet = function (element) {
	const styles = element.getElementsByTagName(S.str_style);
	return styles.length === 0 ? undefined : styles[0];
};

const stylesheet = function (element, textContent) {
	let styleSection = findStyleSheet(element);
	if (styleSection == null) {
		styleSection = this.Constructor(S.str_style);
		element.insertBefore(styleSection, element.firstChild);
	}
	styleSection.textContent = "";
	styleSection.appendChild(makeCDATASection(textContent));
	return styleSection;
};

// these will end up as methods on the <svg> nodes
export default {
	// clear: clearSVG,
	size: setViewBox,
	setViewBox,
	getViewBox,
	padding: setPadding,
	background,
	getWidth: el => getFrame(el)[2],
	getHeight: el => getFrame(el)[3],
	stylesheet: function (el, text) { return stylesheet.call(this, el, text); },
	// load: loadSVG,
	// save: Save,
};

// svg.load = function (element, data, callback) {
//   return Load(data, (svg, error) => {
//     if (svg != null) { replaceSVG(element, svg); }
//     if (callback != null) { callback(element, error); }
//   });
// };
