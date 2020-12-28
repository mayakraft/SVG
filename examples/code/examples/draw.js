svg.size(100, 100);

// keep track of every touch
var points = [];

// a polygon is a filled shape
// defined by an array of points
var p = svg.polygon()
  .fillRule("evenodd")
  .fill("#e53")
  .stroke("#158");
// "evenodd" is a cool effect for
// when the polygon self-intersects

// every time a touch moves, add a point to the array
svg.onMove = function (mouse) {
  points.push([mouse.x, mouse.y]);
  // only 100 points are allowed
  if (points.length > 100) { points.shift(); }
  // update the polygon with the current set of points
  p.setPoints(points);
};

///////////////
//           //
// draw 🌀🖌 //
//           //
///////////////
