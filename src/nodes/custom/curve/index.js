/**
 * SVG (c) Robby Kraft
 */

import args from "./arguments";
import * as methods from "./methods";

export default {
  name: "curve",
  nodeName: "path",
  attributes: ["d"],
  arguments: args,  // one function
  methods: methods  // object of functions
};
