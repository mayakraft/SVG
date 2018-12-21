/** svg file viewer
 * converts .fold file into SVG, binds it to the DOM
 * @param: (constructor) a DOM object or "string" DOM id
 *  and this will bind the SVG to it.
 */

"use strict";

import * as SVG from "./svg";

export default function View() {
	// get constructor parameters
	let params = Array.from(arguments);

	// create a new SVG
	let _svg = SVG.svg();

	let _parent = undefined;  // parent node

	// view properties
	let _scale = 1.0;
	let _padding = 0;

	let _matrix = _svg.createSVGMatrix();

	let _mouse = {
		isPressed: false,// is the mouse button pressed (y/n)
		position: [0,0], // the current position of the mouse
		pressed: [0,0],  // the last location the mouse was pressed
		drag: [0,0],     // vector, displacement from start to now
		prev: [0,0],     // on mouseMoved, this was the previous location
		x: 0,      // redundant data --
		y: 0       // -- these are the same as position
	};

	// exported
	const zoom = function(scale, origin_x = 0, origin_y = 0) {
		_scale = scale;
		SVG.scale(_svg, scale, origin_x, origin_y);
	}
	const translate = function(dx, dy) {
		SVG.translate(_svg, dx, dy);
	}
	const setViewBox = function(x, y, width, height) {
		SVG.setViewBox(_svg, x, y, width, height, _padding);
	}
	const getViewBox = function() {
		return SVG.getViewBox(_svg);
	}
	const appendChild = function(element) {
		_svg.appendChild(element);
	}
	const removeChildren = function(group) {
		// serves 2 functions:
		// removeChildren() will remove all children from this SVG.
		// removeChildren(group) will remove children from *group*
		if(group == null) {
			group = _svg;
		}
		while (group.lastChild) {
			group.removeChild(group.lastChild);
		}
	}
	const download = function(filename = "image.svg") {
		return SVG.download(_svg, filename);
	}
	const load = function(data, callback) {
		SVG.load(data, function(newSVG, error) {
			if(newSVG != null) {
				// todo: do we need to remove any existing handlers to properly free memory?
				_parent.removeChild(_svg);
				_svg = newSVG;
				_parent.appendChild(_svg);
				// re-attach any preexisting handlers
				updateHandlers();
			}
			if(callback != null) { callback(newSVG, error); }
		});
	}
	const size = function(w, h) {
		let vb = SVG.getViewBox(_svg);
		SVG.setViewBox(_svg, vb[0], vb[1], w, h, _padding);
		_svg.setAttributeNS(null, "width", w);
		_svg.setAttributeNS(null, "height", h);
	}

	// not exported
	const getWidth = function() {
		let w = parseInt(_svg.getAttributeNS(null, "width"));
		return w != null ? w : _svg.getBoundingClientRect().width;
	}
	const getHeight = function() {
		let h = parseInt(_svg.getAttributeNS(null, "height"));
		return h != null ? h : _svg.getBoundingClientRect().height;
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
		_parent = (element != null
			? element
			: (idElement != null
				? idElement
				: document.body));
		_parent.appendChild(_svg);

		if(numbers.length >= 2) {
			_svg.setAttributeNS(null, "width", numbers[0]);
			_svg.setAttributeNS(null, "height", numbers[1]);
			SVG.setViewBox(_svg, 0, 0, numbers[0], numbers[1]);
		} 
		else if(_svg.getAttribute("viewBox") == null) {
			// set a viewBox if viewBox doesn't yet exist
			let rect = _svg.getBoundingClientRect();
			SVG.setViewBox(_svg, 0, 0, rect.width, rect.height);
		}

		if(functions.length >= 1) {
			functions[0]();
		}
	}
	// boot begin:
	// set numbers if they exist, before page has even loaded
	// this way the svg has a width and height even before document has loaded
	let numbers = params.filter((arg) => !isNaN(arg));
	if(numbers.length >= 2) {
		_svg.setAttributeNS(null, "width", numbers[0]);
		_svg.setAttributeNS(null, "height", numbers[1]);
		SVG.setViewBox(_svg, 0, 0, numbers[0], numbers[1]);
	} 

	if(document.readyState === 'loading') {
		// wait until after the <body> has rendered
		document.addEventListener('DOMContentLoaded', attachToDOM);
	} else {
		attachToDOM();
	}

	let _onmousemove, _onmousedown, _onmouseup, _onmouseleave, _onmouseenter, _animate, _animationFrame;

	// clientX and clientY are from the browser event data
	function updateMousePosition(clientX, clientY) {
		_mouse.prev = _mouse.position;
		_mouse.position = SVG.convertToViewBox(_svg, clientX, clientY);
		_mouse.x = _mouse.position[0];
		_mouse.y = _mouse.position[1];
	}

	function updateHandlers() {
		_svg.onmousemove = function(event) {
			updateMousePosition(event.clientX, event.clientY);
			if(_mouse.isPressed) {
				_mouse.drag = [_mouse.position[0] - _mouse.pressed[0], 
				               _mouse.position[1] - _mouse.pressed[1]];
				_mouse.drag.x = _mouse.drag[0];
				_mouse.drag.y = _mouse.drag[1];
			}
			if(_onmousemove != null) { _onmousemove( Object.assign({}, _mouse) ); }
		}
		_svg.onmousedown = function(event) {
			_mouse.isPressed = true;
			_mouse.pressed = SVG.convertToViewBox(_svg, event.clientX, event.clientY);
			if(_onmousedown != null) { _onmousedown( Object.assign({}, _mouse) ); }
		}
		_svg.onmouseup = function(event) {
			_mouse.isPressed = false;
			if(_onmouseup != null) { _onmouseup( Object.assign({}, _mouse) ); }
		}
		_svg.onmouseleave = function(event) {
			updateMousePosition(event.clientX, event.clientY);
			if(_onmouseleave != null) { _onmouseleave( Object.assign({}, _mouse) ); }
		}
		_svg.onmouseenter = function(event) {
			updateMousePosition(event.clientX, event.clientY);
			if(_onmouseenter != null) { _onmouseenter( Object.assign({}, _mouse) ); }
		}
	}

	// return Object.freeze({
	return {
		zoom, translate, appendChild, removeChildren,
		load, download,
		setViewBox, getViewBox, size,
		get scale() { return _scale; },
		get svg() { return _svg; },
		get width() { return getWidth(); },
		get height() { return getHeight(); },
		set onMouseMove(handler) {
			_onmousemove = handler;
			updateHandlers();
		},
		set onMouseDown(handler) {
			_onmousedown = handler;
			updateHandlers();
		},
		set onMouseUp(handler) {
			_onmouseup = handler;
			updateHandlers();
		},
		set onMouseLeave(handler) {
			_onmouseleave = handler;
			updateHandlers();
		},
		set onMouseEnter(handler) {
			_onmouseenter = handler;
			updateHandlers();
		},
		set animate(handler) {
			if (_animate != null) {
				clearInterval(_animate);
			}
			_animate = handler;
			if (_animate != null) {
				_animationFrame = 0;
				setInterval(function() {
					let animObj = {
						"time": _svg.getCurrentTime(),
						"frame": _animationFrame++
					};
					_animate(animObj);
				}, 1000/60);
			}
		}
		// set onMouseDidBeginDrag(handler) {}
		// set onResize(handler) {}
	};
	// });
}
