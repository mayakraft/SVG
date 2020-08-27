/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
import window from "../../../environment/window";
import viewBox from "../../../arguments/viewBox";
import coordinates from "../../../arguments/coordinates";
import methods from "./methods";
import { loadHelper } from "./loadHelper";

const ElementConstructor = (new window.DOMParser())
  .parseFromString("<div />", "text/xml").documentElement.constructor;

// const findWindowBooleanParam = (...params) => params
//   .filter(arg => typeof arg === K.object)
//   .filter(o => typeof o.window === K.boolean)
//   .reduce((a, b) => a.window || b.window, false);

export default {
  svg: {
    args: (...args) => [viewBox(coordinates(...args))].filter(a => a != null),
    methods,
    init: (element, ...args) => {
      args.filter(a => typeof a === "string")
        .forEach(string => loadHelper(element, string));
      args.filter(a => a != null)
        .filter(arg => arg instanceof ElementConstructor)
        .filter(el => typeof el.appendChild === K.function)
        .forEach(parent => parent.appendChild(element));
      // Events(element);
    }
  }
};
