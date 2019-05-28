/**
 * SVG in Javascript (c) Robby Kraft
 *
 * responsive, interactive SVG image with methods and handlers
 * @param: (number, number) width, height
 * @param: a DOM object or string DOM id. a parent to attach to
 * @param: a function that gets called after setup (callback)
 */

import * as DOM from "./DOM";
import * as ViewBox from "./viewBox";
import { svg, setupSVG } from "./elements/main";
import Events from "./events";

export default function () {
  // create a new SVG
  let _svg = svg();

  // get constructor parameters
  let params = Array.from(arguments);

  // setup that can occur immediately
  initSize(_svg, params);
  attachSVGMethods(_svg);
  _svg.events = Events(_svg);

  const setup = function () {
    // setup that requires a loaded DOM. append to parent, run callback
    initSize(_svg, params);
    getElement(params).appendChild(_svg);
    params.filter((arg) => typeof arg === "function")
      .forEach((func) => func())
  }

  if (document.readyState === 'loading') {
    // wait until after the <body> has rendered
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  return _svg;
};

const getElement = function (params) {
  let element = params.filter((arg) =>
      arg instanceof HTMLElement
    ).shift();
  let idElement = params.filter((a) =>
      typeof a === "string" || a instanceof String)
    .map(str => document.getElementById(str))
    .shift();
  return (element != null
    ? element
    : (idElement != null
      ? idElement
      : document.body));
}

const initSize = function (svg, params) {
  let numbers = params.filter((arg) => !isNaN(arg));
  if (numbers.length >= 2) {
    svg.setAttributeNS(null, "width", numbers[0]);
    svg.setAttributeNS(null, "height", numbers[1]);
    ViewBox.setViewBox(svg, 0, 0, numbers[0], numbers[1]);
  } 
  else if (svg.getAttribute("viewBox") == null) {
    // set a viewBox if viewBox doesn't yet exist
    let rect = svg.getBoundingClientRect();
    ViewBox.setViewBox(svg, 0, 0, rect.width, rect.height);
  }
}

const attachSVGMethods = function (element) {
  Object.defineProperty(element, "w", {
    get: function (){ return DOM.getWidth(element); },
    set: function (w){ element.setAttributeNS(null, "width", w); }
  });
  Object.defineProperty(element, "h", {
    get: function (){ return DOM.getHeight(element); },
    set: function (h){ element.setAttributeNS(null, "height", h); }
  });
  element.getWidth = function () { return DOM.getWidth(element); }
  element.getHeight = function () { return DOM.getHeight(element); }
  element.setWidth = function (w) { element.setAttributeNS(null, "width", w); }
  element.setHeight = function (h) { element.setAttributeNS(null, "height", h); }
  element.save = function (filename = "image.svg") {
    return DOM.save(element, filename);
  }
  element.load = function (data, callback) {
    DOM.load(data, function (newSVG, error) {
      let parent = element.parentNode;
      if (newSVG != null) {
        newSVG.events = element.events;
        setupSVG(newSVG);
        if (newSVG.events == null) { newSVG.events = Events(newSVG); }
        else { newSVG.events.setup(newSVG); }
        attachSVGMethods(newSVG);
        if (parent != null) { parent.insertBefore(newSVG, element); }
        element.remove();
        element = newSVG;
      }
      // if (parent != null) { parent.appendChild(element); }
      if (callback != null) { callback(element, error); }
    });
  }
}
