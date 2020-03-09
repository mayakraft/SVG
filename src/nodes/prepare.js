/**
 * SVG (c) Robby Kraft
 */

import NodeChildren from "./nodesChildren";
// import Constructor from "./constructor";
import ElementAttr from "./attributesElements";
import AttributeMethods from "./attributes/index";
import K from "../environment/keys";

const toCamel = s => s.replace(/([-_][a-z])/ig, $1 => $1
  .toUpperCase()
  .replace("-", "")
  .replace("_", ""));

const prepare = function (element) {
  AttributeMethods.Constructor = prepare.Constructor;

  const nodeName = element.nodeName;

  // assign any custom methods specific to each node type
  if (typeof AttributeMethods[nodeName] === K.object && AttributeMethods[nodeName] !== null) {
    Object.keys(AttributeMethods[nodeName])
      .filter(methodName => element[methodName] === undefined)
      .forEach(methodName => {
        Object.defineProperty(element, methodName, {
          value: (...args) => AttributeMethods[nodeName][methodName](element, ...args)
        });
      });
  }
  // attach creator-methods
  // this allows calling svg.line() to create and append a <line>
  if (typeof NodeChildren[nodeName] === K.object && NodeChildren[nodeName] !== null) {
    NodeChildren[nodeName]
      .filter(childTag => element[childTag] === undefined)
      .forEach(childTag => {
        Object.defineProperty(element, childTag, { value: (...args) => {
          const el = prepare.Constructor(childTag, ...args);
          element.appendChild(el);
          return el; // returns the new element;
        }});
      });
  }
  // attach attribute-setter-methods
  // this allows calling svg.fill("value") to set the attribute fill="value"
  if (typeof ElementAttr[nodeName] === K.object && ElementAttr[nodeName] !== null) {
    // prevent attribute from overwriting properties already on the element
    ElementAttr[nodeName]
      .map(attribute => ({ a: attribute, c: toCamel(attribute) }))
      .filter(el => element[el.c] == null)
      .forEach((el, i) => {
        Object.defineProperty(element, el.c, { value: (...args) => {
          element.setAttribute(el.a, ...args);
          return element;
        }});
      });
  }
  return element;
};

export default prepare;
