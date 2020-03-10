/**
 * SVG (c) Robby Kraft
 */

import K from "../environment/keys";

// assuming people will at most supply coordinate (x,y,z) and text
export default (element, a, b, c, d) => {
  const text = [a,b,c,d].filter(a => typeof a === K.string).shift();
  if (text) {
    element.innerHTML = text;
  }
};
