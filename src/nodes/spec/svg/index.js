/**
 * SVG (c) Robby Kraft
 */

import K from "../../../environment/keys";
import window from "../../../environment/window";
import viewBox from "../../../arguments/viewBox";

import methods from "./methods";

const ElementConstructor = (new window.DOMParser())
  .parseFromString("<div />", "text/xml").documentElement.constructor;

// const findWindowBooleanParam = (...params) => params
//   .filter(arg => typeof arg === K.object)
//   .filter(o => typeof o.window === K.boolean)
//   .reduce((a, b) => a.window || b.window, false);

export default {
  svg: {
    args: (...args) => [viewBox(...args)].filter(a => a !== undefined),
    methods: methods,
    init: (element, ...args) => {
      const parent = args.filter(a => a != null)
        .filter(arg => arg instanceof ElementConstructor)
        .shift();
      if (parent != null && typeof parent.appendChild === K.function) {
        parent.appendChild(element);
      }
      // Events(element);
    }
  }
};
