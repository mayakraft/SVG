var Drawing = function (...args) {

  var sketch = SVG(...args);
  sketch.color = "#000000";

  sketch.drawingLayer = SVG.group();
  sketch.appendChild(sketch.drawingLayer);

  sketch.onMouseEnter = function (mouse) {
    sketch.brushPoly = SVG.polygon();
    sketch.brushPoly.setAttribute("style", `stroke:black; fill:${sketch.color}`);
    sketch.drawingLayer.appendChild(sketch.brushPoly);
    sketch.points = [];
    sketch.prev = mouse;
  };

  sketch.onMouseMove = function (mouse) {
    var vector = [mouse.x - sketch.prev.x, mouse.y - sketch.prev.y];
    var sideA = [mouse.x + -vector[1] * 0.2, mouse.y + vector[0] * 0.2];
    var sideB = [mouse.x + vector[1] * 0.2, mouse.y + -vector[0] * 0.2];

    sketch.points.unshift(sideA);
    sketch.points.push(sideB);
    SVG.setPoints(sketch.brushPoly, sketch.points);

    sketch.prev = mouse;
  };
  return sketch;
};
