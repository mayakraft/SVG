/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";

const setSize = (el, rx, ry) => [rx, ry]
  .forEach((value, i) => el.setAttribute(attributes.rect[i], value));

const setOrigin = (el, a, b) => [, , ...coordinates(...flatten(a, b)).slice(0, 2)]
  .forEach((value, i) => el.setAttribute(attributes.rect[i], value));

export default {
  rect: {
    args: (a, b, c, d) => {
      const coords = coordinates(...flatten(a, b, c, d)).slice(0, 4);

      // can handle negative widths and heights
      [0, 1].filter(i => coords[i] < 0).forEach((i) => {
        coords[2 + i] += coords[i];
        coords[i] = -coords[i];
      });
      return coords;
    },
    methods: {
      origin: setOrigin,
      setOrigin,
      center: setOrigin,
      setCenter: setOrigin,
      size: setSize,
      setSize,
    }
  }
};
