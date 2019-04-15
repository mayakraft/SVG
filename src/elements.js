/**
 * this contains 4 types of functions. functions that
 * 1. create SVG elements: line() creates <line>
 * 2. create compound shapes like regularPolygon()
 * 3. set the inner geometry, otherwise complex math, like setArc()
 * 4. attach methods to these SVG elements, like removeChildren()
 *    on a <group> element. or viewBox methods on an <svg>
 */

import * as DOM from "./DOM";
import * as ViewBox from "./viewBox";

const svgNS = "http://www.w3.org/2000/svg";

export const svg = function() {
	let svgImage = document.createElementNS(svgNS, "svg");
	svgImage.setAttribute("version", "1.1");
	svgImage.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	setupSVG(svgImage);
	return svgImage;
};

/**
 * geometry primitives
 */

export const line = function(x1, y1, x2, y2) {
	let shape = document.createElementNS(svgNS, "line");
	if (x1) { shape.setAttributeNS(null, "x1", x1); }
	if (y1) { shape.setAttributeNS(null, "y1", y1); }
	if (x2) { shape.setAttributeNS(null, "x2", x2); }
	if (y2) { shape.setAttributeNS(null, "y2", y2); }
	attachClassMethods(shape);
	return shape;
};

export const circle = function(x, y, radius) {
	let shape = document.createElementNS(svgNS, "circle");
	if (x) { shape.setAttributeNS(null, "cx", x); }
	if (y) { shape.setAttributeNS(null, "cy", y); }
	if (radius) { shape.setAttributeNS(null, "r", radius); }
	attachClassMethods(shape);
	return shape;
};

export const ellipse = function(x, y, rx, ry) {
	let shape = document.createElementNS(svgNS, "ellipse");
	if (x) { shape.setAttributeNS(null, "cx", x); }
	if (y) { shape.setAttributeNS(null, "cy", y); }
	if (rx) { shape.setAttributeNS(null, "rx", rx); }
	if (ry) { shape.setAttributeNS(null, "ry", ry); }
	attachClassMethods(shape);
	return shape;
};

export const rect = function(x, y, width, height) {
	let shape = document.createElementNS(svgNS, "rect");
	if (x) { shape.setAttributeNS(null, "x", x); }
	if (y) { shape.setAttributeNS(null, "y", y); }
	if (width) { shape.setAttributeNS(null, "width", width); }
	if (height) { shape.setAttributeNS(null, "height", height); }
	attachClassMethods(shape);
	return shape;
};

export const polygon = function(pointsArray) {
	let shape = document.createElementNS(svgNS, "polygon");
	setPoints(shape, pointsArray);
	attachClassMethods(shape);
	return shape;
};

export const polyline = function(pointsArray) {
	let shape = document.createElementNS(svgNS, "polyline");
	setPoints(shape, pointsArray);
	attachClassMethods(shape);
	return shape;
};

export const bezier = function(fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
	let d = "M " + fromX + "," + fromY + " C " + c1X + "," + c1Y +
			" " + c2X + "," + c2Y + " " + toX + "," + toY;
	let shape = document.createElementNS(svgNS, "path");
	shape.setAttributeNS(null, "d", d);
	attachClassMethods(shape);
	return shape;
};

export const text = function(textString, x, y) {
	let shape = document.createElementNS(svgNS, "text");
	shape.innerHTML = textString;
	shape.setAttributeNS(null, "x", x);
	shape.setAttributeNS(null, "y", y);
	attachClassMethods(shape);
	return shape;
};

export const wedge = function(x, y, radius, angleA, angleB) {
	let shape = document.createElementNS(svgNS, "path");
	setArc(shape, x, y, radius, angleA, angleB, true);
	attachClassMethods(shape);
	return shape;
};

export const arc = function(x, y, radius, angleA, angleB) {
	let shape = document.createElementNS(svgNS, "path");
	setArc(shape, x, y, radius, angleA, angleB, false);
	attachClassMethods(shape);
	return shape;
};

/**
 * containers
 */

export const group = function() {
	let g = document.createElementNS(svgNS, "g");
	attachClassMethods(g);
	attachGeometryMethods(g);
	return g;
};

/**
 * compound shapes
 */

export const regularPolygon = function(cX, cY, radius, sides) {
	let halfwedge = 2*Math.PI/sides * 0.5;
	let r = Math.cos(halfwedge) * radius;
	let points = Array.from(Array(sides)).map((el,i) => {
		let a = -2 * Math.PI * i / sides + halfwedge;
		let x = cX + r * Math.sin(a);
		let y = cY + r * Math.cos(a);
		return [x, y];
	});
	return polygon(points);
};

/**
 * geometry modifiers
 */

export const setPoints = function(polygon, pointsArray) {
	if (pointsArray == null || pointsArray.constructor !== Array) {
		return;
	}
	let pointsString = pointsArray.map((el) =>
		(el.constructor === Array ? el : [el.x, el.y])
	).reduce((prev, curr) => prev + curr[0] + "," + curr[1] + " ", "");
	polygon.setAttributeNS(null, "points", pointsString);
};

export const setArc = function(shape, x, y, radius, startAngle, endAngle,
		includeCenter = false) {
	let start = [
		x + Math.cos(startAngle) * radius,
		y + Math.sin(startAngle) * radius ];
	let vecStart = [
		Math.cos(startAngle) * radius,
		Math.sin(startAngle) * radius ];
	let vecEnd = [
		Math.cos(endAngle) * radius,
		Math.sin(endAngle) * radius ];
	let arcVec = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
	let py = vecStart[0]*vecEnd[1] - vecStart[1]*vecEnd[0];
	let px = vecStart[0]*vecEnd[0] + vecStart[1]*vecEnd[1];
	let arcdir = (Math.atan2(py, px) > 0 ? 0 : 1);
	let d = (includeCenter
		? "M " + x + "," + y + " l " + vecStart[0] + "," + vecStart[1] + " "
		: "M " + start[0] + "," + start[1] + " ");
	d += ["a ", radius, radius, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
	if (includeCenter) { d += " Z"; }
	shape.setAttributeNS(null, "d", d);
};

const geometryMethods = {
	"line" : line,
	"circle" : circle,
	"ellipse" : ellipse,
	"rect" : rect,
	"polygon" : polygon,
	"polyline" : polyline,
	"bezier" : bezier,
	"text" : text,
	"wedge" : wedge,
	"arc" : arc,
	"regularPolygon" : regularPolygon,
	"group" : group,
};

const attachGeometryMethods = function(element) {
	Object.keys(geometryMethods).forEach(key => {
		element[key] = function() {
			let g = geometryMethods[key](...arguments);
			element.appendChild(g);
			return g;
		}
	});
};

const attachClassMethods = function(element) {
	element.removeChildren = function() { return DOM.removeChildren(element); }
	element.addClass = function() { return DOM.addClass(element, ...arguments); }
	element.removeClass = function() { return DOM.removeClass(element, ...arguments); }
	element.setClass = function() { return DOM.setClass(element, ...arguments); }
	element.setID = function() { return DOM.setID(element, ...arguments); }
};

const attachViewBoxMethods = function(element) {
	element.setViewBox = function() { return ViewBox.setViewBox(element, ...arguments); }
	element.getViewBox = function() { return ViewBox.getViewBox(element, ...arguments); }
	element.scaleViewBox = function() { return ViewBox.scaleViewBox(element, ...arguments); }
	element.translateViewBox = function() { return ViewBox.translateViewBox(element, ...arguments); }
	element.convertToViewBox = function() { return ViewBox.convertToViewBox(element, ...arguments); }
};

export const setupSVG = function(svgImage) {
	attachClassMethods(svgImage);
	attachGeometryMethods(svgImage);
	attachViewBoxMethods(svgImage);
}
