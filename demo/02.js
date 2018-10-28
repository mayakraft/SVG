let view = SVG.View();

let drawingLayer = SVG.group(undefined, "drawing");
view.svg.appendChild(drawingLayer);
SVG.setViewBox(view.svg, 0, 0, window.innerWidth, window.innerHeight);

let poly = SVG.polygon([[0,0]], null, null, drawingLayer);
SVG.setAttribute(poly, "style", "stroke:black; fill:rgba(0,0,0,0.1);");

let mousepoints = [];
let polypoints = [];

let color = 0;
let last = [0, 0];

document.onmousemove = function(event){
	let mouse = [event.clientX, event.clientY];
	let vector = [mouse[0] - last[0], mouse[1] - last[1]];
	var sideA = [mouse[0] + -vector[1] * 4, mouse[1] + vector[0] * 4];
	var sideB = [mouse[0] + vector[1] * 4, mouse[1] + -vector[0] * 4];

	polypoints.unshift(sideA);
	polypoints.push(sideB);

	let pointsString = polypoints
		.reduce((p, c) => p + c[0] + "," + c[1] + " ", "");
	poly.setAttributeNS(null, "points", pointsString);
	drawingLayer.removeChild(poly);
	drawingLayer.appendChild(poly);

	last = mouse;
	color += 1;
}
