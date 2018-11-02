
let view = SVG.View(window.innerWidth, window.innerHeight);

let centerX = window.innerWidth * 0.5;
let centerY = window.innerHeight * 0.5;

function messyRect(x, y, width, height, mess = 10){
	let g = SVG.group();
	var x0 = x + Math.random()*mess - mess*0.5;
	var y0 = y + Math.random()*mess - mess*0.5;
	var x1 = x + width + Math.random()*mess - mess*0.5;
	var y1 = y + Math.random()*mess - mess*0.5;
	var x2 = x + width + Math.random()*mess - mess*0.5;
	var y2 = y + height+ Math.random()*mess - mess*0.5;
	var x3 = x + Math.random()*mess - mess*0.5;
	var y3 = y + height+ Math.random()*mess - mess*0.5;
	SVG.line(x0, y0, x1, y1, null, null, g);
	SVG.line(x1, y1, x2, y2, null, null, g);
	SVG.line(x2, y2, x3, y3, null, null, g);
	SVG.line(x3, y3, x0, y0, null, null, g);
	return g;
}

for(var i = 0; i < 30; i++){
	let w = 100+i*10;
	let h = 100+i*10;
	let rect = messyRect(centerX - w*0.5, centerY - h*0.5, w, h, 30);
	SVG.setAttribute(rect, "stroke", "black")
	view.svg.appendChild(rect);
}

document.getElementById("download-button").onclick = function(event){
	var filename = "file.svg";
	var pom = document.createElement('a');

	var serializer = new XMLSerializer();
	var source = serializer.serializeToString(view.svg);

	var bb = new Blob([source], {type: 'text/plain'});
	pom.setAttribute('href', window.URL.createObjectURL(bb));
	pom.setAttribute('download', filename);

	pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
	pom.draggable = true; 
	pom.classList.add('dragout');

	pom.click();
}

// 	//get svg element.
// 	var svg = view.svg;

// 	//get svg source.
// 	var serializer = new XMLSerializer();
// 	var source = serializer.serializeToString(svg);

// 	//add name spaces.
// 	if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
// 	    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
// 	}
// 	if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
// 	    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
// 	}

// 	//add xml declaration
// 	source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

// 	//convert svg source to URI data scheme.
// 	var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

// 	//set url value to a element's href attribute.
// 	document.getElementById("download-button").href = url;
// 	//you can download svg file by right click menu.
// 	// document.open(url);
// }