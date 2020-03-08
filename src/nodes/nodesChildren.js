/**
 * SVG (c) Robby Kraft
 */

import N from "./nodes";

const headerStuff = [N.h, N.p, N.i];
const drawingShapes = [N.g, N.v, N.t];

const nodeChildren = {
  // removed non visible
  svg: [N.s, N.d].concat(headerStuff).concat(drawingShapes),
  // NON VISIBLE
  defs: headerStuff,
  // desc: [],
  filter: [N.cF],
  // metadata: [],
  // style: [],
  // script: [],
  // title: [],
  // view: [],
  marker: drawingShapes,
  symbol: drawingShapes,
  clipPath: drawingShapes,
  mask: drawingShapes,
  // VISIBLE
  g: drawingShapes,
  text: [N.cT],
  linearGradient: [N.cG],
  radialGradient: [N.cG]
};

Object.keys(nodeChildren).forEach(key => {
  nodeChildren[key] = nodeChildren[key].reduce((a, b) => a.concat(b), []);
});

export default nodeChildren;
