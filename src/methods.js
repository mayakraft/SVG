/**
 * SVG (c) Robby Kraft
 */

import NodeChildren from "./nodes/nodesChildren";
import Debug from "./environment/debug";
import AttrElem from "./attributes/attributesElements";
import AttributeMethods from "./methods/index";
import Case from "./arguments/case";
import K from "./environment/keys";

const makeExist = (obj, key) => {
  if (obj[key] === undefined) { obj[key] = {}; }
};

// build this on load
const AttrNodeFunc = {};

// camelCase functional style attribute setters, like .stroke() .strokeWidth()
Object.keys(AttrElem).forEach(nodeName => {
  makeExist(AttrNodeFunc, nodeName);
  AttrElem[nodeName].forEach(attribute => {
    AttrNodeFunc[nodeName][Case.toCamel(attribute)] = (element, ...args) => {
      element.setAttribute(attribute, ...args);
      return element;
    }});
});

// this allows calling svg.line() to create and append a <line>
Object.keys(NodeChildren).forEach(nodeName => {
  makeExist(AttrNodeFunc, nodeName);
  NodeChildren[nodeName].forEach(childNode => {
    AttrNodeFunc[nodeName][childNode] = (element, ...args) => {
      const el = Methods.Constructor(childNode, ...args);
      element.appendChild(el);
      return el;
    }
  });
});

Object.keys(AttributeMethods).forEach(nodeName => {
  makeExist(AttrNodeFunc, nodeName);
  Object.assign(AttrNodeFunc[nodeName], AttributeMethods[nodeName]);
});

const Methods = function (element) {
  AttributeMethods.Constructor = Methods.Constructor;
  const nodeName = element.nodeName;
  if (typeof AttrNodeFunc[nodeName] === K.object && AttrNodeFunc[nodeName] !== null) {
    Object.keys(AttrNodeFunc[nodeName])
      .filter(attr => element[attr] == null)
      .forEach(attr => {
        Object.defineProperty(element, attr, {
          value: (...args) => AttrNodeFunc[nodeName][attr](element, ...args)
        });
      });
  }
  return element;
};

Debug.log(AttrNodeFunc);

export default Methods;
