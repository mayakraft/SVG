/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
import UUID from "../arguments/uuid";

const Animation = function (element) {

  let start;
  const handlers = {};
  let frame = 0;
  let requestId;

  const removeHandlers = () => {
    window.cancelAnimationFrame(requestId);
    Object.keys(handlers)
      .forEach(uuid => delete handlers[uuid]);
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
          requestId = window.requestAnimationFrame(handlers[uuid]);
        }
      };
      handlers[uuid] = handlerFunc;
      requestId = window.requestAnimationFrame(handlers[uuid]);
    },
    enumerable: true
  });
  Object.defineProperty(element, "stop", { value: removeHandlers, enumerable: true });
};

export default Animation;
