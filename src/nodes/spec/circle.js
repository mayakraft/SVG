/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";
import { distance2 } from "../../methods/math";

const setRadius = (el, r) => el.setAttribute(attributes.circle[0], r);
const setOrigin = (el, a, b) => [, ...coordinates(...flatten(a, b)).slice(0, 2)]
  .forEach((value, i) => el.setAttribute(attributes.circle[i], value));

const fromPoints = (a, b, c, d) => [distance2([a, b], [c, d]), a, b];

export default {
  circle: {
    args: (a, b, c, d) => {
      const coords = coordinates(...flatten(a, b, c, d));
      // console.log("SVG circle coords", coords);
      return (coords.length > 3
        ? fromPoints(...coords)
        : coords);
      // return coordinates(...flatten(a, b, c)).slice(0, 3);
    },
    methods: {
      radius: setRadius,
      setRadius,
      origin: setOrigin,
      setOrigin,
      center: setOrigin,
      setCenter: setOrigin,
      position: setOrigin,
      setPosition: setOrigin,
    }
  }
};
