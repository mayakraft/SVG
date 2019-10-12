/**
 * SVG (c) Robby Kraft
 */

import svgNS from "../environment/namespace";
import window from "../environment/window";

import {
  setPoints,
  setArc,
  setBezier
} from "../attributes/geometry";

import prepare from "../attributes/prepare";

/**
 *  primitives
 */
const line = function (x1, y1, x2, y2) {
  const shape = window.document.createElementNS(svgNS, "line");
  if (x1) { shape.setAttributeNS(null, "x1", x1); }
  if (y1) { shape.setAttributeNS(null, "y1", y1); }
  if (x2) { shape.setAttributeNS(null, "x2", x2); }
  if (y2) { shape.setAttributeNS(null, "y2", y2); }
  prepare("primitive", shape);
  return shape;
};

const circle = function (x, y, radius) {
  const shape = window.document.createElementNS(svgNS, "circle");
  if (x) { shape.setAttributeNS(null, "cx", x); }
  if (y) { shape.setAttributeNS(null, "cy", y); }
  if (radius) { shape.setAttributeNS(null, "r", radius); }
  prepare("primitive", shape);
  return shape;
};

const ellipse = function (x, y, rx, ry) {
  const shape = window.document.createElementNS(svgNS, "ellipse");
  if (x) { shape.setAttributeNS(null, "cx", x); }
  if (y) { shape.setAttributeNS(null, "cy", y); }
  if (rx) { shape.setAttributeNS(null, "rx", rx); }
  if (ry) { shape.setAttributeNS(null, "ry", ry); }
  prepare("primitive", shape);
  return shape;
};

const rect = function (x, y, width, height) {
  const shape = window.document.createElementNS(svgNS, "rect");
  if (x) { shape.setAttributeNS(null, "x", x); }
  if (y) { shape.setAttributeNS(null, "y", y); }
  if (width) { shape.setAttributeNS(null, "width", width); }
  if (height) { shape.setAttributeNS(null, "height", height); }
  prepare("primitive", shape);
  return shape;
};

const polygon = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polygon");
  setPoints(shape, ...pointsArray);
  prepare("primitive", shape);
  shape.setPoints = (...args) => setPoints(shape, ...args);
  return shape;
};

const polyline = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polyline");
  setPoints(shape, ...pointsArray);
  prepare("primitive", shape);
  shape.setPoints = (...args) => setPoints(shape, ...args);
  return shape;
};

const bezier = function (fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY) {
  const pts = [[fromX, fromY], [c1X, c1Y], [c2X, c2Y], [toX, toY]]
    .map(p => p.join(","));
  const d = `M ${pts[0]} C ${pts[1]} ${pts[2]} ${pts[3]}`;
  const shape = window.document.createElementNS(svgNS, "path");
  shape.setAttributeNS(null, "d", d);
  // GeometryMod.setBezier(shape, ...args);
  prepare("primitive", shape);
  shape.setBezier = (...args) => setBezier(shape, ...args);
  return shape;
};

const text = function (textString, x, y) {
  const shape = window.document.createElementNS(svgNS, "text");
  shape.innerHTML = textString;
  shape.setAttributeNS(null, "x", x);
  shape.setAttributeNS(null, "y", y);
  prepare("text", shape);
  return shape;
};

const wedge = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, true);
  prepare("primitive", shape);
  shape.setArc = (...args) => setArc(shape, ...args);
  return shape;
};

const arc = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, false);
  prepare("primitive", shape);
  shape.setArc = (...args) => setArc(shape, ...args);
  return shape;
};

const parabola = function (x, y, width, height) {
  const COUNT = 128;
  const iter = Array.from(Array(COUNT + 1))
    .map((_, i) => (i - (COUNT)) / COUNT * 2 + 1);
  const ptsX = iter.map(i => x + (i + 1) * width * 0.5);
  const ptsY = iter.map(i => y + (i ** 2) * height);
  const points = iter.map((_, i) => [ptsX[i], ptsY[i]]);
  return polyline(points);
};

const regularPolygon = function (cX, cY, radius, sides) {
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

export {
  line,
  circle,
  ellipse,
  rect,
  polygon,
  polyline,
  bezier,
  text,
  wedge,
  arc,
  parabola,
  regularPolygon,
};
