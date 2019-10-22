size(512, 512);
background("#edb", true);

// var SEGMENTS = randomInt(13, 128);
var SEGMENTS = 200;

var w = getWidth() / SEGMENTS;
var h = getHeight() / SEGMENTS;
for (var i = 0; i <= SEGMENTS; i += 1) {
  var j = SEGMENTS - i;
  line(w * i, 0, 0, h * j).stroke("#e53c");
  line(w * j, getHeight(), getWidth(), h * i).stroke("#e53c");
  line(w * i, 0, getWidth(), h * i).stroke("#111c");
  line(w * j, getHeight(), 0, h * j).stroke("#111c");
}
