import * as SVG from "./svg";

const touchPoint = function(parent, radius) {

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
			setPosition(mouse[0], mouse[1]);
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
	return {
		circle: c,
		set position(pos) {
			if (pos[0] != null) { setPosition(pos[0], pos[1]); }
			else if (pos.x != null) { setPosition(pos.x, pos.y); }
		},
		onMouseUp,
		onMouseMove,
		distance,
		set selected(value) { _selected = true; }
	};
}

export default function(parent, number = 1, radius) {
	let points = Array.from(Array(number)).map(_ => touchPoint(parent, radius));

	let _selected = undefined;

	const onMouseDown = function(mouse) {
		if (!(points.length > 0)) { return; }
		_selected = points
			.map((p,i) => ({i:i, d:p.distance(mouse)}))
			.sort((a,b) => a.d - b.d)
			.shift()
			.i;
		points[_selected].selected = true;
	}

	const onMouseMove = function(mouse) {
		points.forEach(p => p.onMouseMove(mouse));
	}

	const onMouseUp = function(mouse) {
		points.forEach(p => p.onMouseUp(mouse));
		_selected = undefined;
	}

	Object.defineProperty(points, "onMouseDown", {value: onMouseDown});
	Object.defineProperty(points, "onMouseMove", {value: onMouseMove});
	Object.defineProperty(points, "onMouseUp", {value: onMouseUp});
	Object.defineProperty(points, "selected", {get: function() { return _selected; }});

	return points;
}
