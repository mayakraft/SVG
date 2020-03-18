/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";

export default {
  rect: {
    args: (a, b, c, d) => coordinates(...flatten(a, b, c, d)).slice(0, 4),
  }
};
