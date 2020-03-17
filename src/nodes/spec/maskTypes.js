/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";
import UUID from "../../arguments/uuid";

const makeIDString = function () {
  return Array.from(arguments)
    .filter(a => typeof a === K.string || a instanceof String)
    .shift() || UUID();
};

const maskTypes = {
  args: (...args) => [makeIDString(...args)]
};

export default {
  mask: maskTypes,
  clipPath: maskTypes,
  symbol: maskTypes,
  marker: maskTypes,
};
