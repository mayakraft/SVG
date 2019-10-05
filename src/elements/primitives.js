/**
 * SVG in Javascript (c) Robby Kraft
 */

import svgNS from "../environment/namespace";
import window from "../environment/window";

import {
  setPoints,
  setArc,
  setBezier
} from "../attributes/geometry";

import {
  preparePrimitive,
  prepareSVG,
  prepareGroup,
  prepareClipPath,
  prepareMask,
} from "../attributes/index";

const primitives = [];

/**
 *  primitives
 */
export const line = function (x1, y1, x2, y2) {
  const shape = window.document.createElementNS(svgNS, "line");
  if (x1) { shape.setAttributeNS(null, "x1", x1); }
  if (y1) { shape.setAttributeNS(null, "y1", y1); }
  if (x2) { shape.setAttributeNS(null, "x2", x2); }
  if (y2) { shape.setAttributeNS(null, "y2", y2); }
  preparePrimitive(shape, primitives);
  return shape;
};

export const circle = function (x, y, radius) {
  const shape = window.document.createElementNS(svgNS, "circle");
  if (x) { shape.setAttributeNS(null, "cx", x); }
  if (y) { shape.setAttributeNS(null, "cy", y); }
  if (radius) { shape.setAttributeNS(null, "r", radius); }
  preparePrimitive(shape, primitives);
  return shape;
};

export const ellipse = function (x, y, rx, ry) {
  const shape = window.document.createElementNS(svgNS, "ellipse");
  if (x) { shape.setAttributeNS(null, "cx", x); }
  if (y) { shape.setAttributeNS(null, "cy", y); }
  if (rx) { shape.setAttributeNS(null, "rx", rx); }
  if (ry) { shape.setAttributeNS(null, "ry", ry); }
  preparePrimitive(shape, primitives);
  return shape;
};

export const rect = function (x, y, width, height) {
  const shape = window.document.createElementNS(svgNS, "rect");
  if (x) { shape.setAttributeNS(null, "x", x); }
  if (y) { shape.setAttributeNS(null, "y", y); }
  if (width) { shape.setAttributeNS(null, "width", width); }
  if (height) { shape.setAttributeNS(null, "height", height); }
  preparePrimitive(shape, primitives);
  return shape;
};

export const polygon = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polygon");
  setPoints(shape, ...pointsArray);
  preparePrimitive(shape, primitives);
  shape.setPoints = (...args) => setPoints(shape, ...args);
  return shape;
};

export const polyline = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polyline");
  setPoints(shape, ...pointsArray);
  preparePrimitive(shape, primitives);
  shape.setPoints = (...args) => setPoints(shape, ...args);
  return shape;
};

export const bezier = function (fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
  const pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]]
    .map(p => p.join(","));
  const d = `M ${pts[0]} C ${pts[1]} ${pts[2]} ${pts[3]}`;
  const shape = window.document.createElementNS(svgNS, "path");
  shape.setAttributeNS(null, "d", d);
  // GeometryMod.setBezier(shape, ...args);
  preparePrimitive(shape, primitives);
  shape.setBezier = (...args) => setBezier(shape, ...args);
  return shape;
};

export const text = function (textString, x, y) {
  const shape = window.document.createElementNS(svgNS, "text");
  shape.innerHTML = textString;
  shape.setAttributeNS(null, "x", x);
  shape.setAttributeNS(null, "y", y);
  preparePrimitive(shape, primitives);
  return shape;
};

export const wedge = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, true);
  preparePrimitive(shape, primitives);
  shape.setArc = (...args) => setArc(shape, ...args);
  return shape;
};

export const arc = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, false);
  preparePrimitive(shape, primitives);
  shape.setArc = (...args) => setArc(shape, ...args);
  return shape;
};

export const parabola = function (x, y, width, height) {
  const COUNT = 100;
  const iter = Array.from(Array(COUNT)).map((_, i) => i - ((COUNT - 1) / 2));
  const ptsX = iter.map(i => 300 + i);
  const ptsY = iter.map(i => 10 + 0.1 * (i ** 2));
  // iter.pop(); // reduce by 1
  const points = iter.map((_, i) => [ptsX[i], ptsY[i]]);
  return polyline(points);
};


export const svg = function () {
  const svgImage = window.document.createElementNS(svgNS, "svg");
  svgImage.setAttribute("version", "1.1");
  svgImage.setAttribute("xmlns", svgNS);
  prepareSVG(svgImage, primitives);
  return svgImage;
};

export const group = function () {
  const g = window.document.createElementNS(svgNS, "g");
  prepareGroup(g, primitives);
  return g;
};

export const clipPath = function (id) {
  const clip = window.document.createElementNS(svgNS, "clipPath");
  clip.setAttribute("id", id);
  prepareClipPath(clip, primitives);
  return clip;
};

export const mask = function (id) {
  const msk = window.document.createElementNS(svgNS, "mask");
  msk.setAttribute("id", id);
  prepareMask(msk, primitives);
  return msk;
};

export const style = function () {
  const s = window.document.createElementNS(svgNS, "style");
  s.setAttribute("type", "text/css");
  return s;
};

[
  line, circle, ellipse, rect, polygon, polyline, bezier, text,
  wedge, arc, parabola, group, clipPath, mask, style
].forEach(f => primitives.push(f));
