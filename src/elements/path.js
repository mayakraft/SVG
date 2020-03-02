/**
 * SVG (c) Robby Kraft
 */

import { flatten_input } from "../environment/parsers";

const d = function (element) {
  let attr = element.getAttribute("d");
  if (attr == null) { attr = ""; }
  return attr;
};

const append = function (element, command, ...args) {
  const params = flatten_input(args).join(",");
  element.setAttribute("d", `${d(element)}${command}${params}`);
  return element;
};

export const command = (element, cmd, ...args) => append(element, cmd, ...args);

export const moveTo = (element, ...args) => append(element, "M", ...args);
export const _moveTo = (element, ...args) => append(element, "m", ...args);
export const lineTo = (element, ...args) => append(element, "L", ...args);
export const _lineTo = (element, ...args) => append(element, "l", ...args);
export const verticalLineTo = (element, y) => append(element, "V", y);
export const _verticalLineTo = (element, y) => append(element, "v", y);
export const horizontalLineTo = (element, x) => append(element, "H", x);
export const _horizontalLineTo = (element, x) => append(element, "h", x);
export const ellipseTo = (element, ...args) => append(element, "A", ...args);
export const _ellipseTo = (element, ...args) => append(element, "a", ...args);
export const curveTo = (element, ...args) => append(element, "C", ...args);
export const _curveTo = (element, ...args) => append(element, "c", ...args);
export const smoothCurveTo = (element, ...args) => append(element, "S", ...args);
export const _smoothCurveTo = (element, ...args) => append(element, "s", ...args);
export const quadCurveTo = (element, ...args) => append(element, "Q", ...args);
export const _quadCurveTo = (element, ...args) => append(element, "q", ...args);
export const smoothQuadCurveTo = (element, ...args) => append(element, "T", ...args);
export const _smoothQuadCurveTo = (element, ...args) => append(element, "t", ...args);
export const close = element => append(element, "Z");
export const clear = (element) => {
  element.setAttribute("d", "");
  return element;
};
