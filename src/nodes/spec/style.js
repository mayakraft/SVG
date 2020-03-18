/**
 * SVG (c) Robby Kraft
 */

import cdata from "../../environment/cdata";

export default {
  style: {
    methods: {
      setTextContent: (el, text) => {
        el.textContent = "";
        el.appendChild(cdata(text));
      }
    }
  }
};
