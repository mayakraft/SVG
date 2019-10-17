/**
 * SVG (c) Robby Kraft
 */

const DEFAULT_DELAY = 1000 / 60; // 60 fps in milliseconds

const Animate = function (node) {
  const timers = [];
  let frameNumber;
  let delay = DEFAULT_DELAY;
  let func;

  const clear = () => {
    while (timers.length > 0) {
      clearInterval(timers.shift());
    }
    func = undefined;
  };

  const start = () => {
    if (typeof func !== "function") { return; }
    timers.push(setInterval(() => {
      func({
        time: node.getCurrentTime(),
        frame: frameNumber += 1
      });
    }, delay));
  };

  const setLoop = (handler) => {
    clear();
    func = handler;
    if (typeof func === "function") {
      frameNumber = 0;
      start();
    }
  };

  const validateMillis = (m) => {
    const parsed = parseFloat(m);
    if (!isNaN(parsed) && isFinite(parsed)) {
      return parsed;
    }
    return DEFAULT_DELAY;
  };

  const setFPS = (fps) => {
    clear();
    delay = validateMillis(1000 / fps);
    start();
  };

  Object.defineProperty(node, "animate", {
    set: handler => setLoop(handler),
    enumerable: true
  });
  Object.defineProperty(node, "clear", {
    value: () => clear(),
    enumerable: true,
  });

  return {
    clear,
    setLoop,
    setFPS
  };
};

export default Animate;
