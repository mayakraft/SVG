/**
 * SVG in Javascript (c) Robby Kraft
 */

import {
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
} from "./primitives";

import {
  regularPolygon,
} from "./polygons";

import {
  straightArrow,
  arcArrow,
} from "./arrows";

import {
  attachClassMethods,
  attachViewBoxMethods,
  attachAppendableMethods,
  attachStyleMethods
} from "./methods";

import window from "../environment/window";

const svgNS = "http://www.w3.org/2000/svg";

const drawMethods = {
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
  straightArrow,
  arcArrow,
  regularPolygon,
};

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateUUID = function (prefix) {
  let suffix = "";
  for (let i = 0; i < 10; i += 1) {
    suffix += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return `${prefix}${suffix}`;
};

export const setupSVG = function (svgImage) {
  attachClassMethods(svgImage);
  attachViewBoxMethods(svgImage);
  attachAppendableMethods(svgImage, drawMethods);
};

export const svg = function () {
  const svgImage = window.document.createElementNS(svgNS, "svg");
  svgImage.setAttribute("version", "1.1");
  svgImage.setAttribute("xmlns", svgNS);
  setupSVG(svgImage);
  // attachStyleMethods(svgImage);
  return svgImage;
};

export const group = function () {
  const g = window.document.createElementNS(svgNS, "g");
  attachClassMethods(g);
  attachAppendableMethods(g, drawMethods);
  attachStyleMethods(g);
  return g;
};

export const clipPath = function (id) {
  const clip = window.document.createElementNS(svgNS, "clipPath");
  if (id != null) { clip.setAttribute("id", id); }
  else { clip.setAttribute("id", generateUUID("clip")); }
  attachAppendableMethods(clip, drawMethods);
  attachStyleMethods(clip);
  return clip;
};

export const mask = function (id) {
  const msk = window.document.createElementNS(svgNS, "mask");
  if (id != null) { msk.setAttribute("id", id); }
  else { msk.setAttribute("id", generateUUID("mask")); }
  attachAppendableMethods(msk, drawMethods);
  attachStyleMethods(msk);
  return msk;
};

export const style = function () {
  const s = window.document.createElementNS(svgNS, "style");
  s.setAttribute("type", "text/css");
  return s;
};

// circular reference, this is required after definition
drawMethods.group = group;
drawMethods.clipPath = clipPath;
drawMethods.mask = mask;
drawMethods.style = style;
