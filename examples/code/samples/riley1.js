svg.size(100, 100);

var space = random(3, 6);
var clip = svg.clipPath();
clip.rect(0, 0, 100, 100);

for (var i = 0; i < (100 + space) / space; i += 1) {
  let p = svg.path()
    .fill("none")
    .strokeWidth(space)
    .strokeLinecap("square")
    .stroke(i % 2 === 0 ? "#000" : "#fff")
    .clipPath(clip)
    .Move(i * space, 0);

  for (var j = 0; j < 10; j += 1) {
    var dir = (j % 2) ? 0.5 : -0.5;
    var controlA = [(i + dir) * space, (j + 0.333) * 10];
    var controlB = [(i + dir) * space, (j + 0.666) * 10];
    var end = [i * space, (j + 1) * 10];
    p.Curve(controlA, controlB, end);
  }
}
