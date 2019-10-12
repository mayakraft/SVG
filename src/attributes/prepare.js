/**
 * SVG (c) Robby Kraft
 */

import {
  attachAppendableMethods,
  attachDOMMethods,
  attachClipMaskMakers,
  attachClipMaskAttributes,
  attachTransformMethods,
  attachViewBoxMethods,
  attachFunctionalSetters
} from "./attach";

const preparePrimitive = function (element) {
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachFunctionalSetters(element);
  attachClipMaskAttributes(element);
};

const prepareText = function (element) {
  attachDOMMethods(element);
  // text element has a problem with "rotate"
  // attachTransformMethods(element); 
  attachFunctionalSetters(element);
  attachClipMaskAttributes(element);
};

const prepareSVG = function (element, primitives) {
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachAppendableMethods(element, primitives);
  attachViewBoxMethods(element);
  // attachFunctionalSetters(element);
  attachClipMaskMakers(element, primitives);
};

const prepareGroup = function (element, primitives) {
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachAppendableMethods(element, primitives);
  attachFunctionalSetters(element);
  attachClipMaskAttributes(element);
};

const prepareMaskClipPath = function (element, primitives) {
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachAppendableMethods(element, primitives);
  attachFunctionalSetters(element);
  attachClipMaskAttributes(element);
};


const prepare = function (type, element, primitiveList) {
  switch (type) {
    case "svg": prepareSVG(element, primitiveList); break;
    case "primitive": preparePrimitive(element, primitiveList); break;
    case "defs":
    case "group": prepareGroup(element, primitiveList); break;
    case "text": prepareText(element, primitiveList); break;
    case "clipPath":
    case "mask": prepareMaskClipPath(element, primitiveList); break;
    default: console.warn("prepare missing valid type (svg, group.."); break;
  }
};

export default prepare;
