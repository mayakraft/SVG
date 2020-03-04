/**
 * SVG (c) Robby Kraft
 */

import SVG from "./svg";
import Path from "./path";

import {
  setPoints,
  setCenter,
  setLinePoints,
  setArc,
  setEllipticalArc,
  setBezier,
  setArrowPoints
} from "../../methods/geometry";

const setRadius = (el, r) => { el.setAttributeNS(null, "r", r); return el; };
const setTextContent = (el, text) => {
  el.textContent = "";
  el.appendChild(cdata(text));
  return el;
};

const nodeMethods = {
  svg: SVG,
  path: Path,
  line: { setPoints: setLinePoints },
  circle: {
    setCenter: setCenter,
    setRadius: setRadius,
    radius: setRadius,
  },
  polygon: { setPoints: setPoints },
  polyline: { setPoints: setPoints },
  style: { setTextContent: setTextContent },
};

const methods = {};

Object.keys(nodeMethods).forEach(nodeName => {
  methods[nodeName] = {};
  Object.keys(nodeMethods[nodeName]).forEach(method => {
    methods[nodeName][method] = (el, ...args) => nodeMethods[nodeName][method].call(methods, el, ...args);
  });
});

export default methods;
