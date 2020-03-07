/**
 * SVG (c) Robby Kraft
 */

import findCoordinates from "./coordinates";
import flatten from "./flatten";
import K from "../../environment/keys";

const keys = ["x", "y"];

export default (element, ...args) => {
  findCoordinates(...flatten(...args)).slice(0, 2)
    .forEach((p, i) => element.setAttribute(keys[i], p));
  const text = args.filter(a => typeof a === K.string).shift();
  if (text) {
    element.innerHTML = text;
  }
  return element;
};
