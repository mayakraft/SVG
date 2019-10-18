/**
 * SVG (c) Robby Kraft
 */

import {
  attachAppendableMethods,
  attachDOMMethods,
  attachClipMaskMakers,
  attachClipMaskAttributes,
  attachStyleMethods,
  attachTransformMethods,
  attachViewBoxMethods,
  attachFunctionalStyleSetters
} from "./attach";

const preparePrimitive = function (element) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachClipMaskAttributes(element);
};

const prepareText = function (element) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  // text element has a problem with "rotate"
  // attachTransformMethods(element);
  attachClipMaskAttributes(element);
};

const prepareSVG = function (element, primitives) {
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachAppendableMethods(element, primitives);
  attachViewBoxMethods(element);
  // attachFunctionalStyleSetters(element);
  attachClipMaskMakers(element, primitives);
};

const prepareGroup = function (element, primitives) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachAppendableMethods(element, primitives);
  attachClipMaskAttributes(element);
};

const prepareMaskClipPath = function (element, primitives) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachAppendableMethods(element, primitives);
  attachClipMaskAttributes(element);
};

const prepareStyle = function (element) {
  attachStyleMethods(element);
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
    case "style": prepareStyle(element); break;
    default: console.warn("prepare missing valid type (svg, group.."); break;
  }
};

export default prepare;
