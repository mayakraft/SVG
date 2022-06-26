/**
 * SVG (c) Kraft
 */
import window from "../../environment/window"
import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import * as S from "../../environment/strings";
/**
 * @description SVG text element
 * @memberof SVG
 */
export default {
	text: {
		// assuming people will at most supply coordinate (x,y,z) and text
		args: (a, b, c) => coordinates(...flatten(a, b, c)).slice(0, 2),
		init: (element, a, b, c, d) => {
			const text = [a,b,c,d].filter(a => typeof a === S.str_string).shift();
			if (text) {
				element.appendChild(window().document.createTextNode(text));
				// it seems like this is excessive and will never happen
				// if (element.firstChild) {
				//   element.firstChild.nodeValue = text;
				// } else {
				//   element.appendChild(window().document.createTextNode(text));
				// }
			}
		}
	}
};
