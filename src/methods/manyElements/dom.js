/**
 * SVG (c) Robby Kraft
 */

import Case from "../../arguments/case";

export default {
  removeChildren: (element) => {
    while (element.lastChild) {
      element.removeChild(element.lastChild);
    }
  },
  appendTo: (element, parent) => {
    if (parent != null) {
      parent.appendChild(element);
    }
  },
  setAttributes: (element, attrs) => Object.keys(attrs)
    .forEach(key => element.setAttribute(Case.toKebab(key), attrs[key]))
};
