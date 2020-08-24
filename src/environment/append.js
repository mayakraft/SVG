// append this library to be a part of the larger library

const applyToRabbitEar = (svg, ear) => {
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

const Append = function (library) {
  // is RabbitEar?
  if (typeof library.cp === "function"
    && typeof library.graph === "function"
    && typeof library.origami === "function") {
    applyToRabbitEar(this, library);
  }
};

export default Append;
