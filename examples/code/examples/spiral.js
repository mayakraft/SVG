svg.size(-10, -10, 20, 20);
svg.background('white');

var phipi = Math.PI / (Math.sqrt(5) + 1) * 4;

var radius = 1 / 40;
var size = 1 / 30;

for(var i = 1; i < 360; i += 1) {
  var x = i * radius;
  var r = Math.pow(i, 0.5) * size;
  svg.regularPolygon(x, 0, r, 3)
    .rotate(i * phipi * 180 / Math.PI)
    .fill("#000");
}
