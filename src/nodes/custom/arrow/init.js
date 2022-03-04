/**
 * SVG (c) Robby Kraft
 */
import * as S from "../../../environment/strings";
import window from "../../../environment/window";
import svgNS from "../../../environment/namespace";
import ArrowMethods from "./methods";
import { makeArrowOptions } from "./options";
import Library from "../../../library";

const arrowKeys = Object.keys(makeArrowOptions());

const matchingOptions = (...args) => {
  for (let a = 0; a < args.length; a++) {
    if (typeof args[a] !== S.str_object) { continue; }
    const keys = Object.keys(args[a]);
    for (let i = 0; i < keys.length; i++) {
      if (arrowKeys.includes(keys[i])) {
        return args[a];
      }
    }
  }
};

const init = function (element, ...args) {
  element.setAttribute(S.str_class, S.str_arrow);
  const paths = ["line", S.str_tail, S.str_head]
    .map(key => Library.path().setClass(`${S.str_arrow}-${key}`).appendTo(element));
  paths[0].setAttribute(S.str_style, "fill:none;");
  paths[1].setAttribute(S.str_stroke, S.str_none);
  paths[2].setAttribute(S.str_stroke, S.str_none);
  element.options = makeArrowOptions();
  ArrowMethods.setPoints(element, ...args);
  const options = matchingOptions(...args);
  if (options) {
    Object.keys(options)
      .filter(key => ArrowMethods[key])
      .forEach(key => ArrowMethods[key](element, options[key]));
  }
  return element;
};

export default init;
