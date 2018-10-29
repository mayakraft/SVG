let view = SVG.View(window.innerWidth, window.innerHeight);

let mousedown;
let screenMousedown;
let startViewbox;
let zoom = 1.0;
let prev;

// some grids
var i = 0;
for(var w = 0; w < window.innerWidth; w += (Math.sin((i++)*0.5)+1.2)*10){
	SVG.line(w, 0, w, window.innerHeight, "grid", null, view.svg);
}
SVG.line(window.innerWidth, 0, window.innerWidth, window.innerHeight, "grid", null, view.svg);
for(var h = 0; h < window.innerHeight; h += (Math.sin((i++)*0.5)+1.2)*10){
	SVG.line(0, h, window.innerWidth, h, "grid", null, view.svg);
}
SVG.line(0, window.innerHeight, window.innerWidth, window.innerHeight, "grid", null, view.svg);


view.svg.onmousedown = function(event){
	startViewbox = SVG.getViewBox(view.svg);
	screenMousedown = [event.clientX, event.clientY];
	prev = SVG.convertToViewBox(view.svg, event.clientX, event.clientY);
	mousedown = prev;
}

view.svg.onmousemove = function(event){
	let mouse = SVG.convertToViewBox(view.svg, event.clientX, event.clientY);
	if(event.buttons > 0){ // mouse pressed
		if(event.shiftKey == true){
			let y_change = mouse[1] - prev[1];
			let zoom = Math.pow(1.01, y_change);
			console.log(y_change, zoom);
			SVG.zoom(view.svg, zoom, mousedown[0], mousedown[1]);
		} else{
			let screenMouse = [event.clientX, event.clientY];
			let screenTravel = [screenMouse[0] - screenMousedown[0], screenMouse[1] - screenMousedown[1]];
			SVG.setViewBox(view.svg, 
				startViewbox[0] - screenTravel[0],
				startViewbox[1] - screenTravel[1],
				startViewbox[2],
				startViewbox[3]
			);
		}
	}
	prev = mouse;
}

document.onscroll = function(event){
	console.log(event);
}