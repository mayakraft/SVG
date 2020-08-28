svg.size(40, 25);
svg.background("#329");

// apply style to the layer and all children will inherit
var layer = svg.g()
  .stroke("#76d")
  .strokeWidth("1%")
  .strokeLinecap("square");

// a 2d-grid of either / or \
// the column and row sizes are 1px
for (var y = 0; y < 25; y += 1) {
  for (var x = 0; x < 40; x += 1) {
    // a random 0 or 1, and "b" will be the opposite
    var a = Math.random() - 0.5 > 0 ? 0 : 1;
    var b = a ? 0 : 1;
    // a diagonal line, upwards or downwards
    layer.line(x, y + a, x + 1, y + b);
  }
}
