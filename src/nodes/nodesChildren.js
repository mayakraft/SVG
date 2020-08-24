/**
 * SVG (c) Robby Kraft
 */

import N from "./nodeNames";
// import Custom from "./custom/index";

// arc, parabola, regularPolygon, arrow...
// const customPrimitives = Object.keys(Custom);
// todo, get rid of custom primitives here if possible

const headerStuff = [N.h, N.p, N.i];
const drawingShapes = [N.g, N.v, N.t];//, customPrimitives];

const folders = {
  // VISIBLE
  svg: [N.s, N.d].concat(headerStuff).concat(drawingShapes),
  g: drawingShapes,
  text: [N.cT],
  linearGradient: [N.cG],
  radialGradient: [N.cG],
  // NON VISIBLE
  defs: headerStuff,
  filter: [N.cF],
  marker: drawingShapes,
  symbol: drawingShapes,
  clipPath: drawingShapes,
  mask: drawingShapes,
};

const nodesAndChildren = {};
Object.keys(folders).forEach((key) => {
  nodesAndChildren[key] = folders[key].reduce((a, b) => a.concat(b), []);
});

export default nodesAndChildren;
