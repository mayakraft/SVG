/**
 * SVG (c) Robby Kraft
 */
import * as K from "../environment/keys";

const getClassList = (element) => {
  if (element == null) { return []; }
  const currentClass = element.getAttribute(K._class);
  return (currentClass == null
    ? []
    : currentClass.split(" ").filter(s => s !== ""));
};

export default {
  addClass: (element, newClass) => {
    const classes = getClassList(element)
      .filter(c => c !== newClass);
    classes.push(newClass);
    element.setAttributeNS(null, K._class, classes.join(" "));
  },
  removeClass: (element, removedClass) => {
    const classes = getClassList(element)
      .filter(c => c !== removedClass);
    element.setAttributeNS(null, K._class, classes.join(" "));
  },
  setClass: (element, className) => {
    element.setAttributeNS(null, K._class, className);
  },
  setId: (element, idName) => {
    element.setAttributeNS(null, K.id, idName);
  }
};
