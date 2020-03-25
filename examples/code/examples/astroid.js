svg.size(-256, -256, 512, 512);
svg.background("black");

// all children will inherit this style
var layer = svg.g().stroke("white");

// how many divisions to make
var segments = 30;

// calculating these here makes our loop cleaner
var w = svg.getWidth() / 2 / segments;
var h = svg.getHeight() / 2 / segments;

// "i" will increment from 0 to (segments - 1)
for (var i = 0; i < segments; i += 1) {
  // "j" will decrement from segments to 1
  var j = segments - i;
  layer.line(-w * i, 0, 0, -h * j);  // top left
  layer.line(w * j, 0, 0, -h * i);   // top right
  layer.line(w * i, 0, 0, h * j);    // bottom right
  layer.line(-w * j, 0, 0, h * i);   // bottom left
}
