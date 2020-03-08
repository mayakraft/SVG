/**
 * SVG (c) Robby Kraft
 */

/**
 * sort elements into each array
 */
import Debug from "../environment/debug";
import N from "./nodes";
import Attr from "./attributes";

const elemAttr = { };

const gen = [Attr.general];
const genText = gen.concat([Attr.text]);
const eff = [Attr.effects];
const grad = [Attr.gradient];

// childOfFilter, childOfGradients, childOfText
N.cF.forEach(key => { elemAttr[key] = eff; });
N.cG.forEach(key => { elemAttr[key] = grad; });
N.cT.forEach(key => { elemAttr[key] = genText; });
// drawing elements
// takes care of <line>, <circle> type of defintions too, which won't usually
// manifest as a setter because it's a SVGAnimatedLength
// visible drawings

N.v.forEach(key => {
  elemAttr[key] = gen.concat(Attr[key] !== undefined ? [Attr[key]] : []);
});

elemAttr.svg = gen;

// NON VISIBLE
elemAttr.defs = gen;
// elemAttr.desc: [],
elemAttr.filter = eff;
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
elemAttr.g = gen;
// text
elemAttr.text = genText;
// gradients
elemAttr.linearGradient = grad.concat([Attr.linearGradient]);
elemAttr.radialGradient = grad.concat([Attr.radialGradient]);

Object.keys(elemAttr).forEach(key => {
  elemAttr[key] = elemAttr[key].reduce((a, b) => a.concat(b), []);
});

Debug.log(elemAttr);

export default elemAttr;
