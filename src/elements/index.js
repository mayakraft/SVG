/**
 * SVG (c) Robby Kraft
 */

// import * as root from "./root";
// import * as primitives from "./primitives";

// const constructors = {};
// Object.assign(constructors, root, primitives);
// // except for this one callback. the work around for circular dependency
// delete constructors.setConstructors;
// root.setConstructors(constructors);

// const elements = {};
// Object.keys(primitives).forEach((key) => { elements[key] = primitives[key]; });
// Object.keys(root)
//   .filter(key => key !== "setConstructors")
//   .forEach((key) => { elements[key] = root[key]; });
// // the primitive SVG not the robust SVG constructor (top level of this library)
// delete elements.svg;

// export default elements;

import Constructor from "./constructor";
import NodeNames from "./nodeNames";
import Prepare from "./prepare";

const elements = {};

Object.keys(NodeNames).forEach(key => NodeNames[key]
  .forEach(nodeName => {
    elements[nodeName] = function (...args) {
      return Prepare(Constructor(nodeName, ...args));
    }
  }));

export default elements;
