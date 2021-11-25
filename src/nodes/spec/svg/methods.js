/**
 * SVG (c) Robby Kraft
 */
import * as K from "../../../environment/keys";
import cdata from "../../../environment/cdata";
import { clearSVG, assignSVG } from "../../../methods/dom";
import Load from "../../../file/load";
import Save from "../../../file/save";
import { getViewBox, setViewBox } from "../../../methods/viewBox";

// check if the loader is running synchronously or asynchronously
export const loadSVG = (target, data) => {
  const result = Load(data);
  if (result == null) { return; }
  return (typeof result.then === K._function)
    ? result.then(svg => assignSVG(target, svg))
    : assignSVG(target, result);
};

const getFrame = function (element) {
  const viewBox = getViewBox(element);
  if (viewBox !== undefined) {
    return viewBox;
  }
  if (typeof element.getBoundingClientRect === K._function) {
    const rr = element.getBoundingClientRect();
    return [rr.x, rr.y, rr.width, rr.height];
  }
  // return Array(4).fill(undefined);
  return [];
};

const setPadding = function (element, padding) {
  const viewBox = getViewBox(element);
  if (viewBox !== undefined) {
    setViewBox(element, ...[-padding, -padding, padding * 2, padding * 2]
      .map((nudge, i) => viewBox[i] + nudge));
  }
  return element;
};

const bgClass = "svg-background-rectangle";

// i prevented circular dependency by passing a pointer to Constructor through 'this'
// every function is bound
const background = function (element, color) {
  let backRect = Array.from(element.childNodes)
    .filter(child => child.getAttribute(K._class) === bgClass)
    .shift();
  if (backRect == null) {
    backRect = this.Constructor("rect", ...getFrame(element));
    backRect.setAttribute(K._class, bgClass);
    backRect.setAttribute(K._stroke, K._none);
		element.insertBefore(backRect, element.firstChild);
  }
  backRect.setAttribute(K._fill, color);
  return element;
};

const findStyleSheet = function (element) {
  const styles = element.getElementsByTagName(K._style);
  return styles.length === 0 ? undefined : styles[0];
};

const stylesheet = function (element, textContent) {
  let styleSection = findStyleSheet(element);
  if (styleSection == null) {
    styleSection = this.Constructor(K._style);
    element.insertBefore(styleSection, element.firstChild);
  }
  styleSection.textContent = "";
  styleSection.appendChild(cdata(textContent));
  return styleSection;
};

// these will end up as methods on the <svg> nodes
export default {
  clear: clearSVG,
  size: setViewBox,
  setViewBox,
  getViewBox,
  padding: setPadding,
  background,
  getWidth: el => getFrame(el)[2],
  getHeight: el => getFrame(el)[3],
  stylesheet: function (el, text) { return stylesheet.call(this, el, text); },
  load: loadSVG,
  save: Save,
};

// svg.load = function (element, data, callback) {
//   return Load(data, (svg, error) => {
//     if (svg != null) { replaceSVG(element, svg); }
//     if (callback != null) { callback(element, error); }
//   });
// };
