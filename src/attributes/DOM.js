/**
 * SVG (c) Robby Kraft
 */

export const removeChildren = function (parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

export const appendTo = function (element, parent) {
  if (parent != null) {
    element.remove();
    parent.appendChild(element);
  }
  return element;
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
