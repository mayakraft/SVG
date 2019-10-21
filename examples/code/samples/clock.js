size(-1, -1, 2, 2);
background("#edb", true);
var r = getWidth() * 0.333;
var strokeW = r / 20;

for (var i = 0; i < 60; i += 1) {
  var a = PI * i / 30;
  var h = i % 5 === 0;
  var d = h ? r + strokeW * 3 : r + strokeW;
  circle(-Math.cos(a) * d, -Math.sin(a) * d, r/30);
}

circle(0, 0, r + strokeW).fill("#000");
var pies = [
  wedge().fill("#edb"),
  wedge().fill("#e53"),
  wedge().fill("#158")
];

animate = function (time) {
  var d = new Date();
  var s = (d.getSeconds() + d.getMilliseconds() / 1000) / 60;
  var m = d.getMinutes() / 60;
  var h = (d.getHours() % 12) / 12;
  [(s), (m + s / 60), (h + m / 12 + s / 720)]
    .sort(function(a, b) { return a - b; })
    .forEach(function(a, i, arr) {
      var a1 = -PI / 2 + 2 * PI * a;
      var a2 = -PI / 2 + 2 * PI * arr[(i + 1) % arr.length];
      pies[i].setArc(0, 0, r, a1, a2, true);
    });
};
