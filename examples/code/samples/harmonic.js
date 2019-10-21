setViewBox(-1, -1, 2, 2);

var poly = polyline().fillRule("evenodd").fill("#aaa");

animate = function (event) {
  var points = [];
  for (var i = 0; i < PI * 20; i += 1) {
    var amp = Math.cos(i / (2 + event.frame / 1000));
    points.push([amp * Math.cos(i), amp * Math.sin(i)]);
  }
  poly.setPoints(points);
};
