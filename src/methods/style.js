/**
 * SVG (c) Robby Kraft
 */

import cdata from "../environment/cdata";

export default {
  setTextContent: (el, text) => {
    el.textContent = "";
    el.appendChild(cdata(text));
    return el;
  }
};
