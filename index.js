import SVG from "./src/svg";
import View from "./src/view";
import interactive from "./src/interactive";

let line = SVG.line;
let circle = SVG.circle;
let polygon = SVG.polygon;
let bezier = SVG.bezier;
let group = SVG.group;
let svg = SVG.svg;
let addClass = SVG.addClass;
let removeClass = SVG.removeClass;
let setId = SVG.setId;
let removeChildren = SVG.removeChildren;
let setAttribute = SVG.setAttribute;
let setViewBox = SVG.setViewBox;
let convertToViewBox = SVG.convertToViewBox;
let translate = SVG.translate;
let zoom = SVG.zoom;
let setPolygonPoints = SVG.setPolygonPoints;
let getViewBox = SVG.getViewBox;

export { 
	line,
	circle,
	polygon,
	bezier,
	group,
	svg,
	addClass,
	removeClass,
	setId,
	removeChildren,
	setAttribute,
	setViewBox,
	getViewBox,
	convertToViewBox,
	translate,
	setPolygonPoints,
	zoom,
	View,
	interactive
};
