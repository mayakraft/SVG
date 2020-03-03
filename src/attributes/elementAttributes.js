import N from "../elements/nodeNames";
import Attr from "./attributes";

const elemAttr = { };

// drawing elements
N.drawings.forEach(key => { elemAttr[key] = [Attr.general]; });
N.childOfFilter.forEach(key => { elemAttr[key] = [Attr.effects]; });
N.childOfGradients.forEach(key => { elemAttr[key] = [Attr.gradient]; })
N.childOfText.forEach(key => { elemAttr[key] = [Attr.general, Attr.text]; })

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
elemAttr.marker = [Attr.marker];
// elemAttr.symbol: [],
elemAttr.clipPath = [Attr.clipPath];
// elemAttr.mask: [],
elemAttr.pattern = [Attr.pattern];

// VISIBLE
elemAttr.g = [Attr.general];
// text
elemAttr.text = [Attr.general, Attr.text];
// gradients
elemAttr.linearGradient = [Attr.gradient, Attr.linearGradient];
elemAttr.radialGradient = [Attr.gradient, Attr.radialGradient];

Object.keys(elemAttr).forEach(key => {
  elemAttr[key] = elemAttr[key].reduce((a, b) => a.concat(b), []);
});

export default elemAttr;
