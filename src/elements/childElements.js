import T from "./tags";

const childElements = {
  svg: [T.svg, T.defs, T.header, T.patterns, T.nonVisible, T.group, T.drawings, T.text],
  // NON VISIBLE
  defs: [T.header, T.patterns, T.nonVisible],
  // desc: [],
  filter: [T.childOfFilter],
  // metadata: [],
  // style: [],
  // script: [],
  // title: [],
  // view: [],
  marker: [T.group, T.drawings, T.text],
  symbol: [T.group, T.drawings, T.text],
  clipPath: [T.group, T.drawings, T.text],
  mask: [T.group, T.drawings, T.text],
  // VISIBLE
  g: [T.group, T.drawings, T.text],
  text: [T.childOfText],
  linearGradient: [T.childOfGradients],
  radialGradient: [T.childOfGradients]
};

Object.keys(childElements).forEach(key => {
  childElements[key] = childElements[key].reduce((a, b) => a.concat(b), []);
});

export default childElements;
