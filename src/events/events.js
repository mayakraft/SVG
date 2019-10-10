/**
 * SVG (c) Robby Kraft
 */

import { convertToViewBox } from "../attributes/viewBox";
import Pointer from "./pointer";

const Events = function (node) {
  const pointer = Pointer(node);

  const scrollHandler = function (handler, ...args) {
    const event = args[0]; // assuming the ...args is an event object from DOM handler
    const e = {
      deltaX: event.deltaX,
      deltaY: event.deltaY,
      deltaZ: event.deltaZ,
    };
    e.position = convertToViewBox(node, event.clientX, event.clientY);
    [e.x, e.y] = e.position;
    // if (theseEvents.length > 0) {
    event.preventDefault();
    // }
    handler(e);
    return e;
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
    const e = pointer.move();
    handler(e);
    return e;
  };
  const pressedFunc = (handler, event) => {
    event.preventDefault();
    const e = pointer.down(event);
    handler(e);
    return e;
  };
  const releasedFunc = (handler, event) => {
    event.preventDefault();
    const e = pointer.up(event);
    handler(e);
    return e;
  };

  Object.defineProperty(node, "mouseMoved", {
    set: (handler) => {
      node.onmousemove = event => onMouseMove(handler, event);
      node.ontouchmove = event => onTouchMove(handler, event);
    }
  });
  Object.defineProperty(node, "mousePressed", {
    set: (handler) => {
      node.onmousedown = event => pressedFunc(handler, event);
      node.ontouchstart = event => pressedFunc(handler, event);
    }
  });
  Object.defineProperty(node, "mouseReleased", {
    set: (handler) => {
      node.onmouseup = event => releasedFunc(handler, event);
      node.ontouchend = event => releasedFunc(handler, event);
    }
  });

  Object.defineProperty(node, "mouse", { get: () => pointer.get() });
  Object.defineProperty(node, "pointer", { get: () => pointer.get() });

  return {
    remove: () => {
      node.onmousemove = null;
      node.ontouchmove = null;
      node.onmousedown = null;
      node.ontouchstart = null;
      node.onmouseup = null;
      node.ontouchend = null;
    }
  };
};

export default Events;
