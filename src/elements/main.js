/**
 * SVG in Javascript (c) Robby Kraft
 */

import {
	line,
	circle,
	ellipse,
	rect,
	polygon,
	polyline,
	bezier,
	text,
	wedge,
	arc
} from "./primitives";

import {
	regularPolygon
} from "./polygons";

import {
	straightArrow,
	arcArrow
} from "./arrows";

import {
	attachClassMethods,
	attachViewBoxMethods,
	attachAppendableMethods
} from "./methods";

import {
	document
} from "../window";

const svgNS = "http://www.w3.org/2000/svg";

export const svg = function() {
	let svgImage = document.createElementNS(svgNS, "svg");
	svgImage.setAttribute("version", "1.1");
	svgImage.setAttribute("xmlns", svgNS);
	setupSVG(svgImage);
	return svgImage;
};

export const group = function() {
	let g = document.createElementNS(svgNS, "g");
	attachClassMethods(g);
	attachAppendableMethods(g, drawMethods);
	return g;
};

export const style = function() {
	let style = document.createElementNS(svgNS, "style");
	style.setAttribute("type", "text/css");
	return style;
}

export const setupSVG = function(svgImage) {
	attachClassMethods(svgImage);
	attachViewBoxMethods(svgImage);
	attachAppendableMethods(svgImage, drawMethods);
}

const drawMethods = {
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
	"group" : group,
	"straightArrow": straightArrow,
	"arcArrow": arcArrow,
	"regularPolygon": regularPolygon
};
