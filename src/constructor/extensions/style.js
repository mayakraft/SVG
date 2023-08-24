/**
 * SVG (c) Kraft
 */
import svgNS from "../../spec/namespace.js";
import window from "../../environment/window.js";
import makeCDATASection from "../../general/makeCDATASection.js";

export default {
	style: {
		init: (text) => {
			const el = window().document.createElementNS(svgNS, "style");
			el.setAttribute("type", "text/css");
			el.textContent = "";
			el.appendChild(makeCDATASection(text));
			return el;
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
