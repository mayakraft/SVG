/**
 * SVG (c) Robby Kraft
 */
import flatten from "../../../arguments/flatten";
import coordinates from "../../../arguments/coordinates";
import makeCurvePath from "./makeCurvePath";
import getCurveEndpoints from "./getCurveEndpoints";

const setPoints = (element, ...args) => {
  const coords = coordinates(...flatten(...args)).slice(0, 4);
  element.setAttribute("d", makeCurvePath(coords, element._bend, element._pinch));
  return element;
};

const bend = (element, amount) => {
  element._bend = amount;
  return setPoints(element, ...getCurveEndpoints(element.getAttribute("d")));
};

const pinch = (element, amount) => {
  element._pinch = amount;
  return setPoints(element, ...getCurveEndpoints(element.getAttribute("d")));
};

export default {
  setPoints,
  bend,
  pinch,
};
