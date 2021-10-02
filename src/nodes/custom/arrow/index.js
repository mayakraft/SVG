/**
 * SVG (c) Robby Kraft
 */

import methods from "./methods";
import init from "./init";

export default {
  arrow: {
    nodeName: "g",
    attributes: [],
    args: () => [],  // one function
    methods,  // object of functions
    init,
  }
};
