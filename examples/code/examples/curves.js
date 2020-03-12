svg.size(100, 100);
svg.background("white");

var pts = [];
for (var i = 0; i < 16; i += 1) {
  pts.push([Math.random() * 100, Math.random() * 100]);
}

for (var i = 0; i < pts.length - 1; i += 1) {
  var color = ["#e53", "#158", "black"][Math.floor(Math.random()*3)];
  var rand1 = Math.random() < 0.5;
  var rand2 = Math.random() < 0.5;
  var rand3 = Math.random() < 0.5;

  svg.curve(pts[i], pts[i+1])
    .fill("none")
    .stroke(color)
    .strokeWidth(rand2 ? 1 : 4)
    .strokeDasharray(rand3 ? "none" : Math.random() * 8 + 1)
    .bend(rand1 ? 0 : 0.5);
}
