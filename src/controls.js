import * as SVG from "./svg";

const controlPoint = function(parent, radius) {

	let c = SVG.circle(0, 0, radius);
	let _position = [0,0];
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
	const onMouseUp = function(mouse) {
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

export default function(parent, number = 1, radius) {
	let _points = Array.from(Array(number)).map(_ => controlPoint(parent, radius));
	let _selected = undefined;

	const onMouseDown = function(mouse) {
		if (!(_points.length > 0)) { return; }
		_selected = _points
			.map((p,i) => ({i:i, d:p.distance(mouse)}))
			.sort((a,b) => a.d - b.d)
			.shift()
			.i;
		_points[_selected].selected = true;
	}

	const onMouseMove = function(mouse) {
		_points.forEach(p => p.onMouseMove(mouse));
	}

	const onMouseUp = function(mouse) {
		_points.forEach(p => p.onMouseUp(mouse));
		_selected = undefined;
	}

	Object.defineProperty(_points, "onMouseDown", {value: onMouseDown});
	Object.defineProperty(_points, "onMouseMove", {value: onMouseMove});
	Object.defineProperty(_points, "onMouseUp", {value: onMouseUp});
	Object.defineProperty(_points, "selectedIndex", {get: function() { return _selected; }});
	Object.defineProperty(_points, "selected", {get: function() { return _points[_selected]; }});

	return _points;
}
