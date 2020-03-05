/**
 * SVG (c) Robby Kraft
 */

import SVG from "./svg";
import Path from "./path";
import Transforms from "./transforms";
import NodeNames from "../nodeNames";
import * as Primitives from "./primitives";

// setArc,
// setEllipticalArc,
// setBezier,
// setArrowPoints

const setTextContent = (el, text) => {
  el.textContent = "";
  el.appendChild(cdata(text));
  return el;
};

const nodeMethods = {
  svg: SVG,
  path: Path,
  line: { setPoints: Primitives.setLinePoints },
  circle: {
    setCenter: Primitives.setCenter,
    setRadius: Primitives.setRadius,
    radius: Primitives.setRadius,
  },
  polygon: { setPoints: Primitives.setPoints },
  polyline: { setPoints: Primitives.setPoints },
  style: { setTextContent: setTextContent },
};

// apply transforms to all visible element types
[NodeNames.text, NodeNames.drawings, NodeNames.group, NodeNames.svg]
  .forEach(category => category.forEach(node => {
    if (nodeMethods[node] === undefined) { nodeMethods[node] = {}; }
    Object.keys(Transforms).forEach(trans => {
      nodeMethods[node][trans] = Transforms[trans];
    });
  }));

const methods = {};

Object.keys(nodeMethods).forEach(nodeName => {
  methods[nodeName] = {};
  Object.keys(nodeMethods[nodeName]).forEach(method => {
    methods[nodeName][method] = (el, ...args) => nodeMethods[nodeName][method].call(methods, el, ...args);
  });
});

export default methods;
