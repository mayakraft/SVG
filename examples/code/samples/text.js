size(100, 100);
background("black", true);

var style = {
  fontFamily: "avenir next, helvetica neue, arial",
  fontWeight: 400,
  fontSize: "16px",
  textAnchor: "middle"
};

for (var j = 0; j < 7; j += 1) {
  for (var i = 0; i < 9; i += 1) {
    var x = 50 + 2 - 0.5 * i;
    var y = 0 + j * 18 + 0.5 * i;
    text(["los angeles", "new york"][j % 2], x, y)
      .setAttributes(style)
      .fill(`rgba(255, 0, ${150 + j * 15}, 0.25)`);
  }
}
