/**
 * SVG (c) Robby Kraft
 */

import args from "./arguments";
import * as methods from "./methods";
import init from "./init";

export default {
  name: "arrow",
  nodeName: "g",
  attributes: ["d"],
  arguments: args,  // one function
  methods: methods,  // object of functions
  init: init,
};
