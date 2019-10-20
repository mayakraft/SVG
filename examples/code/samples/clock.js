size(-1, -1, 2, 2);
background("#edb");
var r = 0.666;
var sw = 0.0333;

for (var i = 0; i < 60; i += 1) {
  var a = PI * i / 30;
  var m = i % 5 === 0 ? r + sw * 5 : r + sw * 2;
  line(-Math.cos(a) * m, -Math.sin(a) * m, Math.cos(a) * m, Math.sin(a) * m)
    .stroke("#000")
    .strokeWidth(sw);
}

circle(0, 0, r + sw).fill("#000");
var pies = [
  wedge().fill("#edb"),
  wedge().fill("#e53"),
  wedge().fill("#158")
];

svg.animate = function (time) {
  var d = new Date();
  var s = (d.getSeconds() + d.getMilliseconds() / 1000) / 60;
  var m = d.getMinutes() / 60;
  var h = (d.getHours() % 12) / 12;
  [(s), (m + s / 60), (h + m / 60)]
    .sort(function(a, b) { return a - b; })
    .forEach(function(a, i, arr) {
      var a1 = -PI / 2 + 2 * PI * a;
      var a2 = -PI / 2 + 2 * PI * arr[(i + 1) % arr.length];
      pies[i].setArc(0, 0, r, a1, a2, true);
    });
};
