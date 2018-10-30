/* SVG (c) Robby Kraft, MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SVG = {})));
}(this, (function (exports) {
	/** simple svg in javascript
	 *
	 * @param: the order in the geometry functions follow a general guideline
	 *  - the necessary parameters for the geometry, number of params varies
	 *  - className
	 *  - id
	 *  - the parent container to append this new element
	 *
	 * you can set all these later. some are more important than others.
	 * if you don't use the parent parameter, you'll want to append 
	 * this object to an SVG or group using .appendChild 
	 *
	 * @returns: the new geometry XML object.
	 */

	const svgNS = "http://www.w3.org/2000/svg";

	/**
	 * geometry primitives
	 */

	function line(x1, y1, x2, y2, className, id, parent) {
		let shape = document.createElementNS(svgNS, "line");
		shape.setAttributeNS(null, "x1", x1);
		shape.setAttributeNS(null, "y1", y1);
		shape.setAttributeNS(null, "x2", x2);
		shape.setAttributeNS(null, "y2", y2);
		setClassIdParent(shape, className, id, parent);
		return shape;
	}

	function circle(x, y, radius, className, id, parent) {
		let shape = document.createElementNS(svgNS, "circle");
		shape.setAttributeNS(null, "cx", x);
		shape.setAttributeNS(null, "cy", y);
		shape.setAttributeNS(null, "r", radius);
		setClassIdParent(shape, className, id, parent);
		return shape;
	}

	function polygon(pointsArray, className, id, parent) {
		let shape = document.createElementNS(svgNS, "polygon");
		setPolygonPoints(shape, pointsArray);
		setClassIdParent(shape, className, id, parent);
		return shape;
	}

	function bezier(fromX, fromY, c1X, c1Y, c2X, c2Y,
			toX, toY, className, id, parent) {
		let d = "M " + fromX + "," + fromY + " C " + c1X + "," + c1Y +
				" " + c2X + "," + c2Y + " " + toX + "," + toY;
		let shape = document.createElementNS(svgNS, "path");
		shape.setAttributeNS(null, "d", d);
		setClassIdParent(shape, className, id, parent);
		return shape;
	}

	// function curve(fromX, fromY, midX, midY, toX, toY, className, id)

	/**
	 * container types
	 */

	function group(className, id, parent) {
		let g = document.createElementNS(svgNS, "g");
		setClassIdParent(g, className, id, parent);
		return g;
	}

	function svg(className, id, parent) {
		let svg = document.createElementNS(svgNS, "svg");
		// svg.setAttributeNS(null, "viewBox", "0 0 1 1");
		setClassIdParent(svg, className, id, parent);
		return svg;
	}

	function setClassIdParent(element, className, id, parent) {
		if (className != null) {
			element.setAttributeNS(null, "class", className);
		}
		if (id != null) {
			element.setAttributeNS(null, "id", id);
		}
		if (parent != null) {
			parent.appendChild(element);
		}
	}

	/**
	 * geometry modifiers
	 */

	function setPolygonPoints(polygon, pointsArray){
		if (pointsArray == null || pointsArray.constructor !== Array) {
			return;
		}
		let pointsString = pointsArray.map((el) => (
			el.constructor === Array ? el : [el.x, el.y]
		)).reduce((prev, curr) => prev + curr[0] + "," + curr[1] + " ", "");
		polygon.setAttributeNS(null, "points", pointsString);
	}

	/**
	 * element modifiers
	 */

	function addClass(xmlNode, newClass) {
		if (xmlNode == undefined) {
			return;
		}
		let currentClass = xmlNode.getAttribute("class");
		if (currentClass == undefined) {
			currentClass = "";
		}
		let classes = currentClass.split(" ").filter((c) => c !== newClass);
		classes.push(newClass);
		xmlNode.setAttributeNS(null, "class", classes.join(" "));
	}

	function removeClass(xmlNode, newClass) {
		if (xmlNode == undefined) {
			return;
		}
		let currentClass = xmlNode.getAttribute("class");
		if (currentClass == undefined) {
			currentClass = "";
		}
		let classes = currentClass.split(" ").filter((c) => c !== newClass);
		xmlNode.setAttributeNS(null, "class", classes.join(" "));
	}

	function setId(xmlNode, newID) {
		if (xmlNode == undefined) {
			return;
		}
		xmlNode.setAttributeNS(null, "id", newID);
	}

	function setAttribute(xmlNode, attribute, value) {
		if (xmlNode == undefined) {
			return;
		}
		xmlNode.setAttributeNS(null, attribute, value);
	}

	function removeChildren(group) {
		while (group.lastChild) {
			group.removeChild(group.lastChild);
		}
	}

	/**
	 * math, view
	 */

	function setViewBox(svg, x, y, width, height, padding = 0) {
		let scale = 1.0;
		let d = (width / scale) - width;
		let X = (x - d) - padding;
		let Y = (y - d) - padding;
		let W = (width + d * 2) + padding * 2;
		let H = (height + d * 2) + padding * 2;
		let viewBoxString = [X, Y, W, H].join(" ");
		svg.setAttributeNS(null, "viewBox", viewBoxString);
	}

	function setDefaultViewBox(svg){
		let rect = svg.getBoundingClientRect();
		let width = rect.width == 0 ? 640 : rect.width;
		let height = rect.height == 0 ? 480 : rect.height;
		setViewBox(svg, 0, 0, width, height);
	}

	function getViewBox(svg){
		let vb = svg.getAttribute("viewBox");
		return vb == null
			? undefined
			: vb.split(" ").map(n => parseFloat(n));
	}

	function scale(svg, scale, origin_x = 0, origin_y = 0){
		if(scale < 1e-8){ scale = 0.01; }
		let matrix = svg.createSVGMatrix()
			.translate(origin_x, origin_y)
			.scale(1/scale)
			.translate(-origin_x, -origin_y);
		let viewBox = getViewBox(svg);
		if (viewBox == null){
			setDefaultViewBox(svg);
		}
		let top_left = svg.createSVGPoint();
		let bot_right = svg.createSVGPoint();
		top_left.x = viewBox[0];
		top_left.y = viewBox[1];
		bot_right.x = viewBox[0] + viewBox[2];
		bot_right.y = viewBox[1] + viewBox[3];
		let new_top_left = top_left.matrixTransform(matrix);
		let new_bot_right = bot_right.matrixTransform(matrix);
		setViewBox(svg, 
			new_top_left.x,
			new_top_left.y,
			new_bot_right.x - new_top_left.x,
			new_bot_right.y - new_top_left.y
		);
	}

	function translate(svg, dx, dy){
		let viewBox = getViewBox(svg);
		if (viewBox == null){
			setDefaultViewBox(svg);
		}
		viewBox[0] += dx;
		viewBox[1] += dy;
		svg.setAttributeNS(null, "viewBox", viewBox.join(" "));
	}

	function convertToViewBox(svg, x, y) {
		let pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		let svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
		var array = [svgPoint.x, svgPoint.y];
		array.x = svgPoint.x;
		array.y = svgPoint.y;
		return array;
	}

	var SVG = { line, circle, polygon, bezier, group, svg,
		addClass, removeClass, setId, removeChildren, setAttribute,
		setViewBox, getViewBox, convertToViewBox, translate, scale, setPolygonPoints
	};

	/** svg file viewer
	 * converts .fold file into SVG, binds it to the DOM
	 * @param: (constructor) a DOM object or "string" DOM id
	 *  and this will bind the SVG to it.
	 */

	function View(){
		// get constructor parameters
		let params = Array.from(arguments);

		// create a new SVG
		let _svg = SVG.svg();

		let _parent = undefined;  // parent xml node

		// view properties
		let _scale = 1.0;
		let _padding = 0;

		let _matrix = _svg.createSVGMatrix();

		const zoom = function(scale, origin_x = 0, origin_y = 0){
			_scale = scale;
			SVG.scale(_svg, scale, origin_x, origin_y);
		};

		const translate = function(dx, dy){
			SVG.translate(_svg, dx, dy);
		};

		const setViewBox = function(x, y, width, height){
			SVG.setViewBox(_svg, x, y, width, height, _padding);
		};

		// load an SVG. XML tree, file blob, or filename string
		const load = function(data, callback){
			// are they giving us a filename, or the data of an already loaded file?
			if (typeof data === "string" || data instanceof String){
				fetch(data)
					.then(response => response.text())
					.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
					.then(svgData => {
						_parent.removeChild(_svg);
						var cssStyle, styleTag = svgData.getElementsByTagName('style')[0];
						if(styleTag != undefined && styleTag.childNodes != undefined && styleTag.childNodes.length > 0){
							cssStyle = parseCSSText( styleTag.childNodes[0].nodeValue );
						}
						var allSVGs = svgData.getElementsByTagName('svg');
						if(allSVGs == undefined || allSVGs.length == 0){ throw "error, the svg parser couldn't find an SVG element"; }
						_svg = allSVGs[0];
						_parent.appendChild(_svg);

						if(callback != undefined){ callback(cp); }

					});
			}
			if(data instanceof HTMLElement){
				console.log("data instanceof HTMLElement");
				rootElement = (new window.DOMParser()).parseFromString(string, "text/xml");
			}
		};
		// onload, find a parent element for the new SVG in the arguments
		document.addEventListener("DOMContentLoaded", function(){
			// wait until after the <body> has rendered
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
			if(numbers.length >= 2){
				_svg.setAttributeNS(null, "width", numbers[0]);
				_svg.setAttributeNS(null, "height", numbers[1]);
				SVG.setViewBox(_svg, 0, 0, numbers[0], numbers[1]);
			} else{
				let rect = _svg.getBoundingClientRect();
				SVG.setViewBox(_svg, 0, 0, rect.width, rect.height);
			}
		});

		// return Object.freeze({
		return {
			zoom,
			translate,
			setViewBox,
			load,
			get scale() { return _scale; },
			get svg() { return _svg; },
		};
		// });
	}

	// import interactive from "./src/interactive";

	let line$1 = SVG.line;
	let circle$1 = SVG.circle;
	let polygon$1 = SVG.polygon;
	let bezier$1 = SVG.bezier;
	let group$1 = SVG.group;
	let svg$1 = SVG.svg;
	let addClass$1 = SVG.addClass;
	let removeClass$1 = SVG.removeClass;
	let setId$1 = SVG.setId;
	let removeChildren$1 = SVG.removeChildren;
	let setAttribute$1 = SVG.setAttribute;
	let setViewBox$1 = SVG.setViewBox;
	let convertToViewBox$1 = SVG.convertToViewBox;
	let translate$1 = SVG.translate;
	let scale$1 = SVG.scale;
	let setPolygonPoints$1 = SVG.setPolygonPoints;
	let getViewBox$1 = SVG.getViewBox;

	exports.line = line$1;
	exports.circle = circle$1;
	exports.polygon = polygon$1;
	exports.bezier = bezier$1;
	exports.group = group$1;
	exports.svg = svg$1;
	exports.addClass = addClass$1;
	exports.removeClass = removeClass$1;
	exports.setId = setId$1;
	exports.removeChildren = removeChildren$1;
	exports.setAttribute = setAttribute$1;
	exports.setViewBox = setViewBox$1;
	exports.getViewBox = getViewBox$1;
	exports.convertToViewBox = convertToViewBox$1;
	exports.translate = translate$1;
	exports.setPolygonPoints = setPolygonPoints$1;
	exports.scale = scale$1;
	exports.View = View;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
