/**
 * SVG (c) Robby Kraft
 */

import args from "./arguments";
import methods from "./methods";

export default {
  curve: {
    nodeName: "path",
    attributes: ["d"],
    args: args,  // one function
    methods: methods  // object of functions
  }
};
