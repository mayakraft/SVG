/**
 * SVG (c) Robby Kraft
 */

import arcPath from "./arcPath";

const arcArguments = (a, b, c, d, e) => arcPath(a, b, c, d, e, false);

export default {
  name: "arc",
  tagName: "path",
  arguments: arcArguments,
  methods: {
    setArc: (el, ...args) => el.setAttribute("d", arcArguments(...args)),
  }
};
