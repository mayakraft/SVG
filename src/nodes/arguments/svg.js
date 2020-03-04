/**
 * SVG (c) Robby Kraft
 */

import window from "../../environment/window";
import { setViewBox } from "../../methods/viewBox";
// import Events from "../../events/index";
// import Globalize from "../../environment/globalize";

const ElementConstructor = (new window.DOMParser())
  .parseFromString("<div />", "text/xml").documentElement.constructor;

const svgArguments = function (element, ...args) {
  const numbers = args.filter(arg => !isNaN(arg) && arg.constructor !== Array);
  switch (numbers.length) {
    case 4: setViewBox(element, numbers[0], numbers[1], numbers[2], numbers[3]);
    case 2: setViewBox(element, 0, 0, numbers[0], numbers[1]);
    default: break;
  }
  const parent = args.filter(arg => arg instanceof ElementConstructor).shift();
  if (parent != null && typeof parent.appendChild === "function") {
    parent.appendChild(element);
  }
  // Events(element);
  return element;
};

export default svgArguments;
