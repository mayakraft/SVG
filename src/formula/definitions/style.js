/**
 * SVG (c) Kraft
 */
import makeCDATASection from "../../methods/makeCDATASection.js";

export default {
	style: {
		init: (el, text) => {
			el.textContent = "";
			el.appendChild(makeCDATASection(text));
		},
		methods: {
			setTextContent: (el, text) => {
				el.textContent = "";
				el.appendChild(makeCDATASection(text));
				return el;
			},
		},
	},
};
