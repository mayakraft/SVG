/**
 * SVG (c) Robby Kraft
 */

import * as root from "./root";
import * as arrows from "./arrows";
import * as primitives from "./primitives";
import svg from "./svg";

const constructors = {};
Object.assign(constructors, root, arrows, primitives);
// except for this one callback
delete constructors.setConstructors;
root.setConstructors(constructors);

const elements = {};
Object.keys(arrows).forEach((key) => { elements[key] = arrows[key]; });
Object.keys(primitives).forEach((key) => { elements[key] = primitives[key]; });
Object.keys(root)
  .filter(key => key !== "setConstructors")
  .forEach((key) => { elements[key] = root[key]; });
elements.svg = svg;
export default elements;
