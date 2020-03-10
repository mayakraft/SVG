/**
 * SVG (c) Robby Kraft
 */

import K from "../environment/keys";
import Nodes from "../nodes/nodes";
import Case from "../arguments/case";

// for the clip-path and mask values. looks for the ID as a "url(#id-name)" string
const findIdURL = function (arg) {
  if (arg == null) { return ""; }
  if (typeof arg === K.string) {
    return arg.slice(0, 3) === "url"
      ? arg
      : `url(#${arg})`;
  }
  if (arg.getAttribute != null) {
    const idString = arg.getAttribute(K.id);
    return `url(#${idString})`;
  }
  return "";
};

const methods = {};

["clip-path",
  "mask",
  "symbol",
  "marker-end",
  "marker-mid",
  "marker-start",
].forEach(attr => {
  methods[Case.toCamel(attr)] = (element, parent) => element.setAttribute(attr, findIdURL(parent));
});

export default methods;