/**
 * SVG (c) Kraft
 */
import window from "../environment/window";
import UUID from "../arguments/uuid";

const Animation = function (element) {
	// let fps; // todo: bring this back

	let start;
	const handlers = {};
	let frame = 0;
	let requestId;

	const removeHandlers = () => {
		if (window().cancelAnimationFrame) {
			window().cancelAnimationFrame(requestId);
		}
		Object.keys(handlers)
			.forEach(uuid => delete handlers[uuid]);
		start = undefined;
		frame = 0;
	};

	Object.defineProperty(element, "play", {
		set: (handler) => {
			removeHandlers();
			if (handler == null) { return; }
			const uuid = UUID();
			const handlerFunc = (e) => {
				if (!start) {
					start = e;
					frame = 0;
				}
				const progress = (e - start) * 0.001;
				handler({ time: progress, frame });
				// prepare next frame
				frame += 1;
				if (handlers[uuid]) {
					requestId = window().requestAnimationFrame(handlers[uuid]);
				}
			};
			handlers[uuid] = handlerFunc;
			// node.js doesn't have requestAnimationFrame
			// we don't need to duplicate this if statement above, because it won't
			// ever be called if this one is prevented.
			if (window().requestAnimationFrame) {
				requestId = window().requestAnimationFrame(handlers[uuid]);
			}
		},
		enumerable: true,
	});
	Object.defineProperty(element, "stop", { value: removeHandlers, enumerable: true });
};

export default Animation;
