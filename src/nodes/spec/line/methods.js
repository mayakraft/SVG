/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
import Args from "./arguments";
import attributes from "../../../attributes/singleElements";

export const setPoints = (element, a,b,c,d) => Args(a,b,c,d)
  .forEach((value, i) => element.setAttribute(attributes.line[i], value));
