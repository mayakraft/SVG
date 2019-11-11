size(400, 400);
fps = 30;
background("black", true);

var tail = random(20, 150);
var joints = random(4, 10);
var lines = group().fill("none");
var pts = [];

var Particle = function () {
  var obj = {
    p: math.vector(random(getWidth()), random(getHeight())),
    v: math.vector.withAngle(random(PI * 2)).scale(random(5))
  };
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

for (var i = 0; i < joints; i += 1) { pts.push(Particle()); }

animate = function (event) {
  for (var i = 0; i < joints; i += 1) { pts[i].update(); }
  var points = pts.map(function(p) { return p.p; });
  lines.polygon(points)
    .stroke("hsl(" + (event.frame % 360) + ", 100%, 50%)");
  while (lines.children.length > tail) {
    lines.removeChild(lines.childNodes[0]);
  }
};
