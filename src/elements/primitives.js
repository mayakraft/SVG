/**
 * SVG (c) Robby Kraft
 */

import svgNS from "../environment/namespace";
import window from "../environment/window";

import {
  setPoints,
  setCenter,
  setLinePoints,
  setArc,
  setEllipticalArc,
  setBezier
} from "../attributes/geometry";

import prepare from "../attributes/prepare";

/**
 *  primitives
 */
export const line = function (...endpoints) {
  const shape = window.document.createElementNS(svgNS, "line");
  setLinePoints(shape, ...endpoints);
  prepare("primitive", shape);
  shape.setPoints = (...args) => setLinePoints(shape, ...args);
  return shape;
};

export const circle = function (x, y, radius) {
  const shape = window.document.createElementNS(svgNS, "circle");
  setCenter(shape, x, y);
  if (radius != null) { shape.setAttributeNS(null, "r", radius); }
  prepare("primitive", shape);
  shape.setCenter = (...args) => setCenter(shape, ...args);
  shape.setRadius = (r) => { shape.setAttributeNS(null, "r", r); return shape; };
  return shape;
};

export const ellipse = function (x, y, rx, ry) {
  const shape = window.document.createElementNS(svgNS, "ellipse");
  if (x != null) { shape.setAttributeNS(null, "cx", x); }
  if (y != null) { shape.setAttributeNS(null, "cy", y); }
  if (rx != null) { shape.setAttributeNS(null, "rx", rx); }
  if (ry != null) { shape.setAttributeNS(null, "ry", ry); }
  prepare("primitive", shape);
  return shape;
};

export const rect = function (x, y, width, height) {
  const shape = window.document.createElementNS(svgNS, "rect");
  if (x != null) { shape.setAttributeNS(null, "x", x); }
  if (y != null) { shape.setAttributeNS(null, "y", y); }
  if (width != null) { shape.setAttributeNS(null, "width", width); }
  if (height != null) { shape.setAttributeNS(null, "height", height); }
  prepare("primitive", shape);
  return shape;
};

export const polygon = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polygon");
  setPoints(shape, ...pointsArray);
  prepare("primitive", shape);
  shape.setPoints = (...args) => setPoints(shape, ...args);
  return shape;
};

export const polyline = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polyline");
  setPoints(shape, ...pointsArray);
  prepare("primitive", shape);
  shape.setPoints = (...args) => setPoints(shape, ...args);
  return shape;
};

export const path = function (d) {
  const shape = window.document.createElementNS(svgNS, "path");
  if (d != null) { shape.setAttributeNS(null, "d", d); }
  prepare("primitive", shape);
  return shape;
};

export const bezier = function (fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
  const shape = window.document.createElementNS(svgNS, "path");
  setBezier(shape, fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY);
  prepare("primitive", shape);
  shape.setBezier = (...args) => setBezier(shape, ...args);
  return shape;
};

export const text = function (textString, x, y) {
  const shape = window.document.createElementNS(svgNS, "text");
  shape.innerHTML = textString;
  shape.setAttributeNS(null, "x", x);
  shape.setAttributeNS(null, "y", y);
  prepare("text", shape);
  return shape;
};

export const arc = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, false);
  prepare("primitive", shape);
  shape.setArc = (...args) => setArc(shape, ...args);
  return shape;
};

export const wedge = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, true);
  prepare("primitive", shape);
  shape.setArc = (...args) => setArc(shape, ...args);
  return shape;
};

export const arcEllipse = function (x, y, rx, ry, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setEllipticalArc(shape, x, y, rx, ry, angleA, angleB, false);
  prepare("primitive", shape);
  shape.setArc = (...args) => setEllipticalArc(shape, ...args);
  return shape;
};

export const wedgeEllipse = function (x, y, rx, ry, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setEllipticalArc(shape, x, y, rx, ry, angleA, angleB, true);
  prepare("primitive", shape);
  shape.setArc = (...args) => setEllipticalArc(shape, ...args);
  return shape;
};

export const parabola = function (x, y, width, height) {
  const COUNT = 128;
  const iter = Array.from(Array(COUNT + 1))
    .map((_, i) => (i - (COUNT)) / COUNT * 2 + 1);
  const ptsX = iter.map(i => x + (i + 1) * width * 0.5);
  const ptsY = iter.map(i => y + (i ** 2) * height);
  const points = iter.map((_, i) => [ptsX[i], ptsY[i]]);
  return polyline(points);
};

export const regularPolygon = function (cX, cY, radius, sides) {
  const halfwedge = 2 * Math.PI / sides * 0.5;
  const r = Math.cos(halfwedge) * radius;
  const points = Array.from(Array(sides)).map((el, i) => {
    const a = -2 * Math.PI * i / sides + halfwedge;
    const x = cX + r * Math.sin(a);
    const y = cY + r * Math.cos(a);
    return [x, y];
  });
  return polygon(points);
};
