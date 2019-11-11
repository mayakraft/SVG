size(-1, -1, 2, 2);
background("white", true);
var r = getWidth() * 0.333;

for (var i = 0; i < 60; i += 1) {
  var h = i % 5 === 0;
  var a = PI * i / 30;
  var d = r + r / 50 * 1.5;
  circle(-Math.cos(a) * d, -Math.sin(a) * d, h ? r/40: r/80);
  if (h) {
    var fontSize = getWidth() / 12;
    text((i/5 + 11) % 12 + 1)
      .fontFamily("Didot, Garamond, Palatino, Georgia, Times New Roman")
      .fontSize(fontSize).textAnchor("middle").setAttribute("style",
      "transform: rotate("+(i*6)+"deg)  translate(0, -0.73px)");
  }
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
      pies[i].setArc(0, 0, r, a1, a2, true);
    });
};
