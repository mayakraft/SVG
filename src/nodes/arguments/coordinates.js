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
  const objects = args.filter(a => typeof a === "object");
  const coordsXY = objects.filter(a => typeof a.x === "number");
  if (coordsXY.length) {
    return coordsXY.map(el => [el.x, el.y]).reduce((a, b) => a.concat(b), []);
  }
  const coordsArray = objects.filter(a => typeof a[0] === "number");
  if (coordsArray.length) {
    return coordsArray.map(el => [el[0], el[1]]).reduce((a, b) => a.concat(b), []);
  }
  return [];
};

export default findCoordinates;
