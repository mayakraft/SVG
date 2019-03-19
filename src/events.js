import { convertToViewBox } from "./viewBox";

// these are the names under which the event handlers live
const Names = {
	start: "onMouseDown",
	enter: "onMouseEnter",
	leave: "onMouseLeave",
	move: "onMouseMove",
	end: "onMouseUp",
	scroll: "onScroll",
};

export default function(node) {

	let _node; // this gets set inside setup()
	
	// let _node;
	let _pointer = Object.create(null);
	let _events = {};

	Object.assign(_pointer, {
		isPressed: false, // is the mouse button pressed (y/n)
		position: [0,0],  // the current position of the mouse [x,y]
		pressed: [0,0],   // the last location the mouse was pressed
		drag: [0,0],      // vector, displacement from start to now
		prev: [0,0],      // on mouseMoved, the previous location
		x: 0,             //
		y: 0              // -- x and y, copy of position data
	});

	// deep copy mouse object
	const getPointer = function() {
		let m = _pointer.position.slice();
		// if a property is an object it's an array. we can .slice()
		Object.keys(_pointer)
			.filter(key => typeof key === "object")
			.forEach(key => m[key] = _pointer[key].slice());
		Object.keys(_pointer)
			.filter(key => typeof key !== "object")
			.forEach(key => m[key] = _pointer[key]);
		return Object.freeze(m);
	};

	// clientX and clientY are from the browser event data
	const updatePointerPosition = function(clientX, clientY) {
		_pointer.prev = _pointer.position;
		_pointer.position = convertToViewBox(_node, clientX, clientY);
		_pointer.x = _pointer.position[0];
		_pointer.y = _pointer.position[1];
	};
	const updateTouchDrag = function() {
		// counting on updatePointerPosition to have just been called
		// using pointer.position instead of calling convertToViewBox again
		_pointer.drag = [_pointer.position[0] - _pointer.pressed[0], 
		               _pointer.position[1] - _pointer.pressed[1]];
		_pointer.drag.x = _pointer.drag[0];
		_pointer.drag.y = _pointer.drag[1];
	};

	// these attach to incoming DOM events
	const mouseMoveHandler = function(event) {
		updatePointerPosition(event.clientX, event.clientY);
		let mouse = getPointer();
		if (_pointer.isPressed) { updateTouchDrag(); }
		if (_events[Names.move]) {
			_events[Names.move].forEach(f => f(mouse));
		}
	};
	const mouseDownHandler = function(event) {
		_pointer.isPressed = true;
		_pointer.pressed = convertToViewBox(_node, event.clientX, event.clientY);
		if (_events[Names.start]) {
			let mouse = getPointer();
			_events[Names.start].forEach(f => f(mouse));
		}
	}
	const mouseUpHandler = function(event) {
		_pointer.isPressed = false;
		if (_events[Names.end]) {
			let mouse = getPointer();
			_events[Names.end].forEach(f => f(mouse));
		}
	};
	const mouseLeaveHandler = function(event) {
		updatePointerPosition(event.clientX, event.clientY);
		if (_events[Names.leave]) {
			let mouse = getPointer();
			_events[Names.leave].forEach(f => f(mouse));
		}
	};
	const mouseEnterHandler = function(event) {
		updatePointerPosition(event.clientX, event.clientY);
		if (_events[Names.enter]) {
			let mouse = getPointer();
			_events[Names.enter].forEach(f => f(mouse));
		}
	};
	const touchStartHandler = function(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		_pointer.isPressed = true;
		_pointer.pressed = convertToViewBox(_node, touch.clientX, touch.clientY);
		if (_events.oMouseDown) {
			let mouse = getPointer();
			_events.oMouseDown.forEach(f => f(mouse));
		}
	};
	const touchMoveHandler = function(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		updatePointerPosition(touch.clientX, touch.clientY);
		let mouse = getPointer();
		if (_pointer.isPressed) { updateTouchDrag(); }
		if (_events[Names.move]) {
			_events[Names.move].forEach(f => f(mouse));
		}
	};
	const scrollHandler = function(event) {
		// create scroll event object
		let e = {
			deltaX: event.deltaX,
			deltaY: event.deltaY,
			deltaZ: event.deltaZ,
		}
		e.position = convertToViewBox(_node, event.clientX, event.clientY);
		e.x = e.position[0];
		e.y = e.position[1];
		event.preventDefault();
		if (_events[Names.scroll]) {
			_events[Names.scroll].forEach(f => f(e));
		}
	};

	let _animate, _intervalID, _animationFrame;
	const updateAnimationHandler = function(handler) {
		if (_animate != null) {
			clearInterval(_intervalID);
		}
		_animate = handler;
		if (_animate != null) {
			_animationFrame = 0;
			_intervalID = setInterval(() => {
				let animObj = {
					"time": _node.getCurrentTime(),
					"frame": _animationFrame++
				};
				_animate(animObj);
			}, 1000/60);
		}
	};

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
		// wheel
		wheel: scrollHandler,
	};

	const addEventListener = function(eventName, func) {
		if (typeof func !== "function") {
			throw "must supply a function type to addEventListener";
		}
		if (_events[eventName] === undefined) {
			_events[eventName] = [];
		}
		_events[eventName].push(func);
	};

	const attachHandlers = function(element) {
		Object.keys(handlers).forEach(key => 
			element.addEventListener(key, handlers[key], false)
		);
		updateAnimationHandler(_animate);
	};

	const removeHandlers = function(element) {
		Object.keys(handlers).forEach(key => 
			element.removeEventListener(key, handlers[key], false)
		);
		if (_animate != null) {
			clearInterval(_intervalID);
		}
	};

	const setup = function(node) {
		if (_node != null) {
			removeHandlers(_node);
		}
		_node = node;

		Object.keys(Names).map(key => Names[key]).forEach(key => {
			Object.defineProperty(_node, key, {
				set: function(handler) { addEventListener(key, handler); }
			});
		});
		Object.defineProperty(_node, "animate", {
			set: function(handler) { updateAnimationHandler(handler); }
		});
		Object.defineProperty(_node, "mouse", {get: function(){ return getPointer(); }});
		Object.defineProperty(_node, "pointer", {get: function(){ return getPointer(); }});

		attachHandlers(_node);
	};

	setup(node);

	return {
		setup,
		remove: function() { removeHandlers(_node); }
	};
};
