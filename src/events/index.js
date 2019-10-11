/**
 * SVG (c) Robby Kraft
 */

import Touches from "./touches";
import Animate from "./animate";

const Events = function (node) {
  const animate = Animate(node);
  const touches = Touches(node);

  Object.defineProperty(node, "stopAnimations", {
    value: animate.clear,
    enumerated: true
  });
  Object.defineProperty(node, "freeze", {
    value: () => {
      touches.clear();
      animate.clear();
    },
    enumerated: true
  });
  Object.defineProperty(node, "fps", {
    set: fps => animate.setFPS(fps),
    enumerated: true
  });
};

export default Events;
