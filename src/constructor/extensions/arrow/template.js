/**
 * Rabbit Ear (c) Kraft
 */
// const arrow = function (...args) {
// 	const shape = window.document.createElementNS(svgNS, "g");
// 	const tailPoly = window.document.createElementNS(svgNS, "polygon");
// 	const headPoly = window.document.createElementNS(svgNS, "polygon");
// 	const arrowPath = window.document.createElementNS(svgNS, "path");
// 	tailPoly.setAttributeNS(null, "class", "svg-arrow-tail");
// 	headPoly.setAttributeNS(null, "class", "svg-arrow-head");
// 	arrowPath.setAttributeNS(null, "class", "svg-arrow-path");
// 	tailPoly.setAttributeNS(null, "style", "stroke: none; pointer-events: none;");
// 	headPoly.setAttributeNS(null, "style", "stroke: none; pointer-events: none;");
// 	arrowPath.setAttributeNS(null, "style", "fill: none;");
// 	shape.appendChild(arrowPath);
// 	shape.appendChild(tailPoly);
// 	shape.appendChild(headPoly);
// 	shape.options = {
// 		head: { width: 0.5, height: 2, visible: false, padding: 0.0 },
// 		tail: { width: 0.5, height: 2, visible: false, padding: 0.0 },
// 		curve: 0.0,
// 		pinch: 0.618,
// 		points: [],
// 	};
// 	setArrowPoints(shape, ...args);
// 	prepare("arrow", shape);
// 	shape.setPoints = (...a) => setArrowPoints(shape, ...a);
// 	return shape;
// };
