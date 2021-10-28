/**
 * SVG (c) Robby Kraft
 */
import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";
import { distance2 } from "../../methods/math";

const setRadius = (el, r) => {
  el.setAttribute(attributes.circle[2], r);
  return el;
}

const setOrigin = (el, a, b) => {
  [...coordinates(...flatten(a, b)).slice(0, 2)]
    .forEach((value, i) => el.setAttribute(attributes.circle[i], value));
  return el;
};

const fromPoints = (a, b, c, d) => [a, b, distance2([a, b], [c, d])];

export default {
  circle: {
    args: (a, b, c, d) => {
      const coords = coordinates(...flatten(a, b, c, d));
      // console.log("SVG circle coords", coords);
      switch (coords.length) {
        case 0: case 1: return [, , ...coords]
        case 2: case 3: return coords;
        // case 4
        default: return fromPoints(...coords);
      }
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
