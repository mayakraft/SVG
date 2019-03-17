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

	let prop = {
		parent: undefined,   // parent node
		padding: 0,
		events: {},  // mouse/touch event handlers are stored here
		mouse: Object.create(null)
	}

	Object.assign(prop.mouse, {
		isPressed: false, // is the mouse button pressed (y/n)
		position: [0,0],  // the current position of the mouse [x,y]
		pressed: [0,0],   // the last location the mouse was pressed
		drag: [0,0],      // vector, displacement from start to now
		prev: [0,0],      // on mouseMoved, the previous location
		x: 0,             //
		y: 0              // -- x and y, copy of position data
	});

	const setViewBox = function(x, y, width, height) {
		SVG.setViewBox(_svg, x, y, width, height, prop.padding);
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
				prop.parent.appendChild(_svg);
				// re-attach handlers
				removeHandlers()
				attachHandlers();
			}
			if (callback != null) { callback(newSVG, error); }
		});
	}
	const size = function(w, h) {
		if (w == null || h == null) { return; }
		let vb = SVG.getViewBox(_svg);
		SVG.setViewBox(_svg, vb[0], vb[1], w, h, prop.padding);
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
		prop.parent = (element != null
			? element
			: (idElement != null
				? idElement
				: document.body));
		prop.parent.appendChild(_svg);

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

	// deep copy mouse object
	function getMouse() {
		let m = prop.mouse.position.slice();
		// if a property is an object it's an array. we can .slice()
		Object.keys(prop.mouse)
			.filter(key => typeof key === "object")
			.forEach(key => m[key] = prop.mouse[key].slice());
		Object.keys(prop.mouse)
			.filter(key => typeof key !== "object")
			.forEach(key => m[key] = prop.mouse[key]);
		return Object.freeze(m);
	}
	// clientX and clientY are from the browser event data
	function updateMousePosition(clientX, clientY) {
		prop.mouse.prev = prop.mouse.position;
		prop.mouse.position = SVG.convertToViewBox(_svg, clientX, clientY);
		prop.mouse.x = prop.mouse.position[0];
		prop.mouse.y = prop.mouse.position[1];
	}
	function updateMouseDrag() {
		// counting on updateMousePosition to have just been called
		// using mouse.position instead of calling SVG.convertToViewBox again
		prop.mouse.drag = [prop.mouse.position[0] - prop.mouse.pressed[0], 
		               prop.mouse.position[1] - prop.mouse.pressed[1]];
		prop.mouse.drag.x = prop.mouse.drag[0];
		prop.mouse.drag.y = prop.mouse.drag[1];
	}

	const mouseMoveHandler = function(event) {
		updateMousePosition(event.clientX, event.clientY);
		let mouse = getMouse();
		if (prop.mouse.isPressed) { updateMouseDrag(); }
		if (prop.events.mousemove) {
			prop.events.mousemove.forEach(f => f(mouse));
		}
	}
	const mouseDownHandler = function(event) {
		prop.mouse.isPressed = true;
		prop.mouse.pressed = SVG.convertToViewBox(_svg, event.clientX, event.clientY);
		if (prop.events.mousedown) {
			let mouse = getMouse();
			prop.events.mousedown.forEach(f => f(mouse));
		}
	}
	const mouseUpHandler = function(event) {
		prop.mouse.isPressed = false;
		if (prop.events.mouseup) {
			let mouse = getMouse();
			prop.events.mouseup.forEach(f => f(mouse));
		}
	}
	const mouseLeaveHandler = function(event) {
		updateMousePosition(event.clientX, event.clientY);
		if (prop.events.mouseleave) {
			let mouse = getMouse();
			prop.events.mouseleave.forEach(f => f(mouse));
		}
	}
	const mouseEnterHandler = function(event) {
		updateMousePosition(event.clientX, event.clientY);
		if (prop.events.mouseenter) {
			let mouse = getMouse();
			prop.events.mouseenter.forEach(f => f(mouse));
		}
	}
	const touchStartHandler = function(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		prop.mouse.isPressed = true;
		prop.mouse.pressed = SVG.convertToViewBox(_svg, touch.clientX, touch.clientY);
		if (prop.events.mousedown) {
			let mouse = getMouse();
			prop.events.mousedown.forEach(f => f(mouse));
		}
	}
	const touchMoveHandler = function(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		updateMousePosition(touch.clientX, touch.clientY);
		let mouse = getMouse();
		if (prop.mouse.isPressed) { updateMouseDrag(); }
		if (prop.events.mousemove) {
			prop.events.mousemove.forEach(f => f(mouse));
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

	const handlers = {
		// mouse
		mouseup: mouseUpHandler,
		mousedown: mouseDownHandler,
		mousemove: mouseMoveHandler,
		mouseleave: mouseLeaveHandler,
		mouseenter: mouseEnterHandler,
		// touches
		touchend: mouseUpHandler,
		touchmove: touchMoveHandler,
		touchstart: touchStartHandler,
		touchcancel: mouseUpHandler,
	};
	const removeHandlers = function() {
		Object.keys(handlers).forEach(key => 
			_svg.removeEventListener(key, handlers[key], false)
		);
	}
	const attachHandlers = function() {
		Object.keys(handlers).forEach(key => 
			_svg.addEventListener(key, handlers[key], false)
		);
	}

	// these are the same as mouseUpHandler
	// function touchEndHandler(event) { }
	// function touchCancelHandler(event) { }

	const addEventListener = function(eventName, func) {
		if (typeof func !== "function") {
			throw "must supply a function type to addEventListener";
		}
		if (prop.events[eventName] === undefined) {
			prop.events[eventName] = [];
		}
		prop.events[eventName].push(func);
	}
/*
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
	};*/

	Object.defineProperty(_svg, "mouse", {get: function(){ return getMouse(); }});
	// Object.defineProperty(_svg, "width", {get: function(){ return getWidth(); }});
	// Object.defineProperty(_svg, "height", {get: function(){ return getHeight(); }});
	// Object.defineProperty(_svg, "width", {set: function(w){ _svg.setAttributeNS(null, "width", w); }});
	// Object.defineProperty(_svg, "height", {set: function(h){ _svg.setAttributeNS(null, "height", h); }});
	Object.defineProperty(_svg, "mousemove", {set: function(handler) { addEventListener("mousemove", handler); }});
	Object.defineProperty(_svg, "mousedown", {set: function(handler) { addEventListener("mousedown", handler); }});
	Object.defineProperty(_svg, "mouseup", {set: function(handler) { addEventListener("mouseup", handler); }});
	Object.defineProperty(_svg, "mouseleave", {set: function(handler) { addEventListener("mouseleave", handler); }});
	Object.defineProperty(_svg, "mouseenter", {set: function(handler) { addEventListener("mouseenter", handler); }});
	Object.defineProperty(_svg, "animate", {set: function(handler) { updateAnimationHandler(handler); }});

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
	// });
}
