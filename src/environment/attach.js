/**
 * SVG (c) Robby Kraft
 */

// attach this library to be a part of the larger library
const attachToRabbitEar = (svg, ear) => {
  ear.svg = svg;
  const keys = [
    // "vector",
    // "line",
    // "ray",
    "segment",
    "circle",
    "ellipse",
    "rect",
    "polygon",
    // "matrix",
    // "plane",
  ];
  keys.forEach((key) => {
    ear[key].prototype.svg = function () { return svg.path(this.svgPath()); };
  });
};

const Attach = function (library) {
  // is RabbitEar?
  if (typeof library.cp === "function"
    && typeof library.graph === "function"
    && typeof library.origami === "function") {
    attachToRabbitEar(this, library);
  }
};

export default Attach;
