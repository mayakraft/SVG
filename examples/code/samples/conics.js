size(100, 100);
background("#edb");

var clip = clipPath();
clip.circle(50, 0, 70.7);

circle(0, 50, 50).fill("#e53");
circle(50, 50, 50).fill("#158").opacity(0.75);
circle(100, 50, 50).fill("#ec3");
circle(50, 100, 70.7)
  .fill("#e53")
  .opacity(0.75)
  .clipPath(clip);
