/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";

const setPosition = (el, a, b) => coordinates(...flatten(a, b)).slice(0, 2)
  .forEach((value, i) => el.setAttribute(attributes.circle[i], value));

export default {
  rect: {
    args: (a, b, c, d) => coordinates(...flatten(a, b, c, d)).slice(0, 4),
  }
};
