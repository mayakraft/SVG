size(100, 100);
background("#edb");

var lerp = function (a, b, t) {
  return [a[0] * t + b[0] * (1-t), a[1] * t + b[1] * (1-t)];
};

var makeCurve = function () {
  var p = touches.map(function (c) { return c.position; });
  var t = 0.6666;
  return [p[0][0], p[0][1],
    (p[2][0]*t + p[0][0]*(1-t)), (p[2][1]*t + p[0][1]*(1-t)),
    (p[2][0]*t + p[1][0]*(1-t)), (p[2][1]*t + p[1][1]*(1-t)),
    p[1][0], p[1][1]];
};

var radius = getWidth() * 0.025;
var touches = svg.controls(3, {fill: "#e53", radius: radius});
touches.forEach(function (c) { c.position = [random(getWidth()), random(getHeight())]; });
var curve = bezier(...makeCurve()).fill("none").stroke("#e53");
var lerpDot = circle(0, 0, radius).fill("#158");

svg.animate = function (event) {
  var phase = Math.sin(event.time) * 0.5 + 0.5;
  var pts = touches.map(function(el) { return el.position; });
  var mids = [lerp(pts[0], pts[2], phase), lerp(pts[2], pts[1], phase)];
  var dot = lerp(mids[0], mids[1], phase);
  lerpDot.setAttributes({cx: dot[0], cy: dot[1]});
};

svg.mouseMoved = function (mouse) {
  if (mouse.isPressed) { curve.setBezier(...makeCurve()); }
};
