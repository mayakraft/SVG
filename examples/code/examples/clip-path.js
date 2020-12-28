svg.size(100, 100);
svg.background("#edb");

// a clip-path will hide or show parts of shapes.
// presence of a filled-shape indicates visibility
var clip = svg.clipPath();
clip.circle(70.7).origin(50, 0); // the visible portion

// three circles, untouched
svg.circle(0, 50, 50).fill("#e53");
svg.circle(50, 50, 50).fill("#158").opacity(0.75);
svg.circle(100, 50, 50).fill("#ec3");

// this circle will be clipped by the clip-path
svg.circle(50, 100, 70.7)
  .fill("#e53")
  .opacity(0.75)
  .clipPath(clip);
