// create multiple canvases
let sketches = [
	SVG.View(window.innerWidth, window.innerHeight / 3, "canvas-1"),
	SVG.View(window.innerWidth, window.innerHeight / 3, "canvas-2"),
	SVG.View(window.innerWidth, window.innerHeight / 3, "canvas-3")
];
let colors = ["#fff", "#888", "#000"];

sketches.forEach((sketch, i) => {
	sketch.drawingLayer = SVG.group(undefined, "drawing");
	sketch.svg.appendChild(sketch.drawingLayer);

	sketch.onMouseEnter = function(mouse){
		sketch.brushPoly = SVG.polygon();
		sketch.brushPoly.setAttribute("style", "stroke:black;fill:" + colors[i]);
		sketch.drawingLayer.appendChild(sketch.brushPoly);
		sketch.points = [];
		sketch.prev = mouse;
	}

	sketch.onMouseMove = function(mouse){
		let vector = [mouse.x - sketch.prev.x, mouse.y - sketch.prev.y];
		var sideA = [mouse.x + -vector[1]*1, mouse.y + vector[0]*1];
		var sideB = [mouse.x + vector[1]*1, mouse.y + -vector[0]*1];

		sketch.points.unshift(sideA);
		sketch.points.push(sideB);
		SVG.setPoints(sketch.brushPoly, sketch.points);

		sketch.prev = mouse;
	}
})
