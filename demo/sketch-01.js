let view = SVG.View(window.innerWidth, window.innerHeight);
let drawingLayer = SVG.group(undefined, "drawing");
view.svg.appendChild(drawingLayer);

let prev, color = 0;

view.svg.onmousemove = function(event){
	let mouse = SVG.convertToViewBox(view.svg, event.clientX, event.clientY);
	if(prev == null){ prev = mouse; return; }
	let radius = 1 * Math.sqrt( Math.pow(mouse[0] - prev[0], 2) + 
	                            Math.pow(mouse[1] - prev[1], 2) );
	let circle = SVG.circle(mouse[0], mouse[1], radius);
	SVG.setAttribute(circle, "style", "fill:hsl(" + color + ", 100%, 50%)");
	drawingLayer.appendChild(circle);

	color += 3;
	prev = mouse;
}

view.svg.onmousedown = function(event){
	SVG.translate(view.svg, Math.random()*100-50, Math.random()*100-50);
}