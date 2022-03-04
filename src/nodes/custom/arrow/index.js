/**
 * SVG (c) Robby Kraft
 */
import ArrowMethods from "./methods";
import init from "./init";

export default {
  arrow: {
    nodeName: "g",
    attributes: [],
    args: () => [],  // one function
    methods: ArrowMethods,  // object of functions
    init,
  }
};
