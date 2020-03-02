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
  attachFunctionalStyleSetters,
  attachPathMethods,
  attachArrowMethods
} from "./attach";

const preparePrimitive = function (element) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachClipMaskAttributes(element);
  if (element.tagName === "path") {
    attachPathMethods(element);
  }
};

const prepareArrow = function (element) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachClipMaskAttributes(element);
  attachArrowMethods(element);
};

const prepareText = function (element) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachClipMaskAttributes(element);
};

const prepareSVG = function (element, primitives) {
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachViewBoxMethods(element);
  attachFunctionalStyleSetters(element);
  attachClipMaskMakers(element, primitives);
  attachAppendableMethods(element, primitives);
};

const prepareGroup = function (element, primitives) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachClipMaskAttributes(element);
  attachAppendableMethods(element, primitives);
};

const prepareMaskClipPath = function (element, primitives) {
  attachFunctionalStyleSetters(element);
  attachDOMMethods(element);
  attachTransformMethods(element);
  attachClipMaskAttributes(element);
  attachAppendableMethods(element, primitives);
};

const prepareStyle = function (element) {
  attachStyleMethods(element);
};

const prepare = function (type, element, primitiveList) {
  switch (type) {
    case "svg": prepareSVG(element, primitiveList); break;
    case "primitive": preparePrimitive(element, primitiveList); break;
    case "arrow": prepareArrow(element, primitiveList); break;
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
