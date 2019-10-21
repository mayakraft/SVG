/**
 * SVG (c) Robby Kraft
 */

import Pointer from "./pointer";
import { convertToViewBox } from "../attributes/viewBox";

const Touches = function (node) {
  const pointer = Pointer(node);
  // todo, more pointers for multiple screen touches

  const handlers = {
    mousemove: [],
    touchmove: [],
    mousedown: [],
    touchstart: [],
    mouseup: [],
    touchend: [],
    scroll: []
  };

  const clear = () => {
    Object.keys(handlers)
      .forEach(key => handlers[key]
        .forEach(f => node.removeEventListener(key, f)));
    Object.keys(handlers).forEach((key) => { handlers[key] = []; });
  };

  const onMouseMove = (handler, event) => {
    event.preventDefault();
    const e = pointer
      .move(event.clientX, event.clientY)
      .pressed(event.buttons > 0)
      .get();
    handler(e);
    return e;
  };
  const onTouchMove = (handler, event) => {
    event.preventDefault();
    const e = pointer
      .move(event.touches[0].clientX, event.touches[0].clientY)
      .pressed(true)
      .get();
    handler(e);
    return e;
  };
  const onMouseDown = (handler, event) => {
    event.preventDefault();
    const e = pointer
      .down(event.clientX, event.clientY)
      .get();
    handler(e);
    return e;
  };
  const onTouchStart = (handler, event) => {
    event.preventDefault();
    const e = pointer
      .down(event.touches[0].clientX, event.touches[0].clientY)
      .get();
    handler(e);
    return e;
  };
  const onEnd = (handler, event) => {
    event.preventDefault();
    const e = pointer.pressed(false).get();
    handler(e);
    return e;
  };

  const onScroll = function (handler, event) {
    const e = {
      deltaX: event.deltaX,
      deltaY: event.deltaY,
      deltaZ: event.deltaZ,
    };
    e.position = convertToViewBox(node, event.clientX, event.clientY);
    [e.x, e.y] = e.position;
    event.preventDefault();
    handler(e);
    return e;
  };

  Object.defineProperty(node, "mouse", {
    get: () => pointer.get(),
    enumerable: true
  });
  Object.defineProperty(node, "mouseMoved", {
    set: (handler) => {
      const mouseFunc = event => onMouseMove(handler, event);
      const touchFunc = event => onTouchMove(handler, event);
      handlers.mousemove.push(mouseFunc);
      handlers.touchmove.push(mouseFunc);
      node.addEventListener("mousemove", mouseFunc);
      node.addEventListener("touchmove", touchFunc);
    },
    enumerable: true
  });
  Object.defineProperty(node, "mousePressed", {
    set: (handler) => {
      const mouseFunc = event => onMouseDown(handler, event);
      const touchFunc = event => onTouchStart(handler, event);
      handlers.mousedown.push(mouseFunc);
      handlers.touchstart.push(touchFunc);
      node.addEventListener("mousedown", mouseFunc);
      node.addEventListener("touchstart", touchFunc);
    },
    enumerable: true
  });
  Object.defineProperty(node, "mouseReleased", {
    set: (handler) => {
      const mouseFunc = event => onEnd(handler, event);
      const touchFunc = event => onEnd(handler, event);
      handlers.mouseup.push(mouseFunc);
      handlers.touchend.push(touchFunc);
      node.addEventListener("mouseup", mouseFunc);
      node.addEventListener("touchend", touchFunc);
    },
    enumerable: true
  });
  Object.defineProperty(node, "scroll", {
    set: (handler) => {
      const scrollFunc = event => onScroll(handler, event);
      handlers.mouseup.push(scrollFunc);
      node.addEventListener("scroll", scrollFunc);
    },
    enumerable: true
  });

  return {
    clear,
    pointer
  };
};

export default Touches;
