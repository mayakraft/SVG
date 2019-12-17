size(100, 100);

var arrowBlue = arrow()
  .stroke("#158")
  .fill("#158")
  .strokeWidth(8)
  .head({width: 8, height: 16})
  .strokeDasharray("8 4");

var arrowBlack = arrow()
  .stroke("black")
  .strokeWidth(0.3)
  .head({width: 1, height: 4})
  .tail({width: 1, height: 4});

var arrowRed = arrow()
  .stroke("#e53")
  .fill("#e53")
  .curve(0.4)
  .head({width: 2, height: 6});

controls(4)
  .position(function () { return [random(getWidth()), random(getHeight())]; })
  .changed(function () {
    arrowBlue.setPoints(this[0], this[1]);
    arrowBlack.setPoints(this[1], this[2]);
    arrowRed.setPoints(this[2], this[3]);
  }, true);
