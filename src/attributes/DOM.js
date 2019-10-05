/**
 * SVG (c) Robby Kraft
 */

import { getViewBox, setViewBox } from "./viewBox";

export const removeChildren = function (parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

export const getWidthClient = function (svg) {
  const w = parseFloat(svg.getAttributeNS(null, "width"), 10);
  return w != null && !isNaN(w) ? w : svg.getBoundingClientRect().width;
};

export const getHeightClient = function (svg) {
  const h = parseFloat(svg.getAttributeNS(null, "height"), 10);
  return h != null && !isNaN(h) ? h : svg.getBoundingClientRect().height;
};

const getClassList = function (xmlNode) {
  const currentClass = xmlNode.getAttribute("class");
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
  xmlNode.setAttributeNS(null, "class", classes.join(" "));
  return xmlNode;
};

export const removeClass = function (xmlNode, removedClass) {
  if (xmlNode == null) {
    return xmlNode;
  }
  const classes = getClassList(xmlNode)
    .filter(c => c !== removedClass);
  xmlNode.setAttributeNS(null, "class", classes.join(" "));
  return xmlNode;
};

export const setClass = function (xmlNode, className) {
  xmlNode.setAttributeNS(null, "class", className);
  return xmlNode;
};

export const setID = function (xmlNode, idName) {
  xmlNode.setAttributeNS(null, "id", idName);
  return xmlNode;
};
