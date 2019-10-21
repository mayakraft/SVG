size(800, 800);
background("#edb");

var points = svg.controls(4)
  .svg(function() { return SVG.circle(0, 0, getWidth() * 0.05).fill("#e53"); })
  .position(function() { return [random(getWidth()), random(getHeight())]; });

var l1 = line(points[0], points[1]).stroke("black");
var l2 = line(points[3], points[2]).stroke("black");
var curve = path().moveTo(points[0]).curveTo(points[1], points[2], points[3]);

svg.mouseMoved = function (mouse) {
  if (mouse.isPressed) {
    l1.setPoints(points[0], points[1]);
    l2.setPoints(points[3], points[2]);
    curve.clear().moveTo(points[0]).curveTo(points[1], points[2], points[3]);
  }
};
