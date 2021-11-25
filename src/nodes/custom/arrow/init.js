/**
 * SVG (c) Robby Kraft
 */
import * as K from "../../../environment/keys";
import window from "../../../environment/window";
import svgNS from "../../../environment/namespace";
import Methods from "./methods";
import { makeArrowOptions } from "./options";
import Library from "../../../library";

const arrowKeys = Object.keys(makeArrowOptions());

const matchingOptions = (...args) => {
  for (let a = 0; a < args.length; a++) {
    if (typeof args[a] !== K._object) { continue; }
    const keys = Object.keys(args[a]);
    for (let i = 0; i < keys.length; i++) {
      if (arrowKeys.includes(keys[i])) {
        return args[a];
      }
    }
  }
};

const init = function (element, ...args) {
  element.setAttribute(K._class, K._arrow);
  const paths = ["line", K._tail, K._head]
    .map(key => Library.path().setClass(`${K._arrow}-${key}`).appendTo(element));
  paths[0].setAttribute(K._style, "fill:none;");
  paths[1].setAttribute(K._stroke, K._none);
  paths[2].setAttribute(K._stroke, K._none);
  element.options = makeArrowOptions();
  Methods.setPoints(element, ...args);
  const options = matchingOptions(...args);
  if (options) {
    Object.keys(options)
      .filter(key => Methods[key])
      .forEach(key => Methods[key](element, options[key]));
  }
  return element;
};

export default init;
