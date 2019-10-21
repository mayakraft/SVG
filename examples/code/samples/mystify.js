var Particle = function () {
  var step = random(5);
  var a = random(PI * 2);
  var obj = {};
  obj.p = [random(getWidth()), random(getHeight())];
  obj.v = [Math.cos(a) * step, Math.sin(a) * step];
  obj.update = function () {
    var max = [getWidth, getHeight];
    obj.p.forEach(function(p, i, arr) {
      obj.p[i] += obj.v[i];
      if (obj.p[i] < 0) { obj.p[i] = -obj.p[i]; obj.v[i] = -obj.v[i]; }
      if (obj.p[i] > max[i]()) { obj.p[i] = -obj.p[i] + max[i]() * 2; obj.v[i] = -obj.v[i]; }
    });
  };
  return obj;
};

size(400, 400);
fps = 30;
background("black", true);

var tail = random(20, 150);
var joints = random(4, 10);
var lines = group().fill("none");
var pts = [];
for (var i = 0; i < joints; i += 1) { pts.push(Particle()); }

animate = function (event) {
  for (var i = 0; i < joints; i += 1) { pts[i].update(); }
  var points = pts.map(function(p) { return p.p; });
  lines.polygon(points)
    .stroke("hsla(" + (event.frame % 360) + ", 100%, 50%, 0.5)");
  while (lines.children.length > tail) {
    lines.removeChild(lines.childNodes[0]);
  }
};
