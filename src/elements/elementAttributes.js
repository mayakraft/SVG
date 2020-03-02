import T from "./tags";
import Attr from "../attributes/attributes";

const ATTR = {
  general: [],
  animation: [],
  effects: [],
  text: [],
  clipPath: [],
  marker: [],
  pattern: [],
  gradient: [],
  linearGradient: [],
  radialGradient: [],
}

const tags = {
  childOfText: [],
  childOfGradients: [],
  childOfFilter: [],
  text: [],
  drawings: [],
  group: [],
// can contain drawings
  nonVisible: [],
  patterns: [],
  cdata: [],
  header: [],
  defs: [],
  svg: [],
};

const elemAttr = { };

// drawing elements
T.drawings.forEach(key => { elemAttr[key] = [Attr.general]; });
T.childOfFilter.forEach(key => { elemAttr[key] = [Attr.effects]; });

elemAttr.svg = [Attr.general];
// NON VISIBLE
elemAttr.defs = [Attr.general];
// elemAttr.desc: [],
elemAttr.filter = [Attr.effects];
// elemAttr.metadata: [],
// elemAttr.style: [cdata], // ability to create a cdata
// elemAttr.script: [],
// elemAttr.title: [],
// elemAttr.view: [],
// elemAttr.marker: [],
// elemAttr.symbol: [],
elemAttr.clipPath = [Attr.clipPath];
// elemAttr.mask: [],
// VISIBLE
elemAttr.g = [Attr.general];

// text
elemAttr.text = [Attr.general, Attr.text];
elemAttr.textPath = [Attr.general, Attr.text];
elemAttr.tspan = [Attr.general, Attr.text];

elemAttr.linearGradient = [Attr.gradient, Attr.linearGradient];
elemAttr.radialGradient = [Attr.gradient, Attr.radialGradient];

Object.keys(elemAttr).forEach(key => {
  elemAttr[key] = elemAttr[key].reduce((a, b) => a.concat(b), []);
});

export default elemAttr;
