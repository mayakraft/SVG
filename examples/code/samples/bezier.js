size(100, 100);
background("white");

rect(0, 0, 100, 100)
  .fill("#ec3")
  .stroke("#158")
  .strokeDasharray("4 2")
  .strokeDashoffset(Math.floor(Math.random()*7))
  .strokeWidth("2");

var t = -20 + 40 * Math.random();
var u = 100 - t;
bezier(0, 0, u, t, t, u, 100, 100)
  .fill("#158")
  .stroke("#e53")
  .strokeWidth(4);
