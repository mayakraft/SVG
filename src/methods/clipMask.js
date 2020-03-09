/**
 * SVG (c) Robby Kraft
 */

import K from "../environment/keys";

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

export default {
  clipPath: (el, parent) => el.setAttribute("clip-path", findIdURL(parent)),
  mask: (el, parent) => el.setAttribute("mask", findIdURL(parent))
};
