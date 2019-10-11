setViewBox(-1, -1, 2, 2);
background("#222");

var poly = polyline().fillRule("evenodd").fill("#aaa");

function draw(ampfunc) {
  var points = [];
  for (var i = 0; i < 62; i += 1) {
    var freq = 1.0;
    var phase = 0.0;
    var amp = ampfunc(i);
    points.push([
      amp * Math.cos(i * freq + phase),
      amp * Math.sin(i * freq + phase)
    ]);
  }
  poly.setPoints(points);
}

svg.animate = function (event) {
  draw(function (i) {
    return Math.cos(i / (2 + event.frame / 1000));
  });
};
