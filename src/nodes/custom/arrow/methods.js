/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
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
  const path = element.getElementsByClassName(`arrow-${which}`)[0];
  Object.keys(options)
    .map(key => ({ key, fn: path[Case.toCamel(key)] }))
    .filter(el => typeof el.fn === "function")
    .forEach(el => el.fn(options[el.key]));
};

const redraw = (element) => {
  const paths = makeArrowPaths(element.options);
  Object.keys(paths)
    .map(path => ({
      path,
      element: element.getElementsByClassName(`arrow-${path}`)[0]
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
  element.options.endpoints = coordinates(...flatten(...args)).slice(0, 4);
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

const head = (element, options) => {
  setArrowheadOptions(element, options, "head");
  setArrowStyle(element, options, "head");
  return redraw(element);
};

const tail = (element, options) => {
  setArrowheadOptions(element, options, "tail");
  setArrowStyle(element, options, "tail");
  return redraw(element);
};

const getLine = element => element.getElementsByClassName("arrow-line")[0];

export default {
  setPoints,
  bend,
  pinch,
  head,
  tail,
  getLine,
}