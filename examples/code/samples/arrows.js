size(100, 100);
background("#edb");

var points = controls(4).position(function() {
  return [random(getWidth()), random(getHeight())];
});

var a1 = arrow(points[0], points[1])
  .stroke("#158")
  .fill("#158")
  .strokeWidth(2)
  .head({width: 3, height: 6})
  .strokeDasharray("2 1");

var a2 = arrow(points[1], points[2])
  .stroke("black")
  .strokeWidth(0.3)
  .head({width: 1, height: 4})
  .tail({width: 1, height: 4});

var a3 = arrow(points[2], points[3])
  .stroke("#e53")
  .fill("#e53")
  .curve(0.4)
  .head({width: 2, height: 6});

svg.mouseMoved = function (mouse) {
  if (mouse.isPressed) {
    a1.setPoints(points[0], points[1]);
    a2.setPoints(points[1], points[2]);
    a3.setPoints(points[2], points[3]);
  }
};
