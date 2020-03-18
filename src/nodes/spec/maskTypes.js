/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";
import UUID from "../../arguments/uuid";
import { setViewBox } from "../../methods/viewBox";

const makeIDString = function () {
  return Array.from(arguments)
    .filter(a => typeof a === K.string || a instanceof String)
    .shift() || UUID();
};

const args = (...args) => [makeIDString(...args)];

export default {
  mask: { args: args },
  clipPath: { args: args },
  symbol: { args: args },
  marker: {
    args: args,
    methods: {
      size: setViewBox,
      setViewBox: setViewBox
    }
  },
};
