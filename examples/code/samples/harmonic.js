setViewBox(-1, -1, 2, 2);
background("#222");

var poly = polyline().fillRule("evenodd").fill("#aaa");

function draw(ampfunc) {
  var points = [];
  for (var i = 0; i < 100; i += 1) {
    var freq = 1.0;
    var phase = 0.0;
    var amp = ampfunc(i);
    points.push([amp*Math.cos(i*freq+phase), amp*Math.sin(i*freq+phase)]);
  }
  poly.setPoints(points);
}

if (app.timers == null) { app.timers = []; }
while (app.timers.length > 0) {
  var id = app.timers.shift();
  clearInterval(id);
}

var counter;
if (counter == null) { counter = 0; }
app.timers.push(setInterval(function(){
    draw((i) => Math.cos(i/(3+counter)));
    counter += 0.1;
}, 1000));

