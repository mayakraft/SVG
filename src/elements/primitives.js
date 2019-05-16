/**
 * SVG in Javascript (c) Robby Kraft
 */

import { attachClassMethods } from "./methods";

const svgNS = "http://www.w3.org/2000/svg";

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
 *  modifiers
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
