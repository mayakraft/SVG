/**
 * SVG (c) Kraft
 */
import cdata from "../../environment/cdata";

export default {
	style: {
		init: (el, text) => {
			el.textContent = "";
			el.appendChild(cdata(text));
		},
		methods: {
			setTextContent: (el, text) => {
				el.textContent = "";
				el.appendChild(cdata(text));
				return el;
			},
		},
	},
};
