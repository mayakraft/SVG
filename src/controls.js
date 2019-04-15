import { circle } from "./elements";
import { convertToViewBox } from "./viewBox";

const controlPoint = function(parent, options) {
	if (options == null) { options = {}; }
	if (options.radius == null) { options.radius = 1; }
	if (options.fill == null) { options.fill = "#000000"; }
	if (options.position == null) { options.position = [0,0]; }

	let c = circle(0, 0, options.radius);
	c.setAttribute("fill", options.fill);
	let _position = options.position.slice();
	let _selected = false;

	if (parent != null) {
		parent.appendChild(c);
	}

	const setPosition = function(x, y) {
		_position[0] = x;
		_position[1] = y;
		c.setAttribute("cx", x);
		c.setAttribute("cy", y);
	}
	const onMouseMove = function(mouse) {
		if (_selected) {
			let pos = _updatePosition(mouse);
			setPosition(pos[0], pos[1]);
		}
	}
	const onMouseUp = function() {
		_selected = false;
	}
	const distance = function(mouse) {
		return Math.sqrt(
			Math.pow(mouse[0] - _position[0], 2) +
			Math.pow(mouse[1] - _position[1], 2)
		);
	}
	let _updatePosition = function(input){ return input; }
	return {
		circle: c,
		set position(pos) {
			if (pos[0] != null) { setPosition(pos[0], pos[1]); }
			else if (pos.x != null) { setPosition(pos.x, pos.y); }
		},
		get position() { return [..._position]; },
		onMouseUp,
		onMouseMove,
		distance,
		set positionDidUpdate(method) { _updatePosition = method; },
		set selected(value) { _selected = true; }
	};
}

export default function(svgObject, number = 1, options) {
	// constructor options
	if (options == null) { options = {}; }
	if (options.parent == null) { options.parent = svgObject; }
	if (options.radius == null) { options.radius = 1; }
	if (options.fill == null) { options.fill = "#000000"; }

	let _points = Array.from(Array(number)).map(_ => controlPoint(options.parent, options));
	let _selected = undefined;

	const mouseDownHandler = function(event) {
		event.preventDefault();
		let mouse = convertToViewBox(svgObject, event.clientX, event.clientY);
		if (!(_points.length > 0)) { return; }
		_selected = _points
			.map((p,i) => ({i:i, d:p.distance(mouse)}))
			.sort((a,b) => a.d - b.d)
			.shift()
			.i;
		_points[_selected].selected = true;
	}
	const mouseMoveHandler = function(event) {
		event.preventDefault();
		let mouse = convertToViewBox(svgObject, event.clientX, event.clientY);
		_points.forEach(p => p.onMouseMove(mouse));
	}
	const mouseUpHandler = function(event) {
		event.preventDefault();
		_points.forEach(p => p.onMouseUp());
		_selected = undefined;
	}
	const touchDownHandler = function(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		let pointer = convertToViewBox(svgObject, touch.clientX, touch.clientY);
		if (!(_points.length > 0)) { return; }
		_selected = _points
			.map((p,i) => ({i:i, d:p.distance(pointer)}))
			.sort((a,b) => a.d - b.d)
			.shift()
			.i;
		_points[_selected].selected = true;
	}
	const touchMoveHandler = function(event) {
		event.preventDefault();
		let touch = event.touches[0];
		if (touch == null) { return; }
		let pointer = convertToViewBox(svgObject, touch.clientX, touch.clientY);
		_points.forEach(p => p.onMouseMove(pointer));
	}
	const touchUpHandler = function(event) {
		event.preventDefault();
		_points.forEach(p => p.onMouseUp());
		_selected = undefined;
	}
	svgObject.addEventListener("touchstart", touchDownHandler, false);
	svgObject.addEventListener("touchend", touchUpHandler, false);
	svgObject.addEventListener("touchcancel", touchUpHandler, false);
	svgObject.addEventListener("touchmove", touchMoveHandler, false);
	svgObject.addEventListener("mousedown", mouseDownHandler, false);
	svgObject.addEventListener("mouseup", mouseUpHandler, false);
	svgObject.addEventListener("mousemove", mouseMoveHandler, false);

	Object.defineProperty(_points, "selectedIndex", {get: function() { return _selected; }});
	Object.defineProperty(_points, "selected", {get: function() { return _points[_selected]; }});
	Object.defineProperty(_points, "removeAll", {value: function() {
		_points.forEach(tp => tp.remove());
		// todo: untie all event handlers
	}});

	return _points;
}
