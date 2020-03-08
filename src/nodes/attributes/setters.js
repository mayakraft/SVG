/**
 * SVG (c) Robby Kraft
 */

import flatten from "../arguments/flatten";
import coordinates from "../arguments/coordinates";
import attributes from "../attributes";

const pointsString = (...points) => {
  return Array.from(Array(Math.floor(points.length / 2)))
    .map((_, i) => `${points[i * 2]},${points[i * 2 + 1]}`).join(" ");
};

const polys = {
  setPoints: {
    a: attributes.polyline.shift(),
    f: (...args) => pointsString(...coordinates(...flatten(...args)))
  }
};

export default {
  line: {
    setPoints: {
      b: attributes.line,
      f: (a,b,c,d) => coordinates(...flatten(a, b, c, d)).slice(0, 4)
    },
  },
  polyline: polys,
  polygon: polys,
  circle: {
    setRadius: { a: "r", f: r => r },
    radius: { a: "r", f: r => r },
    setCenter: {
      b: attributes.circle.slice(0, 2),
      f: (a,b) => coordinates(...flatten(a, b)).slice(0, 2)
    },
  },
};
