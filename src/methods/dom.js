/**
 * SVG (c) Robby Kraft
 */

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
  }
};
