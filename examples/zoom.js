let view = SVG.View(window.innerWidth, window.innerHeight);
let drawLayer = SVG.group();
SVG.setAttribute(drawLayer, "stroke", "black");
view.svg.appendChild(drawLayer);

let mousedown, screenMousedown, startViewbox, prev;
let zoom = 1.0;

function grid(parent, level, x, y, width, height){
	if(level <= 0){ return; }
	let hw = width * 0.5;
	let hh = height * 0.5;
	let lines = [SVG.line(x, y+hh, x+width, y+hh), SVG.line(x+hw, y, x+hw, y+height)];
	lines.forEach(line => SVG.setAttribute(line, "stroke-width", level*2));
	lines.forEach(line => parent.appendChild(line));
	grid(parent, level-1, x+hw, y, hw, hh);
	grid(parent, level-1, x, y, hw, hh);
	grid(parent, level-1, x, y+hh, hw, hh);
	grid(parent, level-1, x+hw, y+hh, hw, hh);
}
grid(drawLayer, 4, 0, 0, window.innerWidth, window.innerHeight);

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
			SVG.scale(view.svg, zoom, mousedown[0], mousedown[1]);
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
