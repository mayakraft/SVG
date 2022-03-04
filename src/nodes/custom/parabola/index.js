/**
 * SVG (c) Robby Kraft
 */
import args from "./arguments";
import * as S from "../../../environment/strings";

export default {
  parabola: {
    nodeName: "polyline",
    attributes: [S.str_points],
    args: args
  }
};
