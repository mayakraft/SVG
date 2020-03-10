/**
 * SVG (c) Robby Kraft
 */

import flatten from "./flatten";
import coordinates from "./coordinates";

const viewBoxString = function (x, y, width, height, padding) {
  if (padding == null) { padding = 0; }
  const scale = 1.0;
  const d = (width / scale) - width;
  const X = (x - d) - padding;
  const Y = (y - d) - padding;
  const W = (width + d * 2) + padding * 2;
  const H = (height + d * 2) + padding * 2;
  return [X, Y, W, H].join(" ");
}

export default (...args) => {
  const numbers = coordinates(...flatten(...args));
  if (numbers.length === 2) { numbers.unshift(0, 0); }
  return numbers.length === 4 ? viewBoxString(...numbers) : undefined;
};
