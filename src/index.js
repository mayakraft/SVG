/**
 * SVG (c) Robby Kraft
 */

import Nodes from "./nodes/index";
import Constructor from "./nodes/constructor";
import window from "./environment/window";
import NS from "./environment/namespace";
import K from "./environment/keys";
import Touch from "./events/touch";
import Animation from "./events/animation";
import Controls from "./events/controls";

const initialize = function (svg, ...args) {
  args.filter(arg => typeof arg === K.function)
    .forEach(func => func.call(svg, svg));
};

const SVG = function (...args) {
  const svg = Constructor(K.svg, ...args);
  Touch(svg);
  Animation(svg);
  svg.controls = (...args) => Controls.call(svg, svg, ...args);
  // call initialize as soon as possible. check if page has loaded
  if (window.document.readyState === "loading") {
    window.document.addEventListener("DOMContentLoaded", () => initialize(svg, ...args));
  } else {
    initialize(svg, ...args);
  }
  return svg;
};

Object.assign(SVG, Nodes);
SVG.NS = NS;

// Object.keys(elements).forEach((key) => { SVG[key] = elements[key]; });
// Object.keys(geometryMods).forEach((key) => { SVG[key] = geometryMods[key]; });
// Object.keys(ViewBox).forEach((key) => { SVG[key] = ViewBox[key]; });
// Object.keys(File).forEach((key) => { SVG[key] = File[key]; });

export default SVG;
