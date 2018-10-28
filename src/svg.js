/** simple svg in javascript
 *
 * @param: the order in the geometry functions follow a general guideline
 *  - the necessary parameters for the geometry, number of params varies
 *  - className
 *  - id
 *  - the parent container to append this new element (or none)
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
	if (className != null) {
		shape.setAttributeNS(null, "class", className);
	}
	if (id != null) {
		shape.setAttributeNS(null, "id", id);
	}
	if (parent != null) {
		parent.appendChild(shape);
	}
	return shape;
}

function circle(x, y, radius, className, id, parent) {
	let shape = document.createElementNS(svgNS, "circle");
	shape.setAttributeNS(null, "cx", x);
	shape.setAttributeNS(null, "cy", y);
	shape.setAttributeNS(null, "r", radius);
	if (className != null) {
		shape.setAttributeNS(null, "class", className);
	}
	if (id != null) {
		shape.setAttributeNS(null, "id", id);
	}
	if (parent != null) {
		parent.appendChild(shape);
	}
	return shape;
}

function polygon(pointsArray, className, id, parent) {
	let shape = document.createElementNS(svgNS, "polygon");
	setPolygonPoints(shape, pointsArray);
	if (className != null) {
		shape.setAttributeNS(null, "class", className);
	}
	if (id != null) {
		shape.setAttributeNS(null, "id", id);
	}
	if (parent != null) {
		parent.appendChild(shape);
	}
	return shape;
}

function bezier(fromX, fromY, c1X, c1Y, c2X, c2Y,
		toX, toY, className, id, parent) {
	let d = "M " + fromX + "," + fromY + " C " + c1X + "," + c1Y +
			" " + c2X + "," + c2Y + " " + toX + "," + toY;
	let shape = document.createElementNS(svgNS, "path");
	shape.setAttributeNS(null, "d", d);
	if (className != null) {
		shape.setAttributeNS(null, "class", className);
	}
	if (id != null) {
		shape.setAttributeNS(null, "id", id);
	}
	if (parent != null) {
		parent.appendChild(shape);
	}
	return shape;
}

// function curve(fromX, fromY, midX, midY, toX, toY, className, id)

/**
 * container types
 */

function group(className, id, parent) {
	let g = document.createElementNS(svgNS, "g");
	if (className != null) {
		g.setAttributeNS(null, "class", className);
	}
	if (id != null) {
		g.setAttributeNS(null, "id", id);
	}
	if (parent != null) {
		parent.appendChild(g);
	}
	return g;
}

function svg(className, id, parent) {
	let svg = document.createElementNS(svgNS, "svg");
	// svg.setAttributeNS(null, "viewBox", "0 0 1 1");
	if (className != null) {
		svg.setAttributeNS(null, "class", className);
	}
	if (id != null) {
		svg.setAttributeNS(null, "id", id);
	}
	if (parent != null) {
		parent.appendChild(svg);
	}
	return svg;
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
	let zoom = 1.0;
	let d = (width / zoom) - width;
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

function zoom(svg, scale, origin_x, origin_y){
	// zoom view
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

export default { line, circle, polygon, bezier, group, svg,
	addClass, removeClass, setId, removeChildren, setAttribute,
	setViewBox, getViewBox, convertToViewBox, translate, zoom, setPolygonPoints
}
