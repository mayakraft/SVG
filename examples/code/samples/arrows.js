svg.size(100, 100);

var pts = [];
for (var i = 0; i < 8; i += 1) {
  pts.push([Math.random() * 100, Math.random() * 100]);
}

for (var i = 0; i < pts.length - 1; i += 1) {
  var color = ["#e53", "#158", "black"][Math.floor(Math.random()*3)];
  var rand1 = Math.random() < 0.5;
  var rand2 = Math.random() < 0.5;
  var rand3 = Math.random() < 0.5;

  svg.arrow()
    .fill(color)
    .stroke(color)
    .strokeWidth(rand2 ? 1 : 4)
    .strokeDasharray(rand3 ? "none" : Math.random() * 3 + 0.4)
    .curve(rand1 ? 0 : 0.4)
    .head({width: rand2 ? 1.5 : 4, height: rand2 ? 3 : 8})
    .tail({width: rand2 ? 1.5 : 4, height: rand2 ? 3 : 8})
    .setPoints(pts[i][0], pts[i][1], pts[i+1][0], pts[i+1][1]);
}
