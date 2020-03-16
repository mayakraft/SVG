/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../../arguments/flatten";
import coordinates from "../../../arguments/coordinates";

export default (a, b, c, d) => coordinates(...flatten(a, b, c, d)).slice(0, 4);
