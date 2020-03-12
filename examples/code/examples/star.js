var frametime = 0;
var framerates = [];

svg.size(-3, -3, 6, 6);

svg.play = function (t) {
  var rate = t.time - frametime;
  framerates.push(rate);
  while(framerates.length > 60) {
    framerates.shift();
  }
  var avg = framerates
    .reduce(function(a, b) { return a+b; },0)
    / framerates.length;
  frametime = t.time;

  var starpoints = Array.from(Array(1000))
    .map(function() { return [Math.random()*0.02, Math.random()*0.02]; });
  
  svg.removeChildren();
  svg.background("black");
  svg.polyline(starpoints).stroke("white");
    
  // framerate
  var frameString = String((1/avg).toFixed(1));
  svg.text(frameString,-3,-3)
    .dominantBaseline("hanging")
    .fill("white")
    .fontSize(0.15)
    .fontWeight(900);
};