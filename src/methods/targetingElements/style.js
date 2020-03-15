/**
 * SVG (c) Robby Kraft
 */

import cdata from "../../environment/cdata";

export default {
  style: {
    setTextContent: (el, text) => {
      el.textContent = "";
      el.appendChild(cdata(text));
    }
  }
};
