/**
 * SVG (c) Robby Kraft
 */

import viewBoxString from "../arguments/viewBox";
import K from "../environment/keys";

export const setViewBox = (element, ...args) => {
  // are they giving us pre-formatted string, or a list of numbers
  const viewBox = args.length === 1 && typeof args[0] === "string"
    ? args[0]
    : viewBoxString(...args);
  if (viewBox) {
    element.setAttribute(K.viewBox, viewBox);
  }
  return element;
};

export const getViewBox = function (element) {
  const vb = element.getAttribute(K.viewBox);
  return (vb == null
    ? undefined
    : vb.split(" ").map(n => parseFloat(n)));
};

export const convertToViewBox = function (svg, x, y) {
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
  return [svgPoint.x, svgPoint.y];
};

/*
export const translateViewBox = function (svg, dx, dy) {
  const viewBox = getViewBox(svg);
  if (viewBox == null) {
    setDefaultViewBox(svg);
  }
  viewBox[0] += dx;
  viewBox[1] += dy;
  svg.setAttributeNS(null, vB, viewBox.join(" "));
};

export const scaleViewBox = function (svg, scale, origin_x = 0, origin_y = 0) {
  if (Math.abs(scale) < 1e-8) { scale = 0.01; }
  const matrix = svg.createSVGMatrix()
    .translate(origin_x, origin_y)
    .scale(1 / scale)
    .translate(-origin_x, -origin_y);
  const viewBox = getViewBox(svg);
  if (viewBox == null) {
    setDefaultViewBox(svg);
  }
  const top_left = svg.createSVGPoint();
  const bot_right = svg.createSVGPoint();
  [top_left.x, top_left.y] = viewBox;
  bot_right.x = viewBox[0] + viewBox[2];
  bot_right.y = viewBox[1] + viewBox[3];
  const new_top_left = top_left.matrixTransform(matrix);
  const new_bot_right = bot_right.matrixTransform(matrix);
  setViewBox(svg,
    new_top_left.x,
    new_top_left.y,
    new_bot_right.x - new_top_left.x,
    new_bot_right.y - new_top_left.y);
};

*/
