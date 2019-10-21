size(100, 100);
background("#edb");

var lerp = function (a, b, t) {
  return [a[0] * t + b[0] * (1-t), a[1] * t + b[1] * (1-t)];
};

var makeCurve = function () {
  var t = 0.6666;
  return [pts[0][0], pts[0][1],
    (pts[2][0]*t + pts[0][0]*(1-t)), (pts[2][1]*t + pts[0][1]*(1-t)),
    (pts[2][0]*t + pts[1][0]*(1-t)), (pts[2][1]*t + pts[1][1]*(1-t)),
    pts[1][0], pts[1][1]];
};

var radius = getWidth() * 0.025;
var pts = svg.controls(3)
  .svg(() => SVG.circle().setRadius(radius).fill("#e53"))
  .position(() => [random(getWidth()), random(getHeight())]);
var curve = bezier(...makeCurve()).fill("none").stroke("#e53");
var dot = circle(0, 0, radius).fill("#158");

svg.animate = function (event) {
  var phase = Math.sin(event.time) * 0.5 + 0.5;
  var mids = [lerp(pts[0], pts[2], phase), lerp(pts[2], pts[1], phase)];
  var dotPos = lerp(mids[0], mids[1], phase);
  dot.setAttributes({cx: dotPos[0], cy: dotPos[1]});
};

svg.mouseMoved = function (mouse) {
  if (mouse.isPressed) { curve.setBezier(...makeCurve()); }
};
