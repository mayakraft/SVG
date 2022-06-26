(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.ear = factory());
}(this, (function () { 'use strict';

	const obj = { svg: () => {} };
	obj.prototype = Object.prototype;

	const rabbitEar = {
		origami: () => {},
		graph: () => {},
		cp: () => {},
		vector: obj,
		line: obj,
		ray: obj,
		segment: obj,
		circle: obj,
		ellipse: obj,
		rect: obj,
		polygon: obj,
		matrix: obj,
		plane: obj,
	};
	const use = function (library) {
		if (typeof library !== "function"
			|| library === null
			|| typeof library.core.attach !== "function") {
			return;
		}
		library.core.attach(this);
	};
	rabbitEar.use = use.bind(rabbitEar);
	return rabbitEar;
})));
