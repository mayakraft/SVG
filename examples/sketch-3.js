let views = [
	SVG.View("canvas-1"),
	SVG.View("canvas-2"),
	SVG.View("canvas-3")
];

let colors = ["#F80", "#9CF", "#5C3"];
var headers = ["coordinates-1", "coordinates-2", "coordinates-3"];

document.onmousemove = function(event){
	let pageCoords = `page x, y: (${event.pageX}, ${event.pageY})`;
	var bodyRect = document.body.getBoundingClientRect();
	views.forEach((view, i) => {
		var viewRect = view.svg.getBoundingClientRect();
		var offset = [viewRect.left - bodyRect.left, viewRect.top - bodyRect.top];
		let viewCoords = "client x, y: " + (event.pageX - offset[0]) + ", " + (event.pageY - offset[1]);
		document.getElementById(headers[i]).innerHTML = pageCoords + "<br>" + viewCoords;
	});
}
document.onmousemove({pageX:0, pageY:0}); // fill data on boot

views.forEach((view, i) => {
	view.drawingLayer = SVG.group(undefined, "drawing");
	view.svg.appendChild(view.drawingLayer);

	view.svg.onmouseenter = function(event){
		view.brushPoly = SVG.polygon();
		SVG.setAttribute(view.brushPoly, "style", "stroke:black;fill:" + colors[i]);
		view.drawingLayer.appendChild(view.brushPoly);
		view.points = [];
		view.prev = SVG.convertToViewBox(view.svg, event.clientX, event.clientY);
	}

	view.svg.onmousemove = function(event){
		let mouse = SVG.convertToViewBox(view.svg, event.clientX, event.clientY);
		let vector = [mouse[0] - view.prev[0], mouse[1] - view.prev[1]];
		var sideA = [mouse[0] + -vector[1]*1, mouse[1] + vector[0]*1];
		var sideB = [mouse[0] + vector[1]*1, mouse[1] + -vector[0]*1];

		view.points.unshift(sideA);
		view.points.push(sideB);
		SVG.setPolygonPoints(view.brushPoly, view.points);

		view.prev = mouse;
	}
});
