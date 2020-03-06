/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";

const UUID = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

const nonVisibleArguments = function (element, ...args) {
  const idString = args
    .filter(a => typeof a === K.string || a instanceof String)
    .shift();
  element.setAttribute(K.id, (idString != null ? idString : UUID()));
  return element;
};

export default nonVisibleArguments;
