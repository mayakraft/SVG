/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";

const getPoints = el => {
  const attr = el.getAttribute("points");
  return (attr == null) ? "" : attr;
};

const polyString = function () {
  return Array
    .from(Array(Math.floor(arguments.length / 2)))
    .map((_, i) => `${arguments[i*2+0]},${arguments[i*2+1]}`)
    .join(" ");
}

const stringifyArgs = (...args) => [polyString(...coordinates(...flatten(...args)))];

const setPoints = (element, ...args) => element
  .setAttribute("points", stringifyArgs(...args)[0]);

const addPoint = (element, ...args) => element
  .setAttribute("points", [getPoints(element), stringifyArgs(...args)[0]].filter(a => a !== "").join(" "));

export default {
  polyline: {
    args: stringifyArgs,
    methods: {
      setPoints,
      addPoint
    }
  },
  polygon: {
    args: stringifyArgs,
    methods: {
      setPoints,
      addPoint
    }
  }
};
