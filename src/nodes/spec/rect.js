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
    args: (a, b, c, d) => {
      const coords = coordinates(...flatten(a, b, c, d)).slice(0, 4);
      // can handle negative widths and heights
      if (coords.length > 3) {
        [0, 1].filter(i => coords[2+i] < 0).forEach(i => {
          coords[i] += coords[2+i];
          coords[2+i] = -coords[2+i];
        });
      }
      return coords;
    },
  }
};
