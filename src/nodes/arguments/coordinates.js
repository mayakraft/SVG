/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";

/**
 * for best results, call this having already called flatten()
 * findCoordinates(...flatten(...args));
 */
const findCoordinates = function (...args) {
  const numbers = args.filter(a => typeof a === K.number);
  if (numbers.length) {
    return numbers;
  }
  const objects = args.filter(a => typeof a === K.object);
  const coordsXY = objects.filter(a => typeof a.x === K.number);
  if (coordsXY.length) {
    return coordsXY.map(el => [el.x, el.y]).reduce((a, b) => a.concat(b), []);
  }
  const coordsArray = objects.filter(a => typeof a[0] === K.number);
  if (coordsArray.length) {
    return coordsArray.map(el => [el[0], el[1]]).reduce((a, b) => a.concat(b), []);
  }
  return [];
};

export default findCoordinates;
