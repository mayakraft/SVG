/**
 * SVG (c) Robby Kraft
 */

import Nodes from "./nodes/index";
import Constructor from "./nodes/constructor";
import window from "./environment/window";
import NS from "./environment/namespace";
import K from "./environment/keys";
import Append from "./environment/append";
import Touch from "./events/touch";
import Animation from "./events/animation";
import Controls from "./events/controls";
import Load from "./file/load";
import Save from "./file/save";

// core methods
import coordinates from "./arguments/coordinates";

const initialize = function (svg, ...args) {
  args.filter(arg => typeof arg === K.function)
    .forEach(func => func.call(svg, svg));
};

const SVG = function () {
  const svg = Constructor(K.svg, ...arguments);
  Touch(svg);
  Animation(svg);
  Controls(svg);
  // call initialize as soon as possible. check if page has loaded
  if (window.document.readyState === "loading") {
    window.document.addEventListener("DOMContentLoaded", () => initialize(svg, ...arguments));
  } else {
    initialize(svg, ...arguments);
  }
  return svg;
};

Object.assign(SVG, Nodes);
// Object.keys(ViewBox).forEach((key) => { SVG[key] = ViewBox[key]; });
SVG.load = Load;
SVG.save = Save;
SVG.NS = NS;
SVG.append = Append.bind(SVG);

SVG.core = Object.assign(Object.create(null), {
  coordinates,
});

export default SVG;
