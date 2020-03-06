/**
 * SVG (c) Robby Kraft
 */

import window from "../../environment/window";
import { setViewBox } from "../../methods/viewBox";
// import Events from "../../events/index";
// import Globalize from "./globalize";
import K from "../../environment/keys";

const ElementConstructor = (new window.DOMParser())
  .parseFromString("<div />", "text/xml").documentElement.constructor;

const findWindowBooleanParam = (...params) => params
  .filter(arg => typeof arg === K.object)
  .filter(o => typeof o.window === K.boolean)
  .reduce((a, b) => a.window || b.window, false);

const svgArguments = function (element, ...args) {
  const argsNoNull = args.filter(a => a != null);
  const numbers = argsNoNull.filter(arg => !isNaN(arg) && arg.constructor !== Array);
  switch (numbers.length) {
    case 4: setViewBox(element, numbers[0], numbers[1], numbers[2], numbers[3]);
    case 2: setViewBox(element, 0, 0, numbers[0], numbers[1]);
    default: break;
  }
  const parent = argsNoNull.filter(arg => arg instanceof ElementConstructor).shift();
  if (parent != null && typeof parent.appendChild === K.function) {
    parent.appendChild(element);
  }
  // Events(element);
  return element;
};

export default svgArguments;


  // // initialize requires a loaded DOM to append
  // const initialize = function () {
  //   const parent = findElementInParams(...params);
  //   if (parent != null) { parent.appendChild(element); }
  //   initSize(element, params);
  //   // accessibility modes
  //   if (findWindowBooleanParam(...params)) { // look for options { window: true }
  //     Globalize(element);
  //   }
  //   // todo: check for any security issues here.
  //   // any function inside the arguments will get fired with the SVG as a parameter.
  //   // a way of sending a callback to an unknown parameter list
  //   params.filter(arg => typeof arg === "function")
  //     .forEach(func => func.call(element, element));
  //   // element is bound to "this" and the first parameter.
  // };

  // // call initialize as soon as possible. check if page has loaded
  // if (window.document.readyState === "loading") {
  //   // wait until after the <body> has rendered
  //   window.document.addEventListener("DOMContentLoaded", initialize);
  // } else {
  //   initialize();
  // }

