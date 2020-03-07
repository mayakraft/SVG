/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";

/**
 * use flatten() everytime you call this!
 * it's necessary the entries sit at the top level of ...args
 * findCoordinates(...flatten(...args));
 */
export default (...args) => {
  const numbers = args.filter(a => typeof a === K.number);
  if (numbers.length) {
    return numbers;
  }
  const objects = args.filter(a => typeof a === K.object);
  const map = objects.map(el => {
    if (typeof el.x === K.number) return [el.x, el.y];
    if (typeof el[0] === K.number) return [el[0], el[1]];
    return undefined;
  });
  return map.filter(a => a !== undefined).reduce((a, b) => a.concat(b), []);
};
