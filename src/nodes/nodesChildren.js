/**
 * SVG (c) Robby Kraft
 */

import N from "./nodes";

const nodeChildren = {
  // removed non visible
  svg: [N.svg, N.defs, N.header, N.nonVisible, N.patterns, N.group, N.drawings, N.text],
  // NON VISIBLE
  defs: [N.header, N.patterns, N.nonVisible],
  // desc: [],
  filter: [N.childOfFilter],
  // metadata: [],
  // style: [],
  // script: [],
  // title: [],
  // view: [],
  marker: [N.group, N.drawings, N.text],
  symbol: [N.group, N.drawings, N.text],
  clipPath: [N.group, N.drawings, N.text],
  mask: [N.group, N.drawings, N.text],
  // VISIBLE
  g: [N.group, N.drawings, N.text],
  text: [N.childOfText],
  linearGradient: [N.childOfGradients],
  radialGradient: [N.childOfGradients]
};

Object.keys(nodeChildren).forEach(key => {
  nodeChildren[key] = nodeChildren[key].reduce((a, b) => a.concat(b), []);
});

export default nodeChildren;
