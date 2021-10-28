/**
 * SVG (c) Robby Kraft
 */
import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";

const setRectSize = (el, rx, ry) => {
  [, , rx, ry]
    .forEach((value, i) => el.setAttribute(attributes.rect[i], value));
  return el;
};

const setRectOrigin = (el, a, b) => {
  [...coordinates(...flatten(a, b)).slice(0, 2)]
    .forEach((value, i) => el.setAttribute(attributes.rect[i], value));
  return el;
};

// can handle negative widths and heights
const fixNegatives = function (arr) {
  [0, 1].forEach(i => {
    if (arr[2 + i] < 0) {
      if (arr[0 + i] === undefined) { arr[0 + i] = 0; }
      arr[0 + i] += arr[2 + i];
      arr[2 + i] = -arr[2 + i];
    }
  });
  return arr;
};

export default {
  rect: {
    args: (a, b, c, d) => {
      const coords = coordinates(...flatten(a, b, c, d)).slice(0, 4);
      switch (coords.length) {
        case 0: case 1: case 2: case 3: return fixNegatives([, , ...coords]);
        default: return fixNegatives(coords);
      }
    },
    methods: {
      origin: setRectOrigin,
      setOrigin: setRectOrigin,
      center: setRectOrigin,
      setCenter: setRectOrigin,
      size: setRectSize,
      setSize: setRectSize,
    }
  }
};
