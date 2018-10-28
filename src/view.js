/** svg file viewer
 * converts .fold file into SVG, binds it to the DOM
 * @param: (constructor) a DOM object or "string" DOM id
 *  and this will bind the SVG to it.
 */

"use strict";

import SVG from "./svg";

export default function View(){
	// get constructor parameters
	let params = Array.from(arguments);

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
		SVG.translate(svg, dx, dy);
	}

	const setViewBox = function(x, y, width, height){
		SVG.setViewBox(svg, x, y, width, height, _padding);
	}

	// find a parent element for the new SVG in the arguments
	document.addEventListener("DOMContentLoaded", function(){
		// wait until after the <body> has rendered
		let numbers = params.filter((arg) => !isNaN(arg));
		let element = params.filter((arg) =>
				arg instanceof HTMLElement)
			.shift();
		let idElement = params.filter((a) =>
				typeof a === "string" || a instanceof String)
			.map(str => document.getElementById(str))
			.shift();
		let parent = (element != null 
			? element 
			: (idElement != null 
				? idElement 
				: document.body));
		parent.appendChild(svg);
		if(numbers.length >= 2){
			svg.setAttributeNS(null, "width", numbers[0]);
			svg.setAttributeNS(null, "height", numbers[1]);
			SVG.setViewBox(svg, 0, 0, numbers[0], numbers[1]);
		} else{
			let rect = svg.getBoundingClientRect();
			SVG.setViewBox(svg, 0, 0, rect.width, rect.height);
		}
	});

	// return Object.freeze({
	return {
		svg,
		zoomView,
		translate,
		setViewBox
	};
	// });
}
