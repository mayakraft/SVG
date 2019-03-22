/**
 * simple svg in javascript (c) Robby Kraft
 */

export {
	svg, line, circle, ellipse, rect, polygon, polyline, bezier,
	text, wedge, arc, group, regularPolygon, setPoints, setArc
} from "./elements";

export {
	setViewBox, getViewBox, scaleViewBox, translateViewBox, convertToViewBox
} from "./viewBox";

export { removeChildren, save, load } from "./DOM";

export { default as image } from "./image";

export { default as controls } from "./controls";
