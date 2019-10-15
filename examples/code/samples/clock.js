size(-1, -1, 2, 2);
background("#edb");
svg.fps = 30;

for (var i = 0; i < 60; i += 1) {
  var a = PI * i / 30;
  var r = i % 5 === 0 ? 0.92 : 0.84;
  line(-Math.cos(a) * r, -Math.sin(a) * r, Math.cos(a) * r, Math.sin(a) * r)
    .stroke("#000")
    .strokeWidth(0.04);
}

var pies = [
  wedge().fill("#158"),
  wedge().fill("#ec3"),
  wedge().fill("#e53")
];

svg.animate = function (time) {
  var d = new Date();
  var s = (d.getSeconds() + d.getMilliseconds() / 1000) / 60;
  var m = d.getMinutes() / 60;
  var h = (d.getHours() % 12) / 12;

  [ -PI / 2 + s * 2 * PI,
    -PI / 2 + m * 2 * PI + s * 2 * PI / 60,
    -PI / 2 + h * 2 * PI + m * 2 * PI / 60
  ].sort(function(a, b) { return a - b; })
    .forEach(function(a, i, arr) {
      pies[i].setArc(0, 0, 0.8, a, arr[(i + 1) % arr.length], true);
    });
};
