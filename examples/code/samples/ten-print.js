size(40, 25);
background("#329");

var clip = clipPath();
clip.rect(0, 0, getWidth(), getHeight());
var layer = group()
  .stroke("#76d")
  .strokeWidth("1%")
  .strokeLinecap("square")
  .clipPath(clip);

for (var y = 0; y < 25; y += 1) {
  for (var x = 0; x < 40; x += 1) {
    var t = Math.random() - 0.5 > 0 ? 0 : 1;
    var u = t ? 0 : 1;
    layer.line(x, y + t, x + 1, y + u);
  }
}
