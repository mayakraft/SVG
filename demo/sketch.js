let view = SVG.View();

let drawingLayer = SVG.group(undefined, "drawing");
view.svg.appendChild(drawingLayer);
SVG.setViewBox(view.svg, 0, 0, window.innerWidth, window.innerHeight);

let mousepoints = [];
let poly;

let color = 0;
let last = [0, 0];

document.onmousemove = function(event){
	let mouse = [event.clientX, event.clientY];
	let vector = [mouse[0] - last[0], mouse[1] - last[1]];

	let circle = SVG.circle(event.clientX, event.clientY, 10, null, null, drawingLayer);
	let line = SVG.line(
		mouse[0] + (Math.random()*100)-50, mouse[1] + (Math.random()*100)-50,
		mouse[0] + (Math.random()*100)-50, mouse[1] + (Math.random()*100)-50,
		null, null, drawingLayer
	);

	if(poly == null && mousepoints.length > 3){
		poly = SVG.polygon(mousepoints, null, null, drawingLayer);
		SVG.setAttribute(poly, "style", "stroke:black;fill:none;");
	}

	if(poly != null){
		let pointsString = mousepoints
			.reduce((p, c) => p + c[0] + "," + c[1] + " ", "");
		poly.setAttributeNS(null, "points", pointsString);
		drawingLayer.removeChild(poly);
		drawingLayer.appendChild(poly);
	}
	SVG.setAttribute(circle, "style", "fill:hsl(" + color + ", 100%, 50%)");
	SVG.setAttribute(line, "style", "stroke:hsl(" + (color+40) + ", 100%, 50%)");

	mousepoints.push(mouse);
	last = mouse;
	color += 1;
}
