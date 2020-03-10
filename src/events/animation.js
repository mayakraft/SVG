/**
 * SVG (c) Robby Kraft
 */

import UUID from "../arguments/uuid";

const Animation = function (element) {

  let start;
  const handlers = {};
  let frame = 0;

  const removeHandlers = () => {
    Object.keys(handlers)
      .forEach(uuid => delete handlers[uuid]);
    // handlers = {};
    start = undefined;
    frame = 0;
  }

  Object.defineProperty(element, "play", {
    set: (handler) => {
      removeHandlers();
      if (handler == null) { return; }
      const uuid = UUID();
      const handlerFunc = (e) => {
        if (!start) {
          start = e;
        }
        const progress = (e - start) * 0.001;
        handler({time: progress, frame: frame});
        // prepare next frame
        frame += 1;
        if (handlers[uuid]) {
          window.requestAnimationFrame(handlers[uuid]);
        }
      };
      handlers[uuid] = handlerFunc;
      window.requestAnimationFrame(handlers[uuid]);
    },
    enumerable: true
  });
  Object.defineProperty(element, "stop", { value: removeHandlers, enumerable: true });
};

export default Animation;