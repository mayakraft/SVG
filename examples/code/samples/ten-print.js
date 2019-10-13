size(40, 25);
background("#329", false);
svg.fps = 120;

var clip = clipPath();
clip.rect(0, 0, getWidth(), getHeight());
var layer = group()
  .stroke("#76d").strokeWidth(0.333).strokeLinecap("square").clipPath(clip);
var rows = [layer.group()];

var slash = function (d) { return d ? [x, y+1, x+1, y] : [x, y, x+1, y+1]; };

var x = 0, y = 0, translateY = 0;

svg.animate = function () {
  // 10 PRINT CHR$(205.5+RND(1)); : GOTO 10
  rows[rows.length-1].line(...slash(Math.random() - 0.5 > 0));
  x += 1;
  // line break
  if (x >= getWidth()) { x = 0; y += 1; rows.push(layer.group()); }
  // page scroll
  if (y >= getHeight() + translateY) {
    translateY += 1;
    layer.clearTransforms().translate(0, -translateY);
    clip.clearTransforms().translate(0, translateY);
    layer.removeChild(rows.shift());
  }
};
