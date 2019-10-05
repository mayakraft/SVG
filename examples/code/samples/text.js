background("black");

for (let j = 0; j < 7; j += 1) {
  for (let i = 0; i < 8; i += 1) {
    text("eat the rich",
    	54 - 0.7 * i,
    	-10 + j*20 + 0.7 * i)
      .fontSize("16px")
      .fontFamily("avenir next, helvetica neue, arial")
      .fontWeight(400)
      .fill(`rgba(255, 0, ${128 + j * 20}, 0.3)`)
      .textAnchor("middle");
  }
}
