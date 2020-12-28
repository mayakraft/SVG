/**
 * SVG (c) Robby Kraft
 */

import Case from "../arguments/case";

export const removeChildren = (element) => {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
  return element;
};

export const appendTo = (element, parent) => {
  if (parent != null) {
    parent.appendChild(element);
  }
  return element;
};

export const setAttributes = (element, attrs) => Object.keys(attrs)
  .forEach(key => element.setAttribute(Case.toKebab(key), attrs[key]));

export const moveChildren = (target, source) => {
  while (source.childNodes.length > 0) {
    const node = source.childNodes[0];
    source.removeChild(node);
    target.appendChild(node);
  }
  return target;
};

export const clearSVG = (element) => {
  Array.from(element.attributes)
    .filter(a => a !== "xmlns")
    .forEach(attr => element.removeAttribute(attr.name));
  return removeChildren(element);
};

export const assignSVG = (target, source) => {
  Array.from(source.attributes)
    .forEach(attr => target.setAttribute(attr.name, attr.value));
  return moveChildren(target, source);
};

// everything but clearSVG gets exported as the default and added
// as a method to many elements
export default {
  removeChildren,
  appendTo,
  setAttributes,
};
