size(100, 100);

var space = 4;
var clip = clipPath();
clip.rect(0, 0, 100, 100);

for (var i = 0; i <= 100 / space; i += 1) {
  let p = path()
    .fill("none")
    .strokeWidth(4)
    .strokeLinecap("square")
    .stroke(i % 2 === 0 ? "#000" : "#fff")
    .clipPath(clip)
    .moveTo(i * space, 0);

  for (var j = 0; j < 10; j += 1) {
    var dir = (j % 2) ? 0.5 : -0.5;
    var controlA = [(i + dir) * space, (j + 0.333) * 10];
    var controlB = [(i + dir) * space, (j + 0.666) * 10];
    var end = [i * space, (j + 1) * 10];
    p.curveTo(controlA, controlB, end);
  }
}
