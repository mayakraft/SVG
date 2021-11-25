/**
 * SVG (c) Robby Kraft
 */
import arcPath from "../arc/arcPath";
import * as K from "../../../environment/keys";

const wedgeArguments = (a, b, c, d, e) => [arcPath(a, b, c, d, e, true)];

export default {
  wedge: {
    nodeName: K._path,
    args: wedgeArguments,
    attributes: ["d"],
    methods: {
      setArc: (el, ...args) => el.setAttribute("d", wedgeArguments(...args)),
    }
  }
};
