/**
 * SVG (c) Robby Kraft
 */

import vkXML from "../../../include/vkbeautify-xml";
import window from "../../environment/window";
import cdata from "../../environment/cdata";
import K from "../../environment/keys";
// import Controls from "../../events/controls";
import DOM from "../dom";
import Load from "../../file/load";
import Save from "../../file/save";
import flatten from "../../arguments/flatten";
import coordinates from "../../arguments/coordinates";

import { getViewBox, setViewBox } from "../viewBox";

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

const clear = function (element) {
  Array.from(element.attributes)
    .filter(a => a !== "xmlns")
    .forEach(attr => element.removeAttribute(attr.name));
  DOM.removeChildren(element);
};

const assignSVG = function (target, source) {
  if (source == null) { return; }
  clear(target);
  Array.from(source.childNodes).forEach((node) => {
    source.removeChild(node);
    target.appendChild(node);
  });
  Array.from(source.attributes)
    .forEach(attr => target.setAttribute(attr.name, attr.value));
};


const done = (svg, callback) => {
  if (callback != null) { callback(svg); }
  return svg;
};

const load = function (input, callback) {
  if (typeof input === K.string || input instanceof String) {
    const xml = (new window.DOMParser()).parseFromString(input, "text/xml");
    const parserErrors = xml.getElementsByTagName("parsererror");
    return (parserErrors.length === 0)
      ? done(xml.documentElement, callback)
      : parserErrors[0];
  }
  if (input.childNodes != null) {
    return done(input, callback);
  }
};

// set the viewbox size
// "size" refers viewbox whenever possible
// size on the DOM, the "width" attribute, you can handle it yourself

// these will end up as methods on the <svg> nodes
const svg = {
  clear: clear,
  size: setViewBox,
  // setViewBox: setViewBox,
  background: background,
  getWidth: el => getFrame(el)[2],
  getHeight: el => getFrame(el)[3],
  stylesheet: function (text) { return stylesheet.call(this, text); },
  save: (el, options = {}) => (options.output === "svg"
  //   ? el : vkXML((new window.XMLSerializer()).serializeToString(el))),
    ? el : (new window.XMLSerializer()).serializeToString(el)),
  load: (el, data, callback) => assignSVG(el, load(data, callback)),
};


/*
svg.getWidth = function (element) { return getFrame(element)[2]; }
svg.getHeight = function (element) { return getFrame(element)[3]; }
svg.size = function (...args) { return setSize(...args); }
svg.background = function (...args) { return background.call(this, ...args); }
svg.stylesheet = function (...args) { return stylesheet.call(this, ...args); }
// svg.controls = (element, ...args) => Controls(element, ...args);

svg.save = Save;
svg.load = (element, ...args) => assignSVG(element, Load(...args));
// svg.load = function (element, data, callback) {
//   return Load(data, (svg, error) => {
//     if (svg != null) { assignSVG(element, svg); }
//     if (callback != null) { callback(element, error); }
//   });
// };
*/

export default svg;
