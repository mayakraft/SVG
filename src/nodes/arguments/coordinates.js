/**
 * SVG (c) Robby Kraft
 */

/**
 * for best results, call this having already called flatten()
 * findCoordinates(...flatten(...args));
 */
const findCoordinates = function (...args) {
  const numbers = args.filter(a => typeof a === "number");
  if (numbers.length) {
    return numbers;
  }
  const coords = args.filter(a => typeof a === "object" && typeof a.x === "number");
  if (coords.length) {
    return coords.map(el => [el.x, el.y]).reduce((a, b) => a.concat(b), []);
  }
  return [];
};

export default findCoordinates;
