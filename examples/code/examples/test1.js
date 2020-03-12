var frametime = 0;
var framerates = [];

var testMask = function () {
  // svg.size(0, 0, 10, 10);
  svg.size(0, 0, 1, 1);
  // svg.size(.2, .2, .6, .6);
  
  svg.play = function (t) {
    // console.log(t)
    var rate = t.time - frametime;
    framerates.push(rate);
    while(framerates.length > 50) {
      framerates.shift();
    }
    const avg = framerates
      .reduce(function(a, b) { return a+b; },0)
      / framerates.length;
    frametime = t.time;
    svg.removeChildren();
    svg.background("white");
  
    let points = Array.from(Array(1000))
      .map(() => [Math.random(), Math.random()]);
    svg.polygon(points).fill("black");//.fillRule("evenodd");

    var frameString = String((1/avg).toFixed(3));
    
    svg.text(frameString,0,0.05)
      .fill("white")
      .fontSize(0.05)
      .fontWeight(900)
      .fontFamily("Helvetica");
    svg.text(frameString,0,0.05)
      .fontSize(0.05)
      .fontWeight(100)
      .fontFamily("Helvetica");
  };
};

testMask();