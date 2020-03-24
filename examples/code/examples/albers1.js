svg.size(90, 90);
svg.background("#9590c0");

// all shapes will be drawn at the point 0, 0
// shifting the layer will center the shapes
var g = svg.g().translate(35, 15);

// these attributes will be applied to every shape
// this is useful when you have many similar-looking shapes
var style = { fill: "#2c266d", opacity: 0.4 };

// transform-origin moves the center of rotation
// right rect
g.rect(0, 0, 30, 50)
  .setAttributes(style)
  .transformOrigin("0 50")
  .rotate(25);

// no rotation
// center rect
g.rect(0, 0, 30, 50).setAttributes(style);

// left rect
g.rect(0, 0, 30, 50)
  .setAttributes(style)
  .transformOrigin("0 50")
  .rotate(-25);
