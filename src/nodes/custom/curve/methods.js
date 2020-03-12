/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
import Args from "./arguments";

// use regex to match , or space
const getEndpoints = (element) => {
  const d = element.getAttribute("d");
  if (d == null || d === "") { return []; }
  return [
    d.slice(d.indexOf("M")+1, d.indexOf("C")).split(","),
    d.split(" ").pop().split(",")
  ].map(p => p.map(n => parseFloat(n)));
};

// export const setPoints = (element, ...args) {
//   const params = coordinates(...flatten(...args))
// }

export const bend = (element, amount) => {
  element.setAttribute("d", Args(...getEndpoints(element), amount));
  return element;
};
