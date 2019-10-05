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

const primitives = {};

const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateUUID = function (count = 16, prefix = "") {
  return Array.from(Array(count))
    .map(() => Math.floor(Math.random() * abc.length))
    .map(i => abc[i]).reduce((a, b) => `${a}${b}`, prefix);
};

/**
 *  primitives
 */
const line = function (x1, y1, x2, y2) {
  const shape = window.document.createElementNS(svgNS, "line");
  if (x1) { shape.setAttributeNS(null, "x1", x1); }
  if (y1) { shape.setAttributeNS(null, "y1", y1); }
  if (x2) { shape.setAttributeNS(null, "x2", x2); }
  if (y2) { shape.setAttributeNS(null, "y2", y2); }
  prepare("primitive", shape, primitives);
  return shape;
};

const circle = function (x, y, radius) {
  const shape = window.document.createElementNS(svgNS, "circle");
  if (x) { shape.setAttributeNS(null, "cx", x); }
  if (y) { shape.setAttributeNS(null, "cy", y); }
  if (radius) { shape.setAttributeNS(null, "r", radius); }
  prepare("primitive", shape, primitives);
  return shape;
};

const ellipse = function (x, y, rx, ry) {
  const shape = window.document.createElementNS(svgNS, "ellipse");
  if (x) { shape.setAttributeNS(null, "cx", x); }
  if (y) { shape.setAttributeNS(null, "cy", y); }
  if (rx) { shape.setAttributeNS(null, "rx", rx); }
  if (ry) { shape.setAttributeNS(null, "ry", ry); }
  prepare("primitive", shape, primitives);
  return shape;
};

const rect = function (x, y, width, height) {
  const shape = window.document.createElementNS(svgNS, "rect");
  if (x) { shape.setAttributeNS(null, "x", x); }
  if (y) { shape.setAttributeNS(null, "y", y); }
  if (width) { shape.setAttributeNS(null, "width", width); }
  if (height) { shape.setAttributeNS(null, "height", height); }
  prepare("primitive", shape, primitives);
  return shape;
};

const polygon = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polygon");
  setPoints(shape, ...pointsArray);
  prepare("primitive", shape, primitives);
  shape.setPoints = (...args) => setPoints(shape, ...args);
  return shape;
};

const polyline = function (...pointsArray) {
  const shape = window.document.createElementNS(svgNS, "polyline");
  setPoints(shape, ...pointsArray);
  prepare("primitive", shape, primitives);
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
  prepare("primitive", shape, primitives);
  shape.setBezier = (...args) => setBezier(shape, ...args);
  return shape;
};

const text = function (textString, x, y) {
  const shape = window.document.createElementNS(svgNS, "text");
  shape.innerHTML = textString;
  shape.setAttributeNS(null, "x", x);
  shape.setAttributeNS(null, "y", y);
  prepare("primitive", shape, primitives);
  return shape;
};

const wedge = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, true);
  prepare("primitive", shape, primitives);
  shape.setArc = (...args) => setArc(shape, ...args);
  return shape;
};

const arc = function (x, y, radius, angleA, angleB) {
  const shape = window.document.createElementNS(svgNS, "path");
  setArc(shape, x, y, radius, angleA, angleB, false);
  prepare("primitive", shape, primitives);
  shape.setArc = (...args) => setArc(shape, ...args);
  return shape;
};

const parabola = function (x, y, width, height) {
  const COUNT = 128;
  const iter = Array.from(Array(COUNT + 1))
    .map((_, i) => (i - (COUNT)) / COUNT * 2 + 1);
  const ptsX = iter.map(i => x + (1 + i) * width * 0.5);
  const ptsY = iter.map(i => y + (1 - (i ** 2)) * height);
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

const svg = function () {
  const svgImage = window.document.createElementNS(svgNS, "svg");
  svgImage.setAttribute("version", "1.1");
  svgImage.setAttribute("xmlns", svgNS);
  prepare("svg", svgImage, primitives);
  return svgImage;
};

const group = function () {
  const g = window.document.createElementNS(svgNS, "g");
  prepare("group", g, primitives);
  return g;
};

const style = function () {
  const s = window.document.createElementNS(svgNS, "style");
  s.setAttribute("type", "text/css");
  return s;
};

const clipPath = function (id = generateUUID(8, "clip-")) {
  const clip = window.document.createElementNS(svgNS, "clipPath");
  clip.setAttribute("id", id);
  prepare("clipPath", clip, primitives);
  return clip;
};

const mask = function (id = generateUUID(8, "mask-")) {
  const msk = window.document.createElementNS(svgNS, "mask");
  msk.setAttribute("id", id);
  prepare("mask", msk, primitives);
  return msk;
};

const elements = {
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
  svg,
  group,
  clipPath,
  mask,
  style
};

Object.keys(elements)
  .filter(key => key !== "svg")
  .forEach((key) => { primitives[key] = elements[key]; });

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
  svg,
  group,
  clipPath,
  mask,
  style
};
