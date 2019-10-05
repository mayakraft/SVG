background("black");

for (var j = 0; j < 7; j += 1) {
  for (var i = 0; i < 8; i += 1) {
    text("los angeles",
      256 + 8 - 3 * i,
      -100 + j * 110 + 3 * i)
      .fontSize("90px")
      .fontFamily("avenir next, helvetica neue, arial")
      .fontWeight(400)
      .fill(`rgba(255, 0, ${128 + j * 20}, 0.3)`)
      .textAnchor("middle");
  }
}
