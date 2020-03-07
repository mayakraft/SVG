/**
 * SVG (c) Robby Kraft
 */

import cdata from "../../environment/cdata";
import K from "../../environment/keys";
// import Controls from "../../events/controls";
import DOM from "../dom/dom";
import {
  getViewBox,
  setViewBox
} from "../view/viewBox";
import Load from "../../file/load";
import Save from "../../file/save";

// i prevented circular dependency by passing a pointer to the constructor/prepare
// throught 'this', every function is bound.

const BACKGROUND_CLASS = "svg-background-rectangle";

const getFrame = function (element) {
  const viewBox = getViewBox(element);
  if (viewBox !== undefined) {
    return viewBox;
  }
  if (typeof element.getBoundingClientRect === K.function) {
    const rr = element.getBoundingClientRect();
    return [rr.x, rr.y, rr.width, rr.height];
  }
  return Array(4).fill(undefined);
};


const background = function (element, color, paintOverflow = false) {
  if (paintOverflow === true) {
    const parent = element.parentElement;
    if (parent != null) {
      parent.setAttribute("background-color", color);
    }
  }
  let backRect = Array.from(element.childNodes)
    .filter(child => child.getAttribute(K.class) === BACKGROUND_CLASS)
    .shift();
  if (backRect == null) {
    backRect = this.Prepare(this.Constructor("rect", ...getFrame(element)));
    backRect.setAttribute(K.class, BACKGROUND_CLASS);
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
    styleSection = this.Prepare(this.Constructor(K.style));
    element.insertBefore(styleSection, element.firstChild);
  }
  styleSection.textContent = ""; 
  styleSection.appendChild(cdata(textContent));
  return styleSection;
};

const replaceWithSVG = function (oldSVG, newSVG) {
  if (newSVG == null) { return; }
  // Part 1: reset old SVG
  // a. clear attributes
  Array.from(oldSVG.attributes)
    .forEach(attr => oldSVG.removeAttribute(attr.name));
  // b. clear contents
  DOM.removeChildren(oldSVG);
  // Part 2: copy contents over
  Array.from(newSVG.childNodes).forEach((node) => {
    newSVG.removeChild(node);
    oldSVG.appendChild(node);
  });
  Array.from(newSVG.attributes)
    .forEach(attr => oldSVG.setAttribute(attr.name, attr.value));
};

// these will end up as methods on the <svg> nodes
const methods = { };

/*
methods.getWidth = function (element) { return getFrame(element)[2]; }
methods.getHeight = function (element) { return getFrame(element)[3]; }
methods.size = function (...args) { return setSize(...args); }
methods.background = function (...args) { return background.call(this, ...args); }
methods.stylesheet = function (...args) { return stylesheet.call(this, ...args); }
// methods.controls = (element, ...args) => Controls(element, ...args);

methods.save = Save;
methods.load = (element, ...args) => replaceWithSVG(element, Load(...args));
// methods.load = function (element, data, callback) {
//   return Load(data, (svg, error) => {
//     if (svg != null) { replaceWithSVG(element, svg); }
//     if (callback != null) { callback(element, error); }
//   });
// };
*/

export default methods;
