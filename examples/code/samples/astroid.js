size(256, 256);
background("#edb");

var SEGMENTS = randomInt(13, 128);
var w = getWidth() / SEGMENTS;
var h = getHeight() / SEGMENTS;

for (var i = 0; i <= SEGMENTS; i += 1) {
  var j = SEGMENTS - i;
  line(w * i, 0, 0, h * j).stroke("#158");
  line(w * j, getHeight(), getWidth(), h * i).stroke("#158");
  line(w * i, 0, getWidth(), h * i).stroke("#e53");
  line(w * j, getHeight(), 0, h * j).stroke("#e53");
}
