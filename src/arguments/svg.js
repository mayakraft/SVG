/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
// import Events from "../../events/index";
// import Globalize from "../environment/globalize";
import K from "../environment/keys";

const ElementConstructor = (new window.DOMParser())
  .parseFromString("<div />", "text/xml").documentElement.constructor;

// const findWindowBooleanParam = (...params) => params
//   .filter(arg => typeof arg === K.object)
//   .filter(o => typeof o.window === K.boolean)
//   .reduce((a, b) => a.window || b.window, false);

export default function (element, ...args) {
  const parent = args.filter(a => a != null)
    .filter(arg => arg instanceof ElementConstructor)
    .shift();
  if (parent != null && typeof parent.appendChild === K.function) {
    parent.appendChild(element);
  }
  // Events(element);
};


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
