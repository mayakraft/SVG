/**
 * SVG in Javascript (c) Robby Kraft
 */

import {
	svg,
	group
} from "./elements/main";

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
	arc,
	setPoints,
	setArc
} from "./elements/primitives";

import {
	regularPolygon,
	arcArrow
} from "./elements/compound";

import {
	setViewBox,
	getViewBox,
	scaleViewBox,
	translateViewBox,
	convertToViewBox
} from "./viewBox";

import {
	removeChildren,
	save,
	load
} from "./DOM";

import { default as image } from "./image";
import { default as controls } from "./controls";

export {
	svg,
	group,
	line,
	circle,
	ellipse,
	rect,
	polygon,
	polyline,
	bezier,
	text,
	wedge,
	arc,
	setPoints,
	setArc,
	regularPolygon,
	arcArrow,
	setViewBox,
	getViewBox,
	scaleViewBox,
	translateViewBox,
	convertToViewBox,
	removeChildren,
	save,
	load,
	image,
	controls
};
