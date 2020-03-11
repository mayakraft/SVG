/**
 * SVG (c) Robby Kraft
 */

import arcPath from "../arc/arcPath";

const wedgeArguments = (a, b, c, d, e) => [arcPath(a, b, c, d, e, true)];

export default {
  name: "wedge",
  nodeName: "path",
  arguments: wedgeArguments,
  attributes: ["d"],
  methods: {
    setArc: (el, ...args) => el.setAttribute("d", wedgeArguments(...args)),
  }
};
