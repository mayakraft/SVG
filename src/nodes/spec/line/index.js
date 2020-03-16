/**
 * SVG (c) Robby Kraft
 */

import args from "./arguments";
import * as methods from "./methods";
import attributes from "../../../attributes/singleElements";

export default {
  // name: "line",
  nodeName: "line",
  attributes: attributes.line,
  arguments: args,  // one function
  methods: methods  // object of functions
};
