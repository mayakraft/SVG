svg.size(-1, -1, 2, 2);
svg.background("#888");
var radius = svg.getWidth() * 0.48;

for (var i = 0; i < 12; i += 1) {
  svg.text(String((i + 11) % 12 + 1))
    .fontFamily("Times New Roman")
    .fontSize(svg.getWidth() / 8)
    .textAnchor("middle")
    .setAttribute("style", "transform: rotate("+(i*30)+"deg) translate(0, -"+radius*0.75+"px)");
}

var pies = [
  svg.wedge().fill("#0008"),
  svg.wedge().fill("transparent"),
  svg.wedge().fill("#fff8")
];

svg.play = function (time) {
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