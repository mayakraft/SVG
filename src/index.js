/**
 * SVG (c) Robby Kraft
 */

import SVG from "./elements/svg";
import NS from "./environment/namespace";
import elements from "./elements/index";
import * as geometryMods from "./attributes/geometry";
import * as ViewBox from "./attributes/viewBox";
import * as File from "./environment/file";

Object.keys(elements).forEach((key) => { SVG[key] = elements[key]; });
Object.keys(geometryMods).forEach((key) => { SVG[key] = geometryMods[key]; });
Object.keys(ViewBox).forEach((key) => { SVG[key] = ViewBox[key]; });
Object.keys(File).forEach((key) => { SVG[key] = File[key]; });
SVG.svg = SVG;
SVG.NS = NS;

export default SVG;
