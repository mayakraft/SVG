size(40, 25);
background("#329", false);
svg.fps = 120;

var clip = clipPath();
clip.rect(0, 0, getWidth(), getHeight());
var layer = group()
  .stroke("#76d")
  .strokeWidth("1%")
  .strokeLinecap("square")
  .clipPath(clip);

for(var y = 0; y < 25; y += 1) {
  for(var x = 0; x < 40; x += 1) {
    var a = Math.random() - 0.5 > 0 ? 0 : 1;
    var b = a ? 0 : 1;
    layer.line(x, y + a, x + 1, y + b);
  }
}
