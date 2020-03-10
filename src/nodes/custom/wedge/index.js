/**
 * SVG (c) Robby Kraft
 */

import arcPath from "../arc/arcPath";

const wedgeArguments = (a, b, c, d, e) => arcPath(a, b, c, d, e, true);

export default {
  name: "wedge",
  tagName: "path",
  arguments: wedgeArguments,
  methods: {
    setArc: (el, ...args) => el.setAttribute("d", wedgeArguments(...args)),
  }
};
