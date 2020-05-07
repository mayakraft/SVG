/**
 * SVG (c) Robby Kraft
 */

// import Arguments from "../arguments/index";
import window from "../environment/window";
import svgNS from "../environment/namespace";
import NodesChildren from "./nodesChildren";
import Case from "../arguments/case";
// import Methods from "../methods";

import NodeSpec from "./nodes";

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
};

const bound = {};

const constructor = (nodeName, ...args) => {
  const element = window.document.createElementNS(svgNS, NodeSpec[nodeName].nodeName);
  RequiredAttributes(element, nodeName);
  NodeSpec[nodeName].init(element, ...args);
  NodeSpec[nodeName].args(...args).forEach((v, i) => {
    if (NodeSpec[nodeName].attributes[i] != null) {
      element.setAttribute(NodeSpec[nodeName].attributes[i], v);
    }
  });

  // camelCase functional style attribute setters, like .stroke() .strokeWidth()
  NodeSpec[nodeName].attributes.forEach((attribute) => {
    Object.defineProperty(element, Case.toCamel(attribute), {
      value: function () {
        element.setAttribute(attribute, ...arguments);
        return element;
      }
    });
  });

  // custom methods from each primitive's definition
  Object.keys(NodeSpec[nodeName].methods).forEach(methodName =>
    Object.defineProperty(element, methodName, {
      value: function () {
        // all custom methods are attached to the node.
        // if there is no return value specified,
        // the method will return the element itself
        // to encourage method-chaining design.
        return NodeSpec[nodeName].methods[methodName].call(bound, element, ...arguments) || element;
      }
    }));

  // a method to create a child and automatically append it to this node
  if (NodesChildren[nodeName]) {
    NodesChildren[nodeName].forEach((childNode) => {
      Object.defineProperty(element, childNode, {
        value: function () {
          const childElement = constructor(childNode, ...arguments);
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

bound.Constructor = constructor;

export default constructor;
