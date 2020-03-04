/**
 * SVG (c) Robby Kraft
 */

import svgNS from "../environment/namespace";
import NodeChildren from "./nodeChildren";
import Constructor from "./constructor";
import ElementAttr from "./attributes/elementAttributes";
import Methods from "./methods/index";

const Attributes = {
  svg: {
    version: "1.1",
    xmlns: svgNS,
  },
  style: {
    type: "text/css"
  }
};

const toCamel = s => s.replace(/([-_][a-z])/ig, $1 => $1
  .toUpperCase()
  .replace("-", "")
  .replace("_", ""));

const prepare = function (element) {
  Methods.Prepare = prepare;
  Methods.Constructor = Constructor;

  const nodeName = element.nodeName;
  // assign necessary attributes to this element
  if (typeof Attributes[nodeName] === "object" && Attributes[nodeName] !== null) {
    Object.keys(Attributes[nodeName])
      .forEach(key => element.setAttribute(key, Attributes[nodeName][key]));
  };
  // assign any custom methods specific to each node type
  if (typeof Methods[nodeName] === "object" && Methods[nodeName] !== null) {
    Object.keys(Methods[nodeName]).forEach(methodName => {
      Object.defineProperty(element, methodName, {
        value: (...args) => Methods[nodeName][methodName](element, ...args)
      });
    });
  }
  // attach creator-methods
  // this allows calling svg.line() to create and append a <line>
  if (typeof NodeChildren[nodeName] === "object" && NodeChildren[nodeName] !== null) {
    NodeChildren[nodeName].forEach(childTag => {
      Object.defineProperty(element, childTag, { value: (...args) => {
        const el = prepare(Constructor(childTag, ...args));
        element.appendChild(el);
        return el; // returns the new element;
      }});
    });
  };
  // attach attribute-setter-methods
  // this allows calling svg.fill("value") to set the attribute fill="value"
  if (typeof ElementAttr[nodeName] === "object" && ElementAttr[nodeName] !== null) {
    ElementAttr[nodeName].forEach(attribute => {
      Object.defineProperty(element, toCamel(attribute), { value: (...args) => {
        element.setAttribute(attribute, ...args);
        return element;
      }});
    });
  }
  return element;
};

export default prepare;
