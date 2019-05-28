/**
 * SVG in Javascript (c) Robby Kraft
 */

import * as DOM from "../DOM";
import * as ViewBox from "../viewBox";

export const attachClassMethods = function (element) {
  element.removeChildren = function () {
    return DOM.removeChildren(element);
  };
  element.addClass = function (...args) {
    return DOM.addClass(element, args);
  };
  element.removeClass = function (...args) {
    return DOM.removeClass(element, args);
  };
  element.setClass = function (...args) {
    return DOM.setClass(element, args);
  };
  element.setID = function (...args) {
    return DOM.setID(element, args);
  };
};

export const attachViewBoxMethods = function (element) {
  element.setViewBox = function (...args) {
    return ViewBox.setViewBox(element, args);
  };
  element.getViewBox = function (...args) {
    return ViewBox.getViewBox(element, args);
  };
  element.scaleViewBox = function (...args) {
    return ViewBox.scaleViewBox(element, args);
  };
  element.translateViewBox = function (...args) {
    return ViewBox.translateViewBox(element, args);
  };
  element.convertToViewBox = function (...args) {
    return ViewBox.convertToViewBox(element, args);
  };
};

export const attachAppendableMethods = function (element, methods) {
  Object.keys(methods).forEach((key) => {
    element[key] = function (...args) {
      const g = methods[key](args);
      element.appendChild(g);
      return g;
    };
  });
};
