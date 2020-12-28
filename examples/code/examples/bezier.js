svg.size(800, 800);

// create a layer behind everything
var back = svg.g();

// shapes on top
var curve = svg.path();
var l1 = svg.line().stroke("black");
var l2 = svg.line().stroke("black");

// these are control points
// 1.create an svg element to track with each point
// 2.assign a position
// 3.append to a parent
// 4.onChange event handler with "this" bound to the controls
svg.controls(4)
  .svg(function () { return SVG.circle(svg.getWidth() * 0.05).fill("#e53"); })
  .position(function () { return [random(svg.getWidth()), random(svg.getHeight())]; })
  .parent(back)
  .onChange(function () {
    l1.setPoints(this[0], this[1]);
    l2.setPoints(this[3], this[2]);
    curve.clear().Move(this[0]).Curve(this[1], this[2], this[3]);
  }, true);
