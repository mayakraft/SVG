/**
 * SVG (c) Robby Kraft
 */

const polyString = function () {
  return Array
    .from(Array(Math.floor(arguments.length / 2)))
    .map((_, i) => `${arguments[i*2+0]},${arguments[i*2+1]}`)
    .join(" ");
}

const polys = (...args) => [polyString(...coordinates(...flatten(...args)))];

export default {
  polygon: {
    args: polys,
  }
};
