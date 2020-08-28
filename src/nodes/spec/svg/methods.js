/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
import cdata from "../../../environment/cdata";
import DOM from "../../../methods/dom";
import Save from "../../../file/save";
import { clear, loadHelper } from "./loadHelper";
import { getViewBox, setViewBox } from "../../../methods/viewBox";

const getFrame = function (element) {
  const viewBox = getViewBox(element);
  if (viewBox !== undefined) {
    return viewBox;
  }
  if (typeof element.getBoundingClientRect === K.function) {
    const rr = element.getBoundingClientRect();
    return [rr.x, rr.y, rr.width, rr.height];
  }
  // return Array(4).fill(undefined);
  return [];
};

const bgClass = "svg-background-rectangle";

// i prevented circular dependency by passing a pointer to Constructor through 'this'
// every function is bound
const background = function (element, color) {
  let backRect = Array.from(element.childNodes)
    .filter(child => child.getAttribute(K.class) === bgClass)
    .shift();
  if (backRect == null) {
    backRect = this.Constructor("rect", ...getFrame(element));
    backRect.setAttribute(K.class, bgClass);
    element.insertBefore(backRect, element.firstChild);
  }
  backRect.setAttribute("fill", color);
  return backRect;
};

const findStyleSheet = function (element) {
  const styles = element.getElementsByTagName(K.style);
  return styles.length === 0 ? undefined : styles[0];
};

const stylesheet = function (element, textContent) {
  let styleSection = findStyleSheet(element);
  if (styleSection == null) {
    styleSection = this.Constructor(K.style);
    element.insertBefore(styleSection, element.firstChild);
  }
  styleSection.textContent = "";
  styleSection.appendChild(cdata(textContent));
  return styleSection;
};

// these will end up as methods on the <svg> nodes
export default {
  clear,
  size: setViewBox,
  setViewBox,
  background,
  getWidth: el => getFrame(el)[2],
  getHeight: el => getFrame(el)[3],
  stylesheet: function (el, text) { return stylesheet.call(this, el, text); },
  load: loadHelper,
  save: Save,
};

// svg.load = function (element, data, callback) {
//   return Load(data, (svg, error) => {
//     if (svg != null) { replaceSVG(element, svg); }
//     if (callback != null) { callback(element, error); }
//   });
// };
