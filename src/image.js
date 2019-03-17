/** interactive svg image
 * creates SVG, binds it to the DOM, supplies methods and handlers
 * @param: (number, number) width, height
 * @param: a DOM object or "string" DOM id- a parent to attach to
 */

import * as SVG from "./svg";

export default function() {
	// get constructor parameters
	let params = Array.from(arguments);

	// create a new SVG
	let _svg = SVG.svg();

	let _parent = undefined;  // parent node

	// view properties
	// let _scale = 1.0;
	let _padding = 0;

	let _matrix = _svg.createSVGMatrix();

	let _events = {}; // mouse/touch event handlers are stored here
	let _mouse = Object.create(null);
	Object.assign(_mouse, {
		isPressed: false, // is the mouse button pressed (y/n)
		position: [0,0],  // the current position of the mouse [x,y]
		pressed: [0,0],   // the last location the mouse was pressed
		drag: [0,0],      // vector, displacement from start to now
		prev: [0,0],      // on mouseMoved, the previous location
		x: 0,             //
		y: 0              // -- x and y, copy of position data
	});

	// exported
	// const zoom = function(scale, origin_x = 0, origin_y = 0) {
	// 	_scale = scale;
	// 	SVG.scaleViewBox(_svg, scale, origin_x, origin_y);
	// }
	// const translate = function(dx, dy) {
	// 	SVG.translateViewBox(_svg, dx, dy);
	// }
	const setViewBox = function(x, y, width, height) {
		SVG.setViewBox(_svg, x, y, width, height, _padding);
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
				if (_svg != null) { _svg.remove(); }
				_svg = newSVG;
				_parent.appendChild(_svg);
				// re-attach handlers
				attachHandlers();
			}
			if (callback != null) { callback(newSVG, error); }
		});
	}
	const size = function(w, h) {
		if (w == null || h == null) { return; }
		let vb = SVG.getViewBox(_svg);
		SVG.setViewBox(_svg, vb[0], vb[1], w, h, _padding);
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
		_parent = (element != null
			? element
			: (idElement != null
				? idElement
				: document.body));
		_parent.appendChild(_svg);

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

		attachHandlers();
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

	function attachHandlers() {
		// mouse
		_svg.addEventListener("mouseup", mouseUpHandler, false);
		_svg.addEventListener("mousedown", mouseDownHandler, false);
		_svg.addEventListener("mousemove", mouseMoveHandler, false);
		_svg.addEventListener("mouseleave", mouseLeaveHandler, false);
		_svg.addEventListener("mouseenter", mouseEnterHandler, false);
		// touches
		_svg.addEventListener("touchend", mouseUpHandler, false);
		_svg.addEventListener("touchmove", touchMoveHandler, false);
		_svg.addEventListener("touchstart", touchStartHandler, false);
		_svg.addEventListener("touchcancel", mouseUpHandler, false);
	}

	// deep copy mouse object
	function getMouse() {
		let m = _mouse.position.slice();
		// if a property is an object it's an array. we can .slice()
		Object.keys(_mouse)
			.filter(key => typeof key === "object")
			.forEach(key => m[key] = _mouse[key].slice());
		Object.keys(_mouse)
			.filter(key => typeof key !== "object")
			.forEach(key => m[key] = _mouse[key]);
		return Object.freeze(m);
	}
	// clientX and clientY are from the browser event data
	function updateMousePosition(clientX, clientY) {
		_mouse.prev = _mouse.position;
		_mouse.position = SVG.convertToViewBox(_svg, clientX, clientY);
		_mouse.x = _mouse.position[0];
		_mouse.y = _mouse.position[1];
	}
	function updateMouseDrag() {
		// counting on updateMousePosition to have just been called
		// using mouse.position instead of calling SVG.convertToViewBox again
		_mouse.drag = [_mouse.position[0] - _mouse.pressed[0], 
		               _mouse.position[1] - _mouse.pressed[1]];
		_mouse.drag.x = _mouse.drag[0];
		_mouse.drag.y = _mouse.drag[1];
	}

	function mouseMoveHandler(event) {
		updateMousePosition(event.clientX, event.clientY);
		let mouse = getMouse();
		if (_mouse.isPressed) { updateMouseDrag(); }
		if (_events.mousemove) {
			_events.mousemove.forEach(f => f(mouse));
		}
	}
	function mouseDownHandler(event) {
		_mouse.isPressed = true;
		_mouse.pressed = SVG.convertToViewBox(_svg, event.clientX, event.clientY);
		if (_events.mousedown) {
			let mouse = getMouse();
			_events.mousedown.forEach(f => f(mouse));
		}
	}
	function mouseUpHandler(event) {
		_mouse.isPressed = false;
		if (_events.mouseup) {
			let mouse = getMouse();
			_events.mouseup.forEach(f => f(mouse));
		}
	}
	function mouseLeaveHandler(event) {
		updateMousePosition(event.clientX, event.clientY);
		if (_events.mouseleave) {
			let mouse = getMouse();
			_events.mouseleave.forEach(f => f(mouse));
		}
	}
	function mouseEnterHandler(event) {
		updateMousePosition(event.clientX, event.clientY);
		if (_events.mouseenter) {
			let mouse = getMouse();
			_events.mouseenter.forEach(f => f(mouse));
		}
	}
	function touchStartHandler(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		_mouse.isPressed = true;
		_mouse.pressed = SVG.convertToViewBox(_svg, touch.clientX, touch.clientY);
		if (_events.mousedown) {
			let mouse = getMouse();
			_events.mousedown.forEach(f => f(mouse));
		}
	}
	function touchMoveHandler(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		updateMousePosition(touch.clientX, touch.clientY);
		let mouse = getMouse();
		if (_mouse.isPressed) { updateMouseDrag(); }
		if (_events.mousemove) {
			_events.mousemove.forEach(f => f(mouse));
		}
	}
	let _animate, _intervalID, _animationFrame;
	function updateAnimationHandler(handler) {
		if (_animate != null) {
			clearInterval(_intervalID);
		}
		_animate = handler;
		if (_animate != null) {
			_animationFrame = 0;
			_intervalID = setInterval(() => {
				let animObj = {
					"time": _svg.getCurrentTime(),
					"frame": _animationFrame++
				};
				_animate(animObj);
			}, 1000/60);
		}
	}
	// these are the same as mouseUpHandler
	// function touchEndHandler(event) { }
	// function touchCancelHandler(event) { }

	const addEventListener = function(eventName, func) {
		if (typeof func !== "function") {
			throw "must supply a function type to addEventListener";
		}
		if (_events[eventName] === undefined) {
			_events[eventName] = [];
		}
		_events[eventName].push(func);
	}

	// return Object.freeze({
	let _this = {
		// zoom, translate, 
		appendChild, removeChildren,
		load, save,
		setViewBox, getViewBox, size,
		get mouse() { return getMouse(); },
		// get scale() { return _scale; },
		get svg() { return _svg; },
		get width() { return getWidth(); },
		get height() { return getHeight(); },
		set width(w) { _svg.setAttributeNS(null, "width", w); },
		set height(h) { _svg.setAttributeNS(null, "height", h); },
		set onMouseMove(handler) { addEventListener("mousemove", handler); },
		set onMouseDown(handler) { addEventListener("mousedown", handler); },
		set onMouseUp(handler) { addEventListener("mouseup", handler); },
		set onMouseLeave(handler) { addEventListener("mouseleave", handler); },
		set onMouseEnter(handler) { addEventListener("mouseenter", handler); },
		set animate(handler) { updateAnimationHandler(handler); },
		addEventListener
		// set onResize(handler) {}		
	};

	const drawingMethods = {
		"line" : SVG.line,
		"circle" : SVG.circle,
		"ellipse" : SVG.ellipse,
		"rect" : SVG.rect,
		"polygon" : SVG.polygon,
		"polyline" : SVG.polyline,
		"bezier" : SVG.bezier,
		"text" : SVG.text,
		"wedge" : SVG.wedge,
		"arc" : SVG.arc,
		"regularPolygon" : SVG.regularPolygon,
		"group" : SVG.group
	};

	Object.keys(drawingMethods).forEach(key => {
		_this[key] = function() {
			let g = drawingMethods[key](...arguments);
			_this.appendChild(g);
			return g;
		};
	});

	return _this;
	// });
}
