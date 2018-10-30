
import SVG from "./svg";
import View from "./view"

export default function Interactive(){

	let {setPadding,
		 zoom,
		 translate,
		 setViewBox} = View(...arguments);

	// implement these, they will get called when the event fires
	this.event = {
		animate: function(){},
		onResize: function(){},
		onMouseMove: function(){},
		onMouseDown: function(){},
		onMouseUp: function(){},
		onMouseDidBeginDrag: function(){},
	}

	// interaction
	let mouse = {
		isPressed: false,// is the mouse button pressed (y/n)
		position: [0,0], // the current position of the mouse
		pressed: [0,0],  // the last location the mouse was pressed
		drag: [0,0]      // vector, displacement from start to now
	};

	var that = this;
	svg.onmousedown = function(event){
		mouse.isPressed = true;
		mouse.pressed = SVG.convertToViewBox(svg, event.clientX, event.clientY);
		that.event.onMouseDown(mouse);
	};
	svg.onmouseup = function(event){
		mouse.isPressed = false;
		that.event.onMouseUp(mouse);
	};
	svg.onmousemove = function(event){
		mouse.position = SVG.convertToViewBox(svg, event.clientX, event.clientY);
		if(mouse.isPressed){
			mouse.drag = [mouse.position[0] - mouse.pressed[0], 
			              mouse.position[1] - mouse.pressed[1]];
			that.event.onMouseDidBeginDrag(mouse);
		}
		that.event.onMouseMove(mouse);
	};
	svg.onResize = function(event){
		that.event.onResize(event);
	};

	// javascript get Date()
	// todo: watch for the variable getting set
	animateTimer = setInterval(function(){
		if(typeof that.event.animate === "function"){
			that.event.animate({"time":svg.getCurrentTime(), "frame":frameNum});
		}
		frameNum += 1;
	}, 1000/60);

	// return Object.freeze({
	return {
		zoom,
		translate,
		setViewBox,
		event:this.event,
		mouse,
	};

}
