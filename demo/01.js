let view = SVG.View();

let drawingLayer = SVG.group(undefined, "drawing");
view.svg.appendChild(drawingLayer);
SVG.setViewBox(view.svg, 0, 0, window.innerWidth, window.innerHeight);

let color = 0;
let last = [0,0];

document.onmousemove = function(event){
	let radius = 1 * Math.sqrt( Math.pow(event.clientX - last[0], 2) + 
	                            Math.pow(event.clientY - last[1], 2) );
	let circle = SVG.circle(
		event.clientX,
		event.clientY,
		radius,
		null,
		null,
		drawingLayer
	);
	SVG.setAttribute(circle, "style", "fill:hsl(" + color + ", 100%, 50%)");
	color += 1;
	last = [event.clientX, event.clientY];
}
