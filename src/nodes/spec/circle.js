/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";

const setRadius = (el, r) => el.setAttribute(attributes.circle[2], r);
const setCenter = (el, a, b) => coordinates(...flatten(a, b)).slice(0, 2)
  .forEach((value, i) => el.setAttribute(attributes.circle[i], value));

export default {
  circle: {
    args: (a, b, c) => coordinates(...flatten(a, b, c)).slice(0, 3),
    methods: {
      radius: setRadius,
      setRadius: setRadius,
      center: setCenter,
      setCenter: setCenter,
      position: setCenter,
      setPosition: setCenter,
    }
  }
};
