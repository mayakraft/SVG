/**
 * SVG (c) Kraft
 */
import Case from "../arguments/case";
import { convertToViewBox } from "../methods/viewBox";
import Libraries from "../environment/libraries";

const categories = {
	move: ["mousemove", "touchmove"],
	press: ["mousedown", "touchstart"], // "mouseover",
	release: ["mouseup", "touchend"],
	leave: ["mouseleave", "touchcancel"],
};

const handlerNames = Object.values(categories)
	.reduce((a, b) => a.concat(b), []);

const off = (element, handlers) => handlerNames.forEach((handlerName) => {
	handlers[handlerName].forEach(func => element.removeEventListener(handlerName, func));
	handlers[handlerName] = [];
});

const defineGetter = (obj, prop, value) => Object.defineProperty(obj, prop, {
	get: () => value,
	enumerable: true,
	configurable: true,
});

const assignPress = (e, startPoint) => {
	["pressX", "pressY"].filter(prop => !Object.prototype.hasOwnProperty.call(e, prop))
		.forEach((prop, i) => defineGetter(e, prop, startPoint[i]));
	if (!Object.prototype.hasOwnProperty.call(e, "press")) {
		defineGetter(e, "press", Libraries.math.vector(...startPoint));
	}
};

const TouchEvents = function (element) {
	// todo, more pointers for multiple screen touches

	let startPoint = [];
	// hold onto all handlers. to be able to turn them off
	const handlers = [];
	Object.keys(categories).forEach((key) => {
		categories[key].forEach((handler) => {
			handlers[handler] = [];
		});
	});

	const removeHandler = category => categories[category]
		.forEach(handlerName => handlers[handlerName]
			.forEach(func => element.removeEventListener(handlerName, func)));

	// add more properties depending on the type of handler
	const categoryUpdate = {
		press: (e, viewPoint) => {
			startPoint = viewPoint;
			assignPress(e, startPoint);
		},
		release: () => {},
		leave: () => {},
		move: (e, viewPoint) => {
			if (e.buttons > 0 && startPoint[0] === undefined) {
				startPoint = viewPoint;
			} else if (e.buttons === 0 && startPoint[0] !== undefined) {
				startPoint = [];
			}
			assignPress(e, startPoint);
		},
	};

	// assign handlers for onMove, onPress, onRelease
	Object.keys(categories).forEach((category) => {
		const propName = `on${Case.capitalized(category)}`;
		Object.defineProperty(element, propName, {
			set: (handler) => {
				if (handler == null) {
					removeHandler(category);
					return;
				}
				categories[category].forEach((handlerName) => {
					const handlerFunc = (e) => {
						// const pointer = (e.touches != null && e.touches.length
						const pointer = (e.touches != null
							? e.touches[0]
							: e);
						// onRelease events don't have a pointer
						if (pointer !== undefined) {
							const viewPoint = convertToViewBox(element, pointer.clientX, pointer.clientY)
								.map(n => (Number.isNaN(n) ? undefined : n)); // e.target
							["x", "y"]
								.filter(prop => !Object.prototype.hasOwnProperty.call(e, prop))
								.forEach((prop, i) => defineGetter(e, prop, viewPoint[i]));
							if (!Object.prototype.hasOwnProperty.call(e, "position")) {
								defineGetter(e, "position", Libraries.math.vector(...viewPoint));
							}
							categoryUpdate[category](e, viewPoint);
						}
						handler(e);
					};
					// node.js doesn't have addEventListener
					if (element.addEventListener) {
						handlers[handlerName].push(handlerFunc);
						element.addEventListener(handlerName, handlerFunc);
					}
				});
			},
			enumerable: true,
		});
	});

	Object.defineProperty(element, "off", { value: () => off(element, handlers) });
};

export default TouchEvents;
