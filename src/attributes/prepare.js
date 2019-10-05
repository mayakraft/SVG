/**
 * SVG (c) Robby Kraft
 */

import {
  attachAppendableMethods,
  attachClassMethods,
  attachAppendTo,
  attachClipMaskMakers,
  attachClipMaskAttributes,
  attachViewBoxMethods,
  attachFunctionalSetters
} from "./attach";

const preparePrimitive = function (element) {
  attachClassMethods(element);
  attachFunctionalSetters(element);
  attachAppendTo(element);
  attachClipMaskAttributes(element);
};

const prepareSVG = function (element, primitives) {
  attachClassMethods(element);
  attachAppendableMethods(element, primitives);
  attachViewBoxMethods(element);
  // attachFunctionalSetters(element);
  attachClipMaskMakers(element, primitives);
};

const prepareGroup = function (element, primitives) {
  attachClassMethods(element);
  attachAppendableMethods(element, primitives);
  attachFunctionalSetters(element);
  attachAppendTo(element);
  attachClipMaskAttributes(element);
};

const prepareMaskClipPath = function (element, primitives) {
  attachAppendableMethods(element, primitives);
  attachFunctionalSetters(element);
  attachAppendTo(element);
  attachClipMaskAttributes(element);
};


const prepare = function (type, element, primitiveList) {
  switch (type) {
    case "svg": prepareSVG(element, primitiveList); break;
    case "primitive": preparePrimitive(element, primitiveList); break;
    case "group": prepareGroup(element, primitiveList); break;
    case "clipPath":
    case "mask": prepareMaskClipPath(element, primitiveList); break;
    default: console.warn("prepare missing valid type (svg, group.."); break;
  }
};

export default prepare;
