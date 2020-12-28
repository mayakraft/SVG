svg.size(-1, -1, 2, 2);
svg.background("white");

// all children will inherit this style
svg.stroke("black")
  .strokeWidth(0.001)
  .fill("none");

// Math.tan(Math.PI/i) / Math.sin(Math.PI/i);

for (var i = 3; i < 36; i += 1) {
  // all polygons are vertex-aligned along the +X axis
  // a -90 degree rotation aligns it with the Y
  svg.regularPolygon(i).rotate(-90);
}
