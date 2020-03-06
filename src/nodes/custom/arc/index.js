/**
 * SVG (c) Robby Kraft
 */

const arcArguments = (a, b, c, d, e) => arcPath(a, b, c, d, e, false);

export default {
  name: "arc",
  tagName: "path",
  arguments: arcArguments
};
