import svgNS from "../environment/namespace";
import Args from "./args";

const constructor = function (tagName, ...args) {
  const el = window.document.createElementNS(svgNS, tagName);
  Args(el, tagName, ...args);
  return el;
};

export default constructor;
