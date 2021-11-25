/**
 * SVG (c) Robby Kraft
 */
import args from "./arguments";
import methods from "./methods";
import * as K from "../../../environment/keys";

export default {
  curve: {
    nodeName: K._path,
    attributes: ["d"],
    args,  // one function
    methods  // object of functions
  }
};
