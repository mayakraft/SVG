/**
 * SVG (c) Robby Kraft
 */

import K from "../environment/keys";

export const removeChildren = function (parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

export const appendTo = function (element, parent) {
  if (parent != null) {
    parent.appendChild(element);
  }
  return element;
};

const toKebab = string => string
  .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
  .toLowerCase();

export const setAttributes = function (element, attributes) {
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(toKebab(key), attributes[key]);
  });
  return element;
};

const getClassList = function (xmlNode) {
  const currentClass = xmlNode.getAttribute(K.class);
  return (currentClass == null
    ? []
    : currentClass.split(" ").filter(s => s !== ""));
};

export const addClass = function (xmlNode, newClass) {
  if (xmlNode == null) {
    return xmlNode;
  }
  const classes = getClassList(xmlNode)
    .filter(c => c !== newClass);
  classes.push(newClass);
  xmlNode.setAttributeNS(null, K.class, classes.join(" "));
  return xmlNode;
};

export const removeClass = function (xmlNode, removedClass) {
  if (xmlNode == null) {
    return xmlNode;
  }
  const classes = getClassList(xmlNode)
    .filter(c => c !== removedClass);
  xmlNode.setAttributeNS(null, K.class, classes.join(" "));
  return xmlNode;
};

export const setClass = function (xmlNode, className) {
  xmlNode.setAttributeNS(null, K.class, className);
  return xmlNode;
};

export const setID = function (xmlNode, idName) {
  xmlNode.setAttributeNS(null, K.id, idName);
  return xmlNode;
};
