/**
 * SVG (c) Robby Kraft
 */

import * as root from "./root";
import * as arrows from "./arrows";
import * as primitives from "./primitives";

const constructors = {};
Object.assign(constructors, root, primitives, arrows);
// except for this one callback. the work around for circular dependency
delete constructors.setConstructors;
root.setConstructors(constructors);

const elements = {};
Object.keys(primitives).forEach((key) => { elements[key] = primitives[key]; });
Object.keys(arrows).forEach((key) => { elements[key] = arrows[key]; });
Object.keys(root)
  .filter(key => key !== "setConstructors")
  .forEach((key) => { elements[key] = root[key]; });
// the primitive SVG, not the robust SVG object (which lives at the top level)
delete elements.svg;

export default elements;
