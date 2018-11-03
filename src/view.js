/** svg file viewer
 * converts .fold file into SVG, binds it to the DOM
 * @param: (constructor) a DOM object or "string" DOM id
 *  and this will bind the SVG to it.
 */

"use strict";

import * as SVG from "./svg";

export default function View(){
	// get constructor parameters
	let params = Array.from(arguments);

	// create a new SVG
	let _svg = SVG.svg();

	let _parent = undefined;  // parent xml node

	// view properties
	let _scale = 1.0;
	let _padding = 0;

	let _matrix = _svg.createSVGMatrix();

	// exported
	const zoom = function(scale, origin_x = 0, origin_y = 0){
		_scale = scale;
		SVG.scale(_svg, scale, origin_x, origin_y);
	}
	const translate = function(dx, dy){
		SVG.translate(_svg, dx, dy);
	}
	const setViewBox = function(x, y, width, height){
		SVG.setViewBox(_svg, x, y, width, height, _padding);
	}
	const getViewBox = function() {
		return SVG.getViewBox(_svg);
	}
	const group = function(className, id) {
		return SVG.group(className, id, _svg);
	}
	const line = function(x1, y1, x2, y2, className, id) {
		return SVG.line(x1, y1, x2, y2, className, id, _svg);
	}
	const circle = function(x, y, radius, className, id) {
		return SVG.circle(x, y, radius, className, id, _svg);
	}
	const rect = function(x, y, width, height, className, id) {
		return SVG.rect(x, y, width, height, className, id, _svg);
	}
	const polygon = function(pointsArray, className, id) {
		return SVG.polygon(pointsArray, className, id, _svg);
	}
	const bezier = function(fromX, fromY, c1X, c1Y, c2X, c2Y) {
		return SVG.bezier(fromX, fromY, c1X, c1Y, c2X, c2Y);
	}
	const download = function(filename = "image.svg"){
		return SVG.download(_svg, filename);
	}
	const load = function(data, callback){
		SVG.load(data, function(newSVG, error){
			if(newSVG != null){
				_parent.removeChild(_svg);
				_svg = newSVG;
				_parent.appendChild(_svg);
			}
			if(callback != null){ callback(newSVG, error); }
		});
	}

	// not exported
	const getWidth = function(){
		let w = _svg.getAttributeNS(null, "width");
		return w != null ? w : _svg.getBoundingClientRect().width;
	}
	const getHeight = function(){
		let h = _svg.getAttributeNS(null, "height");
		return h != null ? h : _svg.getBoundingClientRect().height;
	}

	// onload, find a parent element for the new SVG in the arguments
	document.addEventListener("DOMContentLoaded", function(){
		// wait until after the <body> has rendered
		let functions = params.filter((arg) => typeof arg === "function");
		let numbers = params.filter((arg) => !isNaN(arg));
		let element = params.filter((arg) =>
				arg instanceof HTMLElement)
			.shift();
		let idElement = params.filter((a) =>
				typeof a === "string" || a instanceof String)
			.map(str => document.getElementById(str))
			.shift();
		_parent = (element != null
			? element
			: (idElement != null
				? idElement
				: document.body));
		_parent.appendChild(_svg);
		if(numbers.length >= 2){
			_svg.setAttributeNS(null, "width", numbers[0]);
			_svg.setAttributeNS(null, "height", numbers[1]);
			SVG.setViewBox(_svg, 0, 0, numbers[0], numbers[1]);
		} else{
			let rect = _svg.getBoundingClientRect();
			SVG.setViewBox(_svg, 0, 0, rect.width, rect.height);
		}
		if(functions.length >= 1){
			functions[0]();
		}
	});

	// return Object.freeze({
	return {
		zoom, translate,
		load, download,
		group, line, circle, rect, polygon, bezier,
		setViewBox, getViewBox,
		get scale() { return _scale; },
		get svg() { return _svg; },
		get width() { return getWidth(); },
		get height() { return getHeight(); },
	};
	// });
}
