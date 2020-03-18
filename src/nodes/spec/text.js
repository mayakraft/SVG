/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import K from "../../environment/keys";

export default {
  text: {
    // assuming people will at most supply coordinate (x,y,z) and text
    args: (a, b, c) => coordinates(...flatten(a, b, c)).slice(0, 2),
    init: (element, a, b, c, d) => {
      const text = [a,b,c,d].filter(a => typeof a === K.string).shift();
      if (text) {
        element.innerHTML = text;
      }
    }
  }
};
