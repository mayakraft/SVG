size(90, 90);
background("#9590c0", true);

var g = group().translate(35, 15);
var style = { fill: "#2c266d", opacity: 0.4 };

g.rect(0, 0, 30, 50).setAttributes(style)
  .transformOrigin("0 50")
  .rotate(25);

g.rect(0, 0, 30, 50).setAttributes(style);

g.rect(0, 0, 30, 50).setAttributes(style)
  .transformOrigin("0 50")
  .rotate(-25);
