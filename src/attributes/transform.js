/**
 * SVG (c) Robby Kraft
 */

const setTransform = function (element, transform) {
  if (typeof transform === "object") {
    element.setAttribute("transform", transform.join(" "));
  } else if (typeof transform === "string") {
    element.setAttribute("transform", transform);
  }
};

const getTransform = function (element) {
  const trans = element.getAttribute("transform");
  return (trans == null
    ? undefined
    : trans.split(" "));
};

export const translate = function (element, tx, ty) {
  const trans = getTransform(element) || [];
  trans.push(`translate(${tx}, ${ty})`);
  setTransform(element, trans);
  return element;
};

export const rotate = function (element, angle) {
  const trans = getTransform(element) || [];
  trans.push(`rotate(${angle})`);
  setTransform(element, trans);
  return element;
};

export const scale = function (element, sx, sy) {
  const trans = getTransform(element) || [];
  trans.push(`scale(${sx}, ${sy})`);
  setTransform(element, trans);
  return element;
};
