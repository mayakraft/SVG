/**
 * SVG in Javascript (c) Robby Kraft
 */

import * as DOM from "../DOM";
import * as ViewBox from "../viewBox";

export const attachClassMethods = function(element) {
	element.removeChildren = function() {
		return DOM.removeChildren(element);
	}
	element.addClass = function() {
		return DOM.addClass(element, ...arguments);
	}
	element.removeClass = function() {
		return DOM.removeClass(element, ...arguments);
	}
	element.setClass = function() {
		return DOM.setClass(element, ...arguments);
	}
	element.setID = function() {
		return DOM.setID(element, ...arguments);
	}
};

export const attachViewBoxMethods = function(element) {
	element.setViewBox = function() {
		return ViewBox.setViewBox(element, ...arguments);
	}
	element.getViewBox = function() {
		return ViewBox.getViewBox(element, ...arguments);
	}
	element.scaleViewBox = function() {
		return ViewBox.scaleViewBox(element, ...arguments);
	}
	element.translateViewBox = function() {
		return ViewBox.translateViewBox(element, ...arguments);
	}
	element.convertToViewBox = function() {
		return ViewBox.convertToViewBox(element, ...arguments);
	}
};

export const attachAppendableMethods = function(element, methods) {
	Object.keys(methods).forEach(key => {
		element[key] = function() {
			let g = methods[key](...arguments);
			element.appendChild(g);
			return g;
		}
	});
};