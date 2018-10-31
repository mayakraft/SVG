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
	let _svg = SVG.svg();

	let _parent = undefined;  // parent xml node

	// view properties
	let _scale = 1.0;
	let _padding = 0;

	let _matrix = _svg.createSVGMatrix();

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

	// load an SVG. XML tree, file blob, or filename string
	const load = function(data, callback){
		// are they giving us a filename, or the data of an already loaded file?
		if (typeof data === "string" || data instanceof String){
			fetch(data)
				.then(response => response.text())
				.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
				.then(svgData => {
					var cssStyle, styleTag = svgData.getElementsByTagName('style')[0];
					if(styleTag != undefined && styleTag.childNodes != undefined && styleTag.childNodes.length > 0){
						cssStyle = parseCSSText( styleTag.childNodes[0].nodeValue );
					}
					var allSVGs = svgData.getElementsByTagName('svg');
					if(allSVGs == undefined || allSVGs.length == 0){ throw "error, the svg parser couldn't find an SVG element"; }
					// success, we found an svg
					_parent.removeChild(_svg);
					_svg = allSVGs[0];
					_parent.appendChild(_svg);

					if(callback != undefined){ callback(cp); }
				});
		}
		if(data instanceof HTMLElement){
			console.log("data instanceof HTMLElement");
			rootElement = (new window.DOMParser()).parseFromString(string, "text/xml");
		}
	}
	// onload, find a parent element for the new SVG in the arguments
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
	});

	// return Object.freeze({
	return {
		zoom,
		translate,
		setViewBox,
		load,
		get scale() { return _scale; },
		get svg() { return _svg; },
	};
	// });
}
