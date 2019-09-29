/**
 * SVG in Javascript (c) Robby Kraft
 */

import {
  svg,
  group,
  style,
  clipPath,
  mask
} from "./elements/main";

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
  setPoints,
  setArc,
} from "./elements/primitives";

import {
  regularPolygon,
} from "./elements/polygons";

import {
  straightArrow,
  arcArrow,
} from "./elements/arrows";

import {
  setViewBox,
  getViewBox,
  scaleViewBox,
  translateViewBox,
  convertToViewBox,
} from "./viewBox";

import {
  removeChildren,
  save,
  load,
} from "./DOM";

import { controls, controlPoint } from "./controls";
import SVG from "./SVG";

SVG.NS = "http://www.w3.org/2000/svg";
SVG.svg = svg;
SVG.group = group;
SVG.style = style;
SVG.clipPath = clipPath;
SVG.mask = mask;
SVG.line = line;
SVG.circle = circle;
SVG.ellipse = ellipse;
SVG.rect = rect;
SVG.polygon = polygon;
SVG.polyline = polyline;
SVG.bezier = bezier;
SVG.text = text;
SVG.wedge = wedge;
SVG.arc = arc;
SVG.setPoints = setPoints;
SVG.setArc = setArc;
SVG.regularPolygon = regularPolygon;
SVG.straightArrow = straightArrow;
SVG.arcArrow = arcArrow;
SVG.setViewBox = setViewBox;
SVG.getViewBox = getViewBox;
SVG.scaleViewBox = scaleViewBox;
SVG.translateViewBox = translateViewBox;
SVG.convertToViewBox = convertToViewBox;
SVG.removeChildren = removeChildren;
SVG.save = save;
SVG.load = load;
SVG.controls = controls;
SVG.controlPoint = controlPoint;

export default SVG;
