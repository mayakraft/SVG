/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";
import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";

const getPoints = (el) => {
  const attr = el.getAttribute("points");
  return (attr == null) ? "" : attr;
};

const polyString = function () {
  return Array
    .from(Array(Math.floor(arguments.length / 2)))
    .map((_, i) => `${arguments[i * 2 + 0]},${arguments[i * 2 + 1]}`)
    .join(" ");
};

const stringifyArgs = (...args) => [polyString(...coordinates(...flatten(...args)))];

const setPoints = (element, ...args) => element
  .setAttribute("points", stringifyArgs(...args)[0]);

const addPoint = (element, ...args) => element
  .setAttribute("points", [getPoints(element), stringifyArgs(...args)[0]].filter(a => a !== "").join(" "));

// this should be improved
// right now the special case is if there is only 1 argument and it's a string
// it should be able to take strings or numbers at any point,
// converting the strings to coordinates
const Args = function (...args) {
  return args.length === 1 && typeof args[0] === K.string
    ? [args[0]]
    : stringifyArgs(...args);
};

export default {
  polyline: {
    args: Args,
    methods: {
      setPoints,
      addPoint
    }
  },
  polygon: {
    args: Args,
    methods: {
      setPoints,
      addPoint
    }
  }
};
