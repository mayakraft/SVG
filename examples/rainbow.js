// example: draw rainbow circles with the mouse

// create the view, which creates an svg and adds it to the document
let view = SVG.View(window.innerWidth, window.innerHeight);
// we can draw directly onto the SVG, or into a group and be more organized
let drawingLayer = SVG.group();
view.svg.appendChild(drawingLayer);

let prev, color = 0;

view.onMouseMove = function(mouse){
	if(prev == null){
		prev = mouse;
		return;
	}
	let colorString = "hsl(" + (color%360) + ", 100%, 50%)";
	let radius = Math.sqrt( Math.pow(mouse.x - prev.x, 2) +
	                        Math.pow(mouse.y - prev.y, 2) );
	let circle = SVG.circle(mouse.x, mouse.y, parseFloat(radius.toFixed(2)));
	SVG.setAttribute(circle, "fill", colorString);
	drawingLayer.appendChild(circle);
	color += 3;
	prev = mouse;
}

view.onMouseLeave = function(mouse){
	prev = undefined;
}

document.getElementById("download-button").onclick = function(event){
	view.download();
}
