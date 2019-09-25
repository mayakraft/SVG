/**
 * SVG in Javascript (c) Robby Kraft
 */

import {
  svg,
  group,
  style,
  clipPath
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
import image from "./image";

image.svg = svg;
image.group = group;
image.style = style;
image.clipPath = clipPath;
image.line = line;
image.circle = circle;
image.ellipse = ellipse;
image.rect = rect;
image.polygon = polygon;
image.polyline = polyline;
image.bezier = bezier;
image.text = text;
image.wedge = wedge;
image.arc = arc;
image.setPoints = setPoints;
image.setArc = setArc;
image.regularPolygon = regularPolygon;
image.straightArrow = straightArrow;
image.arcArrow = arcArrow;
image.setViewBox = setViewBox;
image.getViewBox = getViewBox;
image.scaleViewBox = scaleViewBox;
image.translateViewBox = translateViewBox;
image.convertToViewBox = convertToViewBox;
image.removeChildren = removeChildren;
image.save = save;
image.load = load;
image.controls = controls;
image.controlPoint = controlPoint;

export default image;

// export {
//   svg,
//   group,
//   style,
//   line,
//   circle,
//   ellipse,
//   rect,
//   polygon,
//   polyline,
//   bezier,
//   text,
//   wedge,
//   arc,
//   setPoints,
//   setArc,
//   regularPolygon,
//   straightArrow,
//   arcArrow,
//   setViewBox,
//   getViewBox,
//   scaleViewBox,
//   translateViewBox,
//   convertToViewBox,
//   removeChildren,
//   save,
//   load,
//   image,
//   controls,
//   controlPoint,
// };
