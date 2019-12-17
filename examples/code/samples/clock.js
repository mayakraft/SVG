size(-1, -1, 2, 2);
background("white", true);
var radius = getWidth() * 0.333;

for (var i = 0; i < 12; i += 1) {
  text((i + 11) % 12 + 1)
    .fontFamily("Palatino, Georgia, Times New Roman")
    .fontSize(getWidth() / 12)
    .textAnchor("middle")
    .setAttribute("style", "transform: rotate("+(i*30)+"deg) translate(0, -"+radius*1.05+"px)");
}

var pies = [
  wedge().fill("white"),
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
      pies[i].setArc(0, 0, radius, a1, a2, true);
    });
};