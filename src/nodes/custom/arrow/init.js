/**
 * SVG (c) Robby Kraft
 */

import window from "../../../environment/window";
import svgNS from "../../../environment/namespace";
import Methods from "./methods";
import Library from "../../../library";

const endOptions = () => ({
  visible: false,
  width: 8,
  height: 10,
  padding: 0.0,
});

const init = function (element, ...args) {
  element.setAttribute("class", "arrow");
  const paths = ["line", "tail", "head"]
    .map(key => Library.path().setClass(`arrow-${key}`).appendTo(element));
  paths[0].setAttribute("style", "fill:none;");
  element.options = {
    head: endOptions(),
    tail: endOptions(),
    bend: 0.0,
    pinch: 0.618,
    endpoints: [],
  };
  Methods.setPoints(element, ...args);
  return element;
};

export default init;
