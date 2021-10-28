/**
 * SVG (c) Robby Kraft
 */
import * as K from "../environment/keys";
import N from "../nodes/nodeNames";
import ManyElements from "./manyElements";
import NodeAttributes from "./singleElements";

Object.values(N)
  .reduce((a,b) => a.concat(b), [])
  .filter(nodeName => NodeAttributes[nodeName] === undefined)
  .forEach(nodeName => { NodeAttributes[nodeName] = []; });

[ [[K.svg, "defs", "g"].concat(N.v, N.t), ManyElements.presentation],
  [["filter"], ManyElements.effects],
  [N.cT.concat("text"), ManyElements.text], // todo: should we include "svg" here?
  [N.cF, ManyElements.effects],
  [N.cG, ManyElements.gradient],
].forEach(pair => pair[0].forEach(key => {
  NodeAttributes[key] = NodeAttributes[key].concat(pair[1]);
}));

export default NodeAttributes;
