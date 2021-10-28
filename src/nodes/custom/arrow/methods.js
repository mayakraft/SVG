/**
 * SVG (c) Robby Kraft
 */
import * as K from "../../../environment/keys";
import Case from "../../../arguments/case";
import flatten from "../../../arguments/flatten";
import coordinates from "../../../arguments/coordinates";
import makeArrowPaths from "./makeArrowPaths";

// end is "head" or "tail"
const setArrowheadOptions = (element, options, which) => {
  if (typeof options === K.boolean) {
    element.options[which].visible = options;
  } else if (typeof options === K.object) {
    Object.assign(element.options[which], options);
    if (options.visible == null) {
      element.options[which].visible = true;
    }
  } else if (options == null) {
    element.options[which].visible = true;
  }
};

const setArrowStyle = (element, options = {}, which) => {
  const path = element.getElementsByClassName(`${K.arrow}-${which}`)[0];
  Object.keys(options)
    .map(key => ({ key, fn: path[Case.toCamel(key)] }))
    .filter(el => typeof el.fn === K._function)
    .forEach(el => el.fn(options[el.key]));
};

const redraw = (element) => {
  const paths = makeArrowPaths(element.options);
  Object.keys(paths)
    .map(path => ({
      path,
      element: element.getElementsByClassName(`${K.arrow}-${path}`)[0]
    }))
    .filter(el => el.element)
    .map(el => { el.element.setAttribute("d", paths[el.path]); return el; })
    .filter(el => element.options[el.path])
    .forEach(el => el.element.setAttribute(
      "visibility",
      element.options[el.path].visible
        ? "visible"
        : "hidden"));
  return element;
};

const setPoints = (element, ...args) => {
  element.options.points = coordinates(...flatten(...args)).slice(0, 4);
  return redraw(element);
};

const bend = (element, amount) => {
  element.options.bend = amount;
  return redraw(element);
};

const pinch = (element, amount) => {
  element.options.pinch = amount;
  return redraw(element);
};

const padding = (element, amount) => {
  element.options.padding = amount;
  return redraw(element);
};

const head = (element, options) => {
  setArrowheadOptions(element, options, K.head);
  setArrowStyle(element, options, K.head);
  return redraw(element);
};

const tail = (element, options) => {
  setArrowheadOptions(element, options, K.tail);
  setArrowStyle(element, options, K.tail);
  return redraw(element);
};

const getLine = element => element.getElementsByClassName(`${K.arrow}-line`)[0];
const getHead = element => element.getElementsByClassName(`${K.arrow}-${K.head}`)[0];
const getTail = element => element.getElementsByClassName(`${K.arrow}-${K.tail}`)[0];

export default {
  setPoints,
  points: setPoints,
  bend,
  pinch,
  padding,
  head,
  tail,
  getLine,
  getHead,
  getTail,
};
