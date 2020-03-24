/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";

const Args = (a, b, c, d) => coordinates(...flatten(a, b, c, d)).slice(0, 4);
const setPoints = (element, a, b, c, d) => Args(a, b, c, d)
  .forEach((value, i) => element.setAttribute(attributes.line[i], value));

export default {
  line: {
    args: Args,
    methods: {
      setPoints,
    }
  }
};
