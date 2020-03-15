/**
 * SVG (c) Robby Kraft
 */

import Debug from "../environment/debug";
import N from "../nodes/nodes";
import ManyElements from "./manyElements";
import SingleElements from "./singleElements";

Object.values(N)
  .reduce((a,b) => a.concat(b), [])
  .filter(nodeName => SingleElements[nodeName] === undefined)
  .forEach(nodeName => { SingleElements[nodeName] = []; });

const map = [
  [["svg", "defs", "g"], ManyElements.presentation],
  [["filter"], ManyElements.effects],
  [["text"], ManyElements.text],
  [N.cF, ManyElements.effects],
  [N.cG, ManyElements.gradient],
  [N.cT, ManyElements.text],
]

map.forEach(pair => pair[0].forEach(key => {
  SingleElements[key] = SingleElements[key].concat(pair[1]);
}));

Debug.log(SingleElements);

export default SingleElements;
