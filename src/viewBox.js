export const setViewBox = function(svg, x, y, width, height, padding = 0) {
	let scale = 1.0;
	let d = (width / scale) - width;
	let X = (x - d) - padding;
	let Y = (y - d) - padding;
	let W = (width + d * 2) + padding * 2;
	let H = (height + d * 2) + padding * 2;
	let viewBoxString = [X, Y, W, H].join(" ");
	svg.setAttributeNS(null, "viewBox", viewBoxString);
};

export const getViewBox = function(svg) {
	let vb = svg.getAttribute("viewBox");
	return (vb == null
		? undefined
		: vb.split(" ").map((n) => parseFloat(n)));
};

export const scaleViewBox = function(svg, scale, origin_x = 0, origin_y = 0) {
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

export const translateViewBox = function(svg, dx, dy) {
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

const setDefaultViewBox = function(svg) {
	let size = svg.getBoundingClientRect();
	let width = (size.width == 0 ? 640 : size.width);
	let height = (size.height == 0 ? 480 : size.height);
	setViewBox(svg, 0, 0, width, height);
};
