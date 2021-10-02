/**
 * SVG (c) Robby Kraft
 */

import args from "./arguments";
import methods from "./methods";

export default {
  curve: {
    nodeName: "path",
    attributes: ["d"],
    args,  // one function
    methods  // object of functions
  }
};
