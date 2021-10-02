/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
import flatten from "../../../arguments/flatten";
import coordinates from "../../../arguments/coordinates";
import makeCurvePath from "./makeCurvePath";

const curveArguments = (...args) => [
  makeCurvePath(coordinates(...flatten(...args)))
];

export default curveArguments;
