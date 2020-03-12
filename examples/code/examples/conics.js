svg.size(100, 100);
svg.background("#edb", true);

var clip = svg.clipPath();
clip.circle(50, 0, 70.7);

svg.circle(0, 50, 50).fill("#e53");
svg.circle(50, 50, 50).fill("#158").opacity(0.75);
svg.circle(100, 50, 50).fill("#ec3");
svg.circle(50, 100, 70.7)
  .fill("#e53")
  .opacity(0.75)
  .clipPath(clip);
