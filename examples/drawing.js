function Drawing(...args) {
  const { SVG } = window;

  const sketch = SVG(...args);
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
    const vector = [mouse.x - sketch.prev.x, mouse.y - sketch.prev.y];
    const sideA = [mouse.x + -vector[1] * 0.2, mouse.y + vector[0] * 0.2];
    const sideB = [mouse.x + vector[1] * 0.2, mouse.y + -vector[0] * 0.2];

    sketch.points.unshift(sideA);
    sketch.points.push(sideB);
    SVG.setPoints(sketch.brushPoly, sketch.points);

    sketch.prev = mouse;
  };

  return sketch;
}
