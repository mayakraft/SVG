/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";

const setRadii = (el, rx, ry) => [,,rx,ry].forEach((value, i) => el.setAttribute(attributes.ellipse[i], value));

export default {
  ellipse: {
    args: (a, b, c, d) => coordinates(...flatten(a, b, c, d)).slice(0, 4),
    methods: {
      radius: setRadii,
      setRadius: setRadii,
      setCenter: (el, a, b) => coordinates(...flatten(a, b)).slice(0, 2)
        .forEach((value, i) => el.setAttribute(attributes.ellipse[i], value))
    }
  }
};


