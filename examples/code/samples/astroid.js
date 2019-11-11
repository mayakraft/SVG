size(512, 512);
svg.stroke("black");

var SEGMENTS = 80;
var w = getWidth() / SEGMENTS * 0.5;
var h = getHeight() / SEGMENTS * 0.5;

for (var i = 0; i < SEGMENTS; i += 1) {
  var j = SEGMENTS - i;
  line(w * i, getHeight() / 2, getWidth() / 2, h * j);
  line(getWidth() - w * j, getHeight() / 2, getWidth() / 2, h * i);
  line(getWidth() - w * i, getHeight() / 2, getWidth() / 2, getHeight() - h * j);
  line(getWidth() / 2, getHeight() - h * i, w * j, getHeight() / 2);
}
