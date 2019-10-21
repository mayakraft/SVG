size(800, 800);
background("#edb", true);

var back = group();
var l1 = line().stroke("black");
var l2 = line().stroke("black");
var curve = path();

controls(4)
  .svg(function() { return SVG.circle(0, 0, getWidth() * 0.05).fill("#e53"); })
  .position(function() { return [random(getWidth()), random(getHeight())]; })
  .parent(back)
  .changed(function() {
    l1.setPoints(this[0], this[1]);
    l2.setPoints(this[3], this[2]);
    curve.clear().moveTo(this[0]).curveTo(this[1], this[2], this[3]);
  }, true);
