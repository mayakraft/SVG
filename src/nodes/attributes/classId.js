/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";

const getClassList = (element) => {
  if (element == null) { return []; }
  const currentClass = element.getAttribute(K.class);
  return (currentClass == null
    ? []
    : currentClass.split(" ").filter(s => s !== ""));
};

export default {
  addClass: (element, newClass) => {
    const classes = getClassList(element)
      .filter(c => c !== newClass);
    classes.push(newClass);
    element.setAttributeNS(null, K.class, classes.join(" "));
  },
  removeClass: (element, removedClass) => {
    const classes = getClassList(element)
      .filter(c => c !== removedClass);
    element.setAttributeNS(null, K.class, classes.join(" "));
  },
  setClass: (element, className) => {
    element.setAttributeNS(null, K.class, className);
  },
  setID: (element, idName) => {
    element.setAttributeNS(null, K.id, idName);
  }
};
