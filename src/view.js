/** svg file viewer
 * converts .fold file into SVG, binds it to the DOM
 * @param: (constructor) a DOM object or "string" DOM id
 *  and this will bind the SVG to it.
 */

"use strict";

import SVG from "./svg";

export default function View(){

	// create a new SVG
	let svg = SVG.svg();

	// view properties
	let _zoom = 1.0;
	let _padding = 0.01;

	// set padding(pad){
	// 	_padding = isNaN(pad) ? _padding : pad;
	// }

	// set zoom(new_zoom){
	// 	_zoom = isNaN(new_zoom) ? _zoom : new_zoom;
	// }

	const zoomView = function(scale, origin_x, origin_y){
		// zoom view
	}

	const translate = function(dx, dy){
		// translate view
	}

	const setViewBox = function(x, y, width, height){
		SVG.setViewBox(svg, x, y, width, height, _padding);
	}

	// find a parent element for the new SVG in the arguments
	document.addEventListener("DOMContentLoaded", function(){
		// wait until after the <body> has rendered
		let args = Array.from(arguments);
		let element = args.filter((arg) =>
				arg instanceof HTMLElement)
			.shift();
		let idElement = args.filter((a) =>
				typeof a === "string" || a instanceof String)
			.map(str => document.getElementById(str))
			.shift();
		let parent = (element != null 
			? element 
			: (idElement != null 
				? idElement 
				: document.body));
		parent.appendChild(svg);
	});

	return Object.freeze({
		svg,
		zoomView,
		translate,
		setViewBox
	});
}
