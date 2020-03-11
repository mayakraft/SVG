svg.size(1, 1);

let arrowhead = svg.marker()
  .setViewBox(0, -1, 2, 2)
  .orient("auto-start-reverse");

arrowhead.polygon(0, 1, 2, 0, 0, -1);

for (var i = 0; i < 10; i += 1) {
  svg.curve(Math.random(), Math.random(), Math.random(), Math.random())
    .fill("none")
    .stroke("black")
    .strokeWidth(0.02)
    .arc(0.5)
    .markerEnd(arrowhead)
    .markerStart(arrowhead);
}
