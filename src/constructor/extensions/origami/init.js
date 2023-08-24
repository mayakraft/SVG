/**
 * SVG (c) Kraft
 */
import NS from "../../../spec/namespace.js";
import window from "../../../environment/window.js";
import lib from "../../../environment/lib.js";

const init = (graph, ...args) => {
	const g = window().document.createElementNS(NS, "g");
	lib.ear.convert.foldToSvg.render(graph, g, ...args);
	return g;
};

export default init;
