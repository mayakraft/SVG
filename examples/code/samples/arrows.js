size(100, 100);
background("#edb", true);

var a1 = arrow()
  .stroke("#158")
  .fill("#158")
  .strokeWidth(2)
  .head({width: 3, height: 6})
  .strokeDasharray("2 1");

var a2 = arrow()
  .stroke("black")
  .strokeWidth(0.3)
  .head({width: 1, height: 4})
  .tail({width: 1, height: 4});

var a3 = arrow()
  .stroke("#e53")
  .fill("#e53")
  .curve(0.4)
  .head({width: 2, height: 6});

controls(4).position(function () {
  return [random(getWidth()), random(getHeight())];
}).changed(function () {
  a1.setPoints(this[0], this[1]);
  a2.setPoints(this[1], this[2]);
  a3.setPoints(this[2], this[3]);
}, true);
