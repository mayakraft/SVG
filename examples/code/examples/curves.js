svg.size(100, 100);
svg.background("white");

var colors = ["#e53", "#158", "#ec3"];

var pts = [];
for (var i = 0; i < 8; i += 1) {
  pts.push([Math.random() * 100, Math.random() * 100]);
}

for (var i = 0; i < pts.length - 1; i += 1) {
  var color = colors[Math.floor(Math.random()*3)];
  var width = Math.random() * 12;
  var rand1 = Math.random() < 0.5;
  var rand2 = Math.random() < 0.8;

  svg.curve(pts[i], pts[i+1])
    .fill("none")
    .stroke(color)
    .strokeWidth(width)
    .strokeDasharray(rand2 ? "none" : Math.random() * 8 + 2)
    .bend(rand1 ? 0 : 0.5);
}
