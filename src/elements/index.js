/**
 * SVG (c) Robby Kraft
 */

import * as arrows from "./arrows";
import * as primitives from "./primitives";
import svg from "./svg";

const elements = {};
Object.keys(arrows).forEach((key) => { elements[key] = arrows[key]; });
Object.keys(primitives).forEach((key) => { elements[key] = primitives[key]; });
elements.svg = svg;

export default elements;
