/** interactive svg image
 * creates SVG, binds it to the DOM, supplies methods and handlers
 * @param: (number, number) width, height
 * @param: a DOM object or "string" DOM id- a parent to attach to
 */

import * as SVG from "./svg";
import { default as TouchPoints } from "./touchPoints";

export default function Image() {
	// get constructor parameters
	let params = Array.from(arguments);

	// create a new SVG
	let _svg = SVG.svg();

	let _parent = undefined;  // parent node

	// view properties
	let _scale = 1.0;
	let _padding = 0;

	let _matrix = _svg.createSVGMatrix();

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

	let properties = {
		touchPoints: []
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
		if (group == null) {
			group = _svg;
		}
		while (group.lastChild) {
			group.removeChild(group.lastChild);
		}
	}
	const save = function(filename = "image.svg") {
		return SVG.save(_svg, filename);
	}
	const load = function(data, callback) {
		SVG.load(data, function(newSVG, error) {
			if (newSVG != null) {
				// todo: do we need to remove any existing handlers to properly free memory?
				_parent.removeChild(_svg);
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

	// the user-defined event handlers are stored here
	let _onmousemove, _onmousedown, _onmouseup, _onmouseleave, _onmouseenter, _animate, _animationFrame, _intervalID;

	// deep copy mouse object
	function getMouse() {
		let m = _mouse.position.slice();
		// all object properties are Arrays. we can .slice()
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
		properties.touchPoints.onMouseMove(mouse);
		if (_mouse.isPressed) { updateMouseDrag(); }
		if (_onmousemove != null) { _onmousemove(mouse); }
	}
	function mouseDownHandler(event) {
		_mouse.isPressed = true;
		_mouse.pressed = SVG.convertToViewBox(_svg, event.clientX, event.clientY);
		let mouse = getMouse();
		properties.touchPoints.onMouseDown(mouse);
		if (_onmousedown != null) { _onmousedown(mouse); }
	}
	function mouseUpHandler(event) {
		_mouse.isPressed = false;
		let mouse = getMouse();
		properties.touchPoints.onMouseUp(mouse);
		if (_onmouseup != null) { _onmouseup(mouse); }
	}
	function mouseLeaveHandler(event) {
		updateMousePosition(event.clientX, event.clientY);
		if (_onmouseleave != null) { _onmouseleave(getMouse()); }
	}
	function mouseEnterHandler(event) {
		updateMousePosition(event.clientX, event.clientY);
		if (_onmouseenter != null) { _onmouseenter(getMouse()); }
	}
	function touchStartHandler(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		_mouse.isPressed = true;
		_mouse.pressed = SVG.convertToViewBox(_svg, touch.clientX, touch.clientY);
		let mouse = getMouse();
		properties.touchPoints.onMouseDown(mouse);
		if (_onmousedown != null) { _onmousedown(mouse); }
	}
	function touchMoveHandler(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		updateMousePosition(touch.clientX, touch.clientY);
		if (_mouse.isPressed) { updateMouseDrag(); }
		let mouse = getMouse();
		properties.touchPoints.onMouseMove(mouse);
		if (_onmousemove != null) { _onmousemove(mouse); }
	}
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

	const removeTouchPoints = function() {
		properties.touchPoints.forEach(tp => tp.remove());
		properties.touchPoints = [];
	}
	const makeTouchPoints = function(number) {
		removeTouchPoints();
		properties.touchPoints = TouchPoints(_svg, number, getWidth() * 0.01);
		return properties.touchPoints;
	}

	// return Object.freeze({
	return {
		zoom, translate, appendChild, removeChildren,
		load, save,
		setViewBox, getViewBox, size,
		get mouse() { return getMouse(); },
		get scale() { return _scale; },
		get svg() { return _svg; },
		get width() { return getWidth(); },
		get height() { return getHeight(); },
		set width(w) { _svg.setAttributeNS(null, "width", w); },
		set height(h) { _svg.setAttributeNS(null, "height", h); },
		set onMouseMove(handler) { _onmousemove = handler; },
		set onMouseDown(handler) { _onmousedown = handler; },
		set onMouseUp(handler) { _onmouseup = handler; },
		set onMouseLeave(handler) { _onmouseleave = handler; },
		set onMouseEnter(handler) { _onmouseenter = handler; },
		set animate(handler) { updateAnimationHandler(handler); },
		makeTouchPoints,
		get touchPoints() { return properties.touchPoints; }
		// set onResize(handler) {}
	};
	// });
}
