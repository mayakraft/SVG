/**
 * SVG in Javascript (c) Robby Kraft
 */

import window from "../environment/window";
import { attachClassMethods } from "./methods";

const svgNS = "http://www.w3.org/2000/svg";

const is_iterable = obj => obj != null
  && typeof obj[Symbol.iterator] === "function";
const flatten_input = function (...args) {
  switch (args.length) {
    case undefined:
    case 0: return args;
    // only if its an array (is iterable) and NOT a string
    case 1: return is_iterable(args[0]) && typeof args[0] !== "string"
      ? flatten_input(...args[0])
      : [args[0]];
    default:
      return Array.from(args)
        .map(a => (is_iterable(a)
          ? [...flatten_input(a)]
          : a))
        .reduce((a, b) => a.concat(b), []);
  }
};

/**
 *  modifiers
 */
export const setPoints = function (polygon, ...pointsArray) {
  const flat = flatten_input(...pointsArray);
  const pointsString = typeof flat[0] === "object" && flat[0].x != null
    ? flat.reduce((prev, curr) => `${prev}${curr.x},${curr.y} `, "")
    : Array.from(Array(flat.length / 2))
      .reduce((a, b, i) => `${a}${flat[i * 2]},${flat[i * 2 + 1]} `, "");
  polygon.setAttributeNS(null, "points", pointsString);
};

export const setArc = function (shape, x, y, radius,
  startAngle, endAngle, includeCenter = false) {
  const start = [
    x + Math.cos(startAngle) * radius,
    y + Math.sin(startAngle) * radius];
  const vecStart = [
    Math.cos(startAngle) * radius,
    Math.sin(startAngle) * radius];
  const vecEnd = [
    Math.cos(endAngle) * radius,
    Math.sin(endAngle) * radius];
  const arcVec = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
  const py = vecStart[0] * vecEnd[1] - vecStart[1] * vecEnd[0];
  const px = vecStart[0] * vecEnd[0] + vecStart[1] * vecEnd[1];
  const arcdir = (Math.atan2(py, px) > 0 ? 0 : 1);
  let d = (includeCenter
    ? `M ${x},${y} l ${vecStart[0]},${vecStart[1]} `
    : `M ${start[0]},${start[1]} `);
  d += ["a ", radius, radius, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
  if (includeCenter) { d += " Z"; }
  shape.setAttributeNS(null, "d", d);
};

const setBezier = function (shape, fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
  const pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]]
    .map(p => p.join(","));
  const d = `M ${pts[0]} C ${pts[1]} ${pts[2]} ${pts[3]}`;
  shape.setAttributeNS(null, "d", d);
};

const attachPointsMethods = function (shape) {
  Object.defineProperty(shape, "setPoints", {
    value: (...args) => {
      setPoints(shape, args);
    }
  });
};

const attachArcMethods = function (shape) {
  Object.defineProperty(shape, "setArc", {
    value: (...args) => {
      setArc(shape, ...args);
    }
  });
};

const attachBezierMethods = function (shape) {
  Object.defineProperty(shape, "setBezier", {
    value: (...args) => {
      setBezier(shape, ...args);
    }
  });
};

/**
 *  primitives
 */
export const line = function (x1, y1, x2, y2) {
  const shape = window.document.createElementNS(svgNS, "line");
  if (x1) { shape.setAttributeNS(null, "x1", x1); }
  if (y1) { shape.setAttributeNS(null, "y1", y1); }
  if (x2) { shape.setAttributeNS(null, "x2", x2); }
  if (y2) { shape.setAttributeNS(null, "y2", y2); }
  attachClassMethods(shape);
  return shape;
};

export const circle = function (x, y, radius) {
  const shape = window.document.createElementNS(svgNS, "circle");
  if (x) { shape.setAttributeNS(null, "cx", x); }
  if (y) { shape.setAttributeNS(null, "cy", y); }
  if (radius) { shape.setAttributeNS(null, "r", radius); }
  attachClassMethods(shape);
  return shape;
};

export const ellipse = function (x, y, rx, ry) {
  const shape = window.document.createElementNS(svgNS, "ellipse");
  if (x) { shape.setAttributeNS(null, "cx", x); }
  if (y) { shape.setAttributeNS(null, "cy", y); }
  if (rx) { shape.setAttributeNS(null, "rx", rx); }
  if (ry) { shape.setAttributeNS(null, "ry", ry); }
  attachClassMethods(shape);
  return shape;
};

export const rect = function (x, y, width, height) {
  const shape = window.document.createElementNS(svgNS, "rect");
  if (x) { shape.setAttributeNS(null, "x", x); }
  if (y) { shape.setAttributeNS(null, "y", y); }
  if (width) { shape.setAttributeNS(null, "width", width); }
  if (height) { shape.setAttributeNS(null, "height", height); }
  attachClassMethods(shape);
  return shape;
};

export const polygon = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polygon");
  setPoints(shape, ...pointsArray);
  attachClassMethods(shape);
  attachPointsMethods(shape);
  return shape;
};

export const polyline = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polyline");
  setPoints(shape, ...pointsArray);
  attachClassMethods(shape);
  attachPointsMethods(shape);
  return shape;
};

export const bezier = function (fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
  const pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]]
    .map(p => p.join(","));
  const d = `M ${pts[0]} C ${pts[1]} ${pts[2]} ${pts[3]}`;
  const shape = window.document.createElementNS(svgNS, "path");
  shape.setAttributeNS(null, "d", d);
  attachClassMethods(shape);
  attachBezierMethods(shape);
  return shape;
};

export const text = function (textString, x, y) {
  const shape = window.document.createElementNS(svgNS, "text");
  shape.innerHTML = textString;
  shape.setAttributeNS(null, "x", x);
  shape.setAttributeNS(null, "y", y);
  attachClassMethods(shape);
  return shape;
};

export const wedge = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, true);
  attachClassMethods(shape);
  attachArcMethods(shape);
  return shape;
};

export const arc = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, false);
  attachClassMethods(shape);
  attachArcMethods(shape);
  return shape;
};
