/**
 * SVG (c) Robby Kraft
 */

import K from "../environment/keys";

/**
 * this will extract coordinates from a set of inputs
 * and present them as a stride-2 flat array. length % 2 === 0
 * a 1D array of numbers, alternating x y
 * 
 * use flatten() everytime you call this!
 * it's necessary the entries sit at the top level of ...args
 * findCoordinates(...flatten(...args));
 */
export default (...args) => {
  // [top-level numbers] concat [{x:,y:} and [0,1]] style
  return args.filter(a => typeof a === K.number)
    .concat(
      args.filter(a => typeof a === K.object)
      .map(el => {
        if (typeof el.x === K.number) return [el.x, el.y];
        if (typeof el[0] === K.number) return [el[0], el[1]];
        return undefined;
      }).filter(a => a !== undefined)
      .reduce((a, b) => a.concat(b), [])
    );
};
