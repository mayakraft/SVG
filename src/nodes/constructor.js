/**
 * SVG (c) Robby Kraft
 */

// import Arguments from "../arguments/index";
import Debug from "../environment/debug";
import window from "../environment/window";
import svgNS from "../environment/namespace";
import NodeList from "./nodes";
import NodesChildren from "./nodesChildren";
import Case from "../arguments/case";
// import Methods from "../methods";
import Spec from "./spec/index";
import CustomNodes from "./custom/index";
import Attributes from "../attributes/index";

const applyArgsToAttrs = (element, attrs, func, ...args) => {
  if (typeof func !== "function") { return; }
  func(...args).forEach((v, i) => {
    if (attrs[i] != null) {
      element.setAttribute(attrs[i], v);
    }
  });
};

const RequiredAttrMap = {
  svg: {
    version: "1.1",
    xmlns: svgNS,
  },
  style: {
    type: "text/css"
  }
};

// required attributes for elements like <svg>, <style>
const RequiredAttributes = (element, nodeName) => {
  if (RequiredAttrMap[nodeName]) {
    Object.keys(RequiredAttrMap[nodeName])
      .forEach(key => element.setAttribute(key, RequiredAttrMap[nodeName][key]));
  }
}

Object.assign(Spec, CustomNodes);

// in most cases the key === value. "line": "line"
// but in the case of custom shapes, for example: "regularPolygon": "polygon"
Object.keys(NodeList)
  .forEach(key => NodeList[key]
    .filter(nodeName => Spec[nodeName] === undefined)
    .forEach(nodeName => {
      Spec[nodeName] = {};
    }));

const passthrough = function () { return Array.from(arguments); };

Object.keys(Spec).forEach(key => {
  if (!Spec[key].nodeName) { Spec[key].nodeName = key; }
  if (!Spec[key].init) { Spec[key].init = passthrough; }
  if (!Spec[key].args) { Spec[key].args = passthrough; }
  if (!Spec[key].methods) { Spec[key].methods = {}; }
  if (!Spec[key].attributes) {
    Spec[key].attributes = Attributes[key] || [];
  }
});

Debug.log(Spec);

const constructor = (nodeName, ...args) => {
  const element = window.document.createElementNS(svgNS, Spec[nodeName].nodeName);
  RequiredAttributes(element, nodeName);
  Spec[nodeName].init(element, ...args);
  Spec[nodeName].args(...args).forEach((v, i) => {
    if (Spec[nodeName].attributes[i] != null) {
      element.setAttribute(Spec[nodeName].attributes[i], v);
    }
  });

  // camelCase functional style attribute setters, like .stroke() .strokeWidth()
  Spec[nodeName].attributes.forEach(attribute => {
    Object.defineProperty(element, Case.toCamel(attribute), {
      value: (...args) => {
        element.setAttribute(attribute, ...args);
        return element;
      }
    });
  });

  // custom methods from each primitive's definition
  Object.keys(Spec[nodeName].methods).forEach(methodName =>
    Object.defineProperty(element, methodName, {
      value: function () {
        return Spec[nodeName].methods[methodName](element, ...arguments);
      }
    }));

  // a method to create a child and automatically append it to this node
  if (NodesChildren[nodeName]) {
    NodesChildren[nodeName].forEach(childNode => {
      Object.defineProperty(element, childNode, {
        value: (...args) => {
          const childElement = constructor(childNode, ...args);
          element.appendChild(childElement);
          return childElement;
        }
      });
    });
  }

  // Arguments(nodeName, element, ...args);
  // Methods(nodeName, element);
  return element;
};

export default constructor;
