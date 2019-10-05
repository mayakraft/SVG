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
  svg,
  group,
  style,
  clipPath,
  mask
} from "./elements/primitives";

import {
  regularPolygon,
} from "./elements/polygons";

import {
  straightArrow,
  arcArrow,
} from "./elements/arrows";

import {
  setPoints,
  setArc,
} from "./attributes/geometry";

import namespace from "./environment/namespace";

import {
  setViewBox,
  getViewBox,
  scaleViewBox,
  translateViewBox,
  convertToViewBox,
} from "./attributes/viewBox";

import {
  removeChildren,
} from "./attributes/DOM";

import {
  save,
  load,
} from "./environment/file";

import { controls, controlPoint } from "./events/controls";
import SVG from "./elements/svg";

SVG.NS = namespace;
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
