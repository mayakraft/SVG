import flatten from "../arguments/flatten";
import coordinates from "../arguments/coordinates";

const lineAttr = ["x1", "y1", "x2", "y2"];
const circleAttr = ["cx", "cy"];

// const pointType = el => {
//   if (typeof el === "number") { return "number"; }
//   if (typeof el.x === "number") { return "object"; }
//   if (typeof el[0] === "number") { return "array"; }
// };

/**
 * before calling this, call flatten and coordinates
 * this is assuming that the array is a flat span:2 coordinates
 * with typeof pointsArray[0] equal to number
 */
const pointsString = function (...points) {
  return Array.from(Array(Math.floor(points.length / 2)))
    .map((_, i) => `${points[i * 2]},${points[i * 2 + 1]}`).join(" ");
};

export const setPoints = function (el, ...args) {
  el.setAttribute("d", pointsString(...coordinates(...flatten(...args))));
  return el;
};

export const setLinePoints = function (el, ...args) {
  coordinates(...flatten(...args)).slice(0, lineAttr.length)
    .forEach((n, i) => el.setAttribute(lineAttr[i], n));
  return el;
};

export const setRadius = (el, r) => {
  el.setAttribute("r", r);
  return el;
};

export const setCenter = function (el, ...args) {
  coordinates(...flatten(...args)).slice(0, circleAttr.length)
    .forEach((n, i) => el.setAttribute(circleAttr[i], n));
  return el;
};
