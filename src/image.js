/** interactive svg image
 * creates SVG, binds it to the DOM, supplies methods and handlers
 * @param: (number, number) width, height
 * @param: a DOM object or "string" DOM id- a parent to attach to
 */

import * as SVG from "./svg";
import * as Events from "./events";

export default function() {
	
	// get constructor parameters
	let params = Array.from(arguments);

	// create a new SVG
	let _svg = SVG.svg();

	let properties = {
		parent: undefined,   // parent node
		padding: 0,
	};

	const setViewBox = function(x, y, width, height) {
		SVG.setViewBox(_svg, x, y, width, height, properties.padding);
	}
	const getViewBox = function() { return SVG.getViewBox(_svg); }
	const appendChild = function(element) { _svg.appendChild(element); }
	const removeChildren = function() { SVG.removeChildren(_svg); }
	const save = function(filename = "image.svg") {
		return SVG.save(_svg, filename);
	}
	const load = function(data, callback) {
		SVG.load(data, function(newSVG, error) {
			if (newSVG != null) {
				// todo: do we need to remove any existing handlers to properly free memory?
				if (_svg != null) {
					Events.deinit(_svg);
					_svg.remove();
				}
				_svg = newSVG;
				properties.parent.appendChild(_svg);
				// re-attach handlers
				Events.setup(_svg);
			}
			if (callback != null) { callback(newSVG, error); }
		});
	}
	const size = function(w, h) {
		if (w == null || h == null) { return; }
		let vb = SVG.getViewBox(_svg);
		SVG.setViewBox(_svg, vb[0], vb[1], w, h, properties.padding);
		_svg.setAttributeNS(null, "width", w);
		_svg.setAttributeNS(null, "height", h);
	}

	const getWidth = function() {
		let w = parseInt(_svg.getAttributeNS(null, "width"));
		return w != null && !isNaN(w) ? w : _svg.getBoundingClientRect().width;
	}
	const getHeight = function() {
		let h = parseInt(_svg.getAttributeNS(null, "height"));
		return h != null && !isNaN(h) ? h : _svg.getBoundingClientRect().height;
	}

	// after page load, find a parent element for the new SVG in the arguments
	const attachToDOM = function() {
		let functions = params.filter((arg) => typeof arg === "function");
		let numbers = params.filter((arg) => !isNaN(arg));
		let element = params.filter((arg) =>
				arg instanceof HTMLElement)
			.shift();
		let idElement = params.filter((a) =>
				typeof a === "string" || a instanceof String)
			.map(str => document.getElementById(str))
			.shift();
		properties.parent = (element != null
			? element
			: (idElement != null
				? idElement
				: document.body));
		properties.parent.appendChild(_svg);

		if (numbers.length >= 2) {
			_svg.setAttributeNS(null, "width", numbers[0]);
			_svg.setAttributeNS(null, "height", numbers[1]);
			SVG.setViewBox(_svg, 0, 0, numbers[0], numbers[1]);
		} 
		else if (_svg.getAttribute("viewBox") == null) {
			// set a viewBox if viewBox doesn't yet exist
			let rect = _svg.getBoundingClientRect();
			SVG.setViewBox(_svg, 0, 0, rect.width, rect.height);
		}

		if (functions.length >= 1) {
			functions[0]();
		}

		Events.setup(_svg);
	}
	// boot begin:
	// set numbers if they exist, before page has even loaded
	// this way the svg has a width and height even before document has loaded
	let numbers = params.filter((arg) => !isNaN(arg));
	if (numbers.length >= 2) {
		_svg.setAttributeNS(null, "width", numbers[0]);
		_svg.setAttributeNS(null, "height", numbers[1]);
		SVG.setViewBox(_svg, 0, 0, numbers[0], numbers[1]);
	} 

	if (document.readyState === 'loading') {
		// wait until after the <body> has rendered
		document.addEventListener('DOMContentLoaded', attachToDOM);
	} else {
		attachToDOM();
	}

	// Object.defineProperty(_svg, "appendChild", {value: appendChild});
	Object.defineProperty(_svg, "removeChildren", {value: removeChildren});
	Object.defineProperty(_svg, "load", {value: load});
	Object.defineProperty(_svg, "save", {value: save});
	Object.defineProperty(_svg, "setViewBox", {value: setViewBox});
	Object.defineProperty(_svg, "getViewBox", {value: getViewBox});
	Object.defineProperty(_svg, "size", {value: size});
	// Object.defineProperty(_svg, "addEventListener", {value: addEventListener});

	SVG.attachGeometryMethods(_svg);

	return _svg;
}
