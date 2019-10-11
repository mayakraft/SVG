/**
 * SVG (c) Robby Kraft
 */

import Pointer from "./pointer";
import { convertToViewBox } from "../attributes/viewBox";

const Touches = function (node) {
  // hook up mouse and touch events
  const pointer = Pointer(node);

  const clear = () => {
    node.onmousemove = null;
    node.ontouchmove = null;
    node.onmousedown = null;
    node.ontouchstart = null;
    node.onmouseup = null;
    node.ontouchend = null;
    node.onscroll = null;
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
      node.onmousemove = event => onMouseMove(handler, event);
      node.ontouchmove = event => onTouchMove(handler, event);
    },
    enumerable: true
  });
  Object.defineProperty(node, "mousePressed", {
    set: (handler) => {
      node.onmousedown = event => onMouseDown(handler, event);
      node.ontouchstart = event => onTouchStart(handler, event);
    },
    enumerable: true
  });
  Object.defineProperty(node, "mouseReleased", {
    set: (handler) => {
      node.onmouseup = event => onEnd(handler, event);
      node.ontouchend = event => onEnd(handler, event);
    },
    enumerable: true
  });
  Object.defineProperty(node, "onscroll", {
    set: (handler) => {
      node.onscroll = event => onScroll(handler, event);
    },
    enumerable: true
  });

  return {
    clear,
    pointer
  };
};

export default Touches;
