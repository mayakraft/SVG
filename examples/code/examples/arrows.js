svg.size(1, 1);
svg.background("black");

let arrowhead = svg.marker()
  .setViewBox(0, -1, 2, 2)
  .orient("auto-start-reverse");

arrowhead.polygon(0, 1, 2, 0, 0, -1).fill("white");

for (var i = 0; i < 10; i += 1) {
  svg.curve(Math.random(), Math.random(), Math.random(), Math.random())
    .fill("none")
    .stroke("white")
    .strokeWidth(0.02)
    .bend(0.5)
    .markerEnd(arrowhead)
    .markerStart(arrowhead);
}
