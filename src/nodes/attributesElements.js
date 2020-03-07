/**
 * SVG (c) Robby Kraft
 */

/**
 * sort elements into each array
 */
import N from "./nodes";
import Attr from "./attributes";

const elemAttr = { };

N.childOfFilter.forEach(key => { elemAttr[key] = [Attr.effects]; });
N.childOfGradients.forEach(key => { elemAttr[key] = [Attr.gradient]; });
N.childOfText.forEach(key => { elemAttr[key] = [Attr.general, Attr.text]; });
// drawing elements
// takes care of <line>, <circle> type of defintions too, which won't usually
// manifest as a setter because it's a SVGAnimatedLength
N.drawings.forEach(key => {
  elemAttr[key] = [Attr.general, Attr[key] !== undefined ? Attr[key] : []];
});

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
