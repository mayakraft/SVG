/**
 * SVG (c) Robby Kraft
 */

import args from "./arguments";
import * as methods from "./methods";
import init from "./init";

export default {
  arrow: {
    nodeName: "g",
    attributes: ["d"],
    args: args,  // one function
    methods: methods,  // object of functions
    init: init,
  }
};
