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

import vkbeautify from "../lib/vkbeautify";

const svgNS = "http://www.w3.org/2000/svg";

const setClassIdParent = function(element, className, id, parent) {
	if (className != null) {
		element.setAttributeNS(null, "class", className);
	}
	if (id != null) {
		element.setAttributeNS(null, "id", id);
	}
	if (parent != null) {
		parent.appendChild(element);
	}
};

/**
 * geometry modifiers
 */

export const setPoints = function(polygon, pointsArray) {
	if (pointsArray == null || pointsArray.constructor !== Array) {
		return;
	}
	let pointsString = pointsArray.map((el) =>
		(el.constructor === Array ? el : [el.x, el.y])
	).reduce((prev, curr) => prev + curr[0] + "," + curr[1] + " ", "");
	polygon.setAttributeNS(null, "points", pointsString);
};

export const setArc = function(shape, x, y, radius, startAngle, endAngle,
		includeCenter = false) {
	let start = [
		x + Math.cos(startAngle) * radius,
		y + Math.sin(startAngle) * radius ];
	let vecStart = [
		Math.cos(startAngle) * radius,
		Math.sin(startAngle) * radius ];
	let vecEnd = [
		Math.cos(endAngle) * radius,
		Math.sin(endAngle) * radius ];
	let arcVec = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
	let py = vecStart[0]*vecEnd[1] - vecStart[1]*vecEnd[0];
	let px = vecStart[0]*vecEnd[0] + vecStart[1]*vecEnd[1];
	let arcdir = (Math.atan2(py, px) > 0 ? 0 : 1);
	let d = (includeCenter
		? "M " + x + "," + y + " l " + vecStart[0] + "," + vecStart[1] + " "
		: "M " + start[0] + "," + start[1] + " ");
	d += ["a ", radius, radius, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
	if (includeCenter) { d += " Z"; }
	shape.setAttributeNS(null, "d", d);
};

/**
 * geometry primitives
 */

export const line = function(x1, y1, x2, y2, className, id, parent) {
	let shape = document.createElementNS(svgNS, "line");
	shape.setAttributeNS(null, "x1", x1);
	shape.setAttributeNS(null, "y1", y1);
	shape.setAttributeNS(null, "x2", x2);
	shape.setAttributeNS(null, "y2", y2);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

export const circle = function(x, y, radius, className, id, parent) {
	let shape = document.createElementNS(svgNS, "circle");
	shape.setAttributeNS(null, "cx", x);
	shape.setAttributeNS(null, "cy", y);
	shape.setAttributeNS(null, "r", radius);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

export const rect = function(x, y, width, height, className, id, parent) {
	let shape = document.createElementNS(svgNS, "rect");
	shape.setAttributeNS(null, "x", x);
	shape.setAttributeNS(null, "y", y);
	shape.setAttributeNS(null, "width", width);
	shape.setAttributeNS(null, "height", height);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

export const polygon = function(pointsArray, className, id, parent) {
	let shape = document.createElementNS(svgNS, "polygon");
	setPoints(shape, pointsArray);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

export const polyline = function(pointsArray, className, id, parent) {
	let shape = document.createElementNS(svgNS, "polyline");
	setPoints(shape, pointsArray);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

export const bezier = function(fromX, fromY, c1X, c1Y, c2X, c2Y,
		toX, toY, className, id, parent) {
	let d = "M " + fromX + "," + fromY + " C " + c1X + "," + c1Y +
			" " + c2X + "," + c2Y + " " + toX + "," + toY;
	let shape = document.createElementNS(svgNS, "path");
	shape.setAttributeNS(null, "d", d);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

export const text = function(textString, x, y, className, id, parent) {
	let shape = document.createElementNS(svgNS, "text");
	shape.innerHTML = textString;
	shape.setAttributeNS(null, "x", x);
	shape.setAttributeNS(null, "y", y);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

export const wedge = function(x, y, radius, angleA, angleB, className, id, parent) {
	let shape = document.createElementNS(svgNS, "path");
	setArc(shape, x, y, radius, angleA, angleB, true);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

export const arc = function(x, y, radius, angleA, angleB, className, id, parent) {
	let shape = document.createElementNS(svgNS, "path");
	setArc(shape, x, y, radius, angleA, angleB, false);
	setClassIdParent(shape, className, id, parent);
	return shape;
};

// export const curve = function(fromX, fromY, midX, midY, toX, toY, className, id)

/**
 * compound shapes
 */

export const regularPolygon = function(cX, cY, radius, sides, className, id, parent) {
	let halfwedge = 2*Math.PI/sides * 0.5;
	let r = Math.cos(halfwedge) * radius;
	let points = Array.from(new Array(sides)).map((el,i) => {
		let a = -2 * Math.PI * i / sides + halfwedge;
		let x = cX + r * Math.sin(a);
		let y = cY + r * Math.cos(a);
		return [x, y];
	});
	return polygon(points, className, id, parent);
};

/**
 * container types
 */

export const group = function(className, id, parent) {
	let g = document.createElementNS(svgNS, "g");
	setClassIdParent(g, className, id, parent);
	return g;
};

export const svg = function(className, id, parent) {
	let svgImage = document.createElementNS(svgNS, "svg");
	// svgImage.setAttributeNS(null, "viewBox", "0 0 1 1");
	setClassIdParent(svgImage, className, id, parent);
	return svgImage;
};

/**
 * element modifiers
 */

export const addClass = function(xmlNode, newClass) {
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
};

export const removeClass = function(xmlNode, newClass) {
	if (xmlNode == undefined) {
		return;
	}
	let currentClass = xmlNode.getAttribute("class");
	if (currentClass == undefined) {
		currentClass = "";
	}
	let classes = currentClass.split(" ").filter((c) => c !== newClass);
	xmlNode.setAttributeNS(null, "class", classes.join(" "));
};

export const setId = function(xmlNode, newID) {
	if (xmlNode == undefined) {
		return;
	}
	xmlNode.setAttributeNS(null, "id", newID);
};

export const removeChildren = function(group) {
	while (group.lastChild) {
		group.removeChild(group.lastChild);
	}
};

/**
 * math, view
 */

export const setViewBox = function(svg, x, y, width, height, padding = 0) {
// let d = (bounds.size.width / _zoom) - bounds.size.width;
	let scale = 1.0;
	let d = (width / scale) - width;
	let X = (x - d) - padding;
	let Y = (y - d) - padding;
	let W = (width + d * 2) + padding * 2;
	let H = (height + d * 2) + padding * 2;
	let viewBoxString = [X, Y, W, H].join(" ");
	svg.setAttributeNS(null, "viewBox", viewBoxString);
};

export const setDefaultViewBox = function(svg) {
	let size = svg.getBoundingClientRect();
	let width = (size.width == 0 ? 640 : size.width);
	let height = (size.height == 0 ? 480 : size.height);
	setViewBox(svg, 0, 0, width, height);
};

/** @returns {number} array of 4 numbers: x, y, width, height */
export const getViewBox = function(svg) {
	let vb = svg.getAttribute("viewBox");
	return (vb == null
		? undefined
		: vb.split(" ").map((n) => parseFloat(n)));
};

export const scale = function(svg, scale, origin_x = 0, origin_y = 0) {
	if (scale < 1e-8) { scale = 0.01; }
	let matrix = svg.createSVGMatrix()
		.translate(origin_x, origin_y)
		.scale(1/scale)
		.translate(-origin_x, -origin_y);
	let viewBox = getViewBox(svg);
	if (viewBox == null) {
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
};

export const translate = function(svg, dx, dy) {
	let viewBox = getViewBox(svg);
	if (viewBox == null) {
		setDefaultViewBox(svg);
	}
	viewBox[0] += dx;
	viewBox[1] += dy;
	svg.setAttributeNS(null, "viewBox", viewBox.join(" "));
};

export const convertToViewBox = function(svg, x, y) {
	let pt = svg.createSVGPoint();
	pt.x = x;
	pt.y = y;
	let svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
	let array = [svgPoint.x, svgPoint.y];
	array.x = svgPoint.x;
	array.y = svgPoint.y;
	return array;
};

/**
 * import, export
 */

export const save = function(svg, filename = "image.svg") {
	let a = document.createElement("a");
	let source = (new window.XMLSerializer()).serializeToString(svg);
	let formatted = vkbeautify.xml(source);
	let blob = new window.Blob([formatted], {type: "text/plain"});
	a.setAttribute("href", window.URL.createObjectURL(blob));
	a.setAttribute("download", filename);
	a.click();
};

const parseCSSText = function(styleContent) {
	let styleElement = document.createElement("style");
	styleElement.textContent = styleContent;
	document.body.appendChild(styleElement);
	let rules = styleElement.sheet.cssRules;
	document.body.removeChild(styleElement);
	return rules;
};

/** parser error to check against */
const pErr = (new window.DOMParser())
	.parseFromString("INVALID", "text/xml")
	.getElementsByTagName("parsererror")[0]
	.namespaceURI;

// the SVG is returned, or given as the argument in the callback(svg, error)
export const load = function(input, callback) {
	// try cascading attempts at different possible param types
	// "input" is either a (1) raw text encoding of the svg
	//   (2) filename (3) already parsed DOM element
	if (typeof input === "string" || input instanceof String) {
		// (1) raw text encoding
		let xml = (new window.DOMParser()).parseFromString(input, "text/xml");
		if (xml.getElementsByTagNameNS(pErr, "parsererror").length === 0) {
			let parsedSVG = xml.documentElement;
			if (callback != null) {
				callback(parsedSVG);
			}
			return parsedSVG;
		}
		// (2) filename
		fetch(input)
			.then((response) => response.text())
			.then((str) => (new window.DOMParser())
				.parseFromString(str, "text/xml")
			).then((svgData) => {
				let allSVGs = svgData.getElementsByTagName("svg");
				if (allSVGs == null || allSVGs.length === 0) {
					throw "error, valid XML found, but no SVG element";
				}
				if (callback != null) {
					callback(allSVGs[0]);
				}
				return allSVGs[0];
			// }).catch((err) => callback(null, err));
			});
	} else if (input instanceof Document) {
		// (3) already parsed SVG... why would this happen? IDK. just return it
		callback(input);
		return input;
	}
};
