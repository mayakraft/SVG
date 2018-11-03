// example: draw rainbow circles with the mouse

// create the view, which creates an svg and adds it to the document
let view = SVG.View(window.innerWidth, window.innerHeight);
// this is optional, add a layer (group) to the svg
let drawingLayer = SVG.group();
// add the layer to the svg
view.svg.appendChild(drawingLayer);

let prev, color = 0;

view.svg.onmousemove = function(event){
	// convert screen coordinates to the svg's viewbox coordinates
	let mouse = SVG.convertToViewBox(view.svg, event.clientX, event.clientY);
	if(prev == null){ prev = mouse; return; }
	let radius = 1 * Math.sqrt( Math.pow(mouse[0] - prev[0], 2) + 
	                            Math.pow(mouse[1] - prev[1], 2) );
	// create a circle
	let circle = SVG.circle(mouse[0], mouse[1], parseFloat(radius.toFixed(2)));
	// set some attributes
	SVG.setAttribute(circle, "fill", "hsl(" + (color%360) + ", 100%, 50%)");
	// SVG.setAttribute(circle, "style", "fill:hsl(" + color + ", 100%, 50%)");
	// similar to document.createElement, this puts the circle on the page
	drawingLayer.appendChild(circle);

	color += 3;
	prev = mouse;
}

view.svg.onmouseleave = function(event){
	prev = undefined;
}

document.getElementById("download-button").onclick = function(event){
	SVG.download(view.svg);
}
