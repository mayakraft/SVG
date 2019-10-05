/**
 * SVG (c) Robby Kraft
 */

import namespace from "./environment/namespace";
import elements from "./elements/index";
import * as geometryMods from "./attributes/geometry";
import * as ViewBox from "./attributes/viewBox";
// import {
//   removeChildren,
// } from "./attributes/DOM";
// import {
//   save,
//   load,
// } from "./environment/file";
// import { controls, controlPoint } from "./events/controls";
import SVG from "./elements/svg";

SVG.NS = namespace;
Object.keys(elements).forEach((key) => { SVG[key] = elements[key]; });
Object.keys(geometryMods).forEach((key) => { SVG[key] = geometryMods[key]; });
Object.keys(ViewBox).forEach((key) => { SVG[key] = ViewBox[key]; });
// SVG.removeChildren = removeChildren;
// SVG.save = save;
// SVG.load = load;
// SVG.controls = controls;
// SVG.controlPoint = controlPoint;

export default SVG;
