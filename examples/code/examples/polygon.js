svg.size(-1, -1, 2, 2);
svg.background("white");

for (var i = 3; i < 36; i += 1) {
  var radius = Math.tan(Math.PI/i) / Math.sin(Math.PI/i);

  svg.regularPolygon(0, 0, radius, i)
    .stroke("black")
    .strokeWidth(0.001)
    .fill("none")
    .rotate(180 + Math.PI/i / Math.PI * 180);
}
