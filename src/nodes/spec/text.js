/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import K from "../../environment/keys";

// assuming people will at most supply coordinate (x,y,z) and text

  // text: (...args) => coordinates(...flatten(...args)).slice(0, 2),

export default {
  text: {
    args: (a, b, c) => coordinates(...flatten(a, b, c)).slice(0, 2),
    init: (element, a, b, c, d) => {
      const text = [a,b,c,d].filter(a => typeof a === K.string).shift();
      if (text) {
        element.innerHTML = text;
      }
    }
  }
};
