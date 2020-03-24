svg.size(-256, -256, 512, 512);

// all children will inherit this style
svg.stroke("black");

// how many divisions to make
var segments = 30;

// calculating these here makes our loop cleaner
var w = svg.getWidth() / 2 / segments;
var h = svg.getHeight() / 2 / segments;

// "i" will increment from 0 to (segments - 1)
for (var i = 0; i < segments; i += 1) {
  // "j" will decrement from segments to 1
  var j = segments - i;
  svg.line(-w * i, 0, 0, -h * j);  // top left
  svg.line(w * j, 0, 0, -h * i);   // top right
  svg.line(w * i, 0, 0, h * j);    // bottom right
  svg.line(-w * j, 0, 0, h * i);   // bottom left
}
