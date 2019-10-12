background("black");

var style = {
  fontFamily: "avenir next, helvetica neue, arial",
  fontWeight: 400,
  fontSize: "96px",
  textAnchor: "middle"
};

for (var j = 0; j < 7; j += 1) {
  for (var i = 0; i < 9; i += 1) {
    var x = 256 + 8 - 2 * i;
    var y = -100 + j * 110 + 2 * i;
    text(["los angeles", "new york"][j % 2], x, y)
      .setAttributes(style)
      .fill(`rgba(255, 0, ${128 + j * 20}, 0.25)`);
  }
}
