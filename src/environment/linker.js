/**
 * SVG (c) Robby Kraft
 */

// link this library to be a part of the larger library
const Linker = function (ear) {
  const svg = this;
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
  keys
    .filter(key => ear[key] && ear[key].prototype)
    .forEach((key) => {
      ear[key].prototype.svg = function () { return svg.path(this.svgPath()); };
    });
  ear.svg = svg;
};

export default Linker;
