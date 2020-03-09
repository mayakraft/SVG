/**
 * SVG (c) Robby Kraft
 */

// import Pointer from "./pointer";
import { convertToViewBox } from "../view/viewBox";

const categories = {
  move: [
    "mousemove",
    "touchmove"
  ],
  press: [
    "mousedown",
    "touchstart",
    // "mouseover",
  ],
  release: [
    "mouseup",
    "touchend",
    // "mouseleave",
    // "touchcancel",
  ]
};

const TouchEvents = function (node) {
  // const pointer = Pointer(node);
  // const pointer = [0, 0];
  // todo, more pointers for multiple screen touches

  const handlers = [];
  Object.keys(categories).forEach((key) => {
    categories[key].forEach((handler) => {
      handlers[handler] = [];
    });
  });

  const clear = () => {
    Object.keys(handlers).forEach(key => handlers[key]
      .forEach(f => node.removeEventListener(key, f)));
    Object.keys(handlers).forEach((key) => {
      handlers[key] = [];
    });
  };

  Object.keys(categories).forEach(category => {
    const propName = "on" + category.charAt(0).toUpperCase() + category.slice(1);
    Object.defineProperty(node, propName, {
      set: (handler) => {
        categories[category].forEach(handlerName => {
          const handlerFunc = (e) => {
            Object.defineProperty(e, "x", { get: () => "view x", enumerable: true });
            Object.defineProperty(e, "y", { get: () => "view y", enumerable: true });
            handler(e);
          };
          handlers[handlerName].push(handlerFunc);
          node.addEventListener(handlerName, handlerFunc);
        });
      },
      enumerable: true
    });
  });

};

  // const onMouseMove = (handler, event) => {
  //   event.preventDefault();
  //   const e = pointer
  //     .move(event.clientX, event.clientY, event.buttons > 0)
  //     .get();
  //   handler(e);
  //   return e;
  // };
  // const onTouchMove = (handler, event) => {
  //   event.preventDefault();
  //   const e = pointer
  //     .move(event.touches[0].clientX, event.touches[0].clientY, true)
  //     .get();
  //   handler(e);
  //   return e;
  // };
  // const onMouseDown = (handler, event) => {
  //   event.preventDefault();
  //   const e = pointer
  //     .move(event.clientX, event.clientY, true)
  //     .get();
  //   handler(e);
  //   return e;
  // };
  // const onTouchStart = (handler, event) => {
  //   event.preventDefault();
  //   const e = pointer
  //     .move(event.touches[0].clientX, event.touches[0].clientY, true)
  //     .get();
  //   handler(e);
  //   return e;
  // };
  // const onEnd = (handler, event) => {
  //   event.preventDefault();
  //   const e = pointer.release().get();
  //   handler(e);
  //   return e;
  // };

  // const onScroll = function (handler, event) {
  //   const e = {
  //     deltaX: event.deltaX,
  //     deltaY: event.deltaY,
  //     deltaZ: event.deltaZ,
  //   };
  //   e.position = convertToViewBox(node, event.clientX, event.clientY);
  //   [e.x, e.y] = e.position;
  //   event.preventDefault();
  //   handler(e);
  //   return e;
  // };

  // Object.defineProperty(node, "mouse", {
  //   get: () => pointer.get(),
  //   enumerable: true
  // });
  // Object.defineProperty(node, "onMove", {
  //   set: (handler) => {
  //     const mouseFunc = event => onMouseMove(handler, event);
  //     const touchFunc = event => onTouchMove(handler, event);
  //     handlers.mousemove.push(mouseFunc);
  //     handlers.touchmove.push(mouseFunc);
  //     node.addEventListener("mousemove", mouseFunc);
  //     node.addEventListener("touchmove", touchFunc);
  //   },
  //   enumerable: true
  // });
  // Object.defineProperty(node, "onPress", {
  //   set: (handler) => {
  //     const mouseFunc = event => onMouseDown(handler, event);
  //     const touchFunc = event => onTouchStart(handler, event);
  //     handlers.mousedown.push(mouseFunc);
  //     handlers.touchstart.push(touchFunc);
  //     node.addEventListener("mousedown", mouseFunc);
  //     node.addEventListener("touchstart", touchFunc);
  //     // additional
  //     // const mouseOverFunc = event => onMouseDown(handler, event);
  //     // handlers.mouseover.push(mouseOverFunc);
  //     // node.addEventListener("mouseover", mouseOverFunc);
  //   },
  //   enumerable: true
  // });
  // Object.defineProperty(node, "onRelease", {
  //   set: (handler) => {
  //     const mouseFunc = event => onEnd(handler, event);
  //     const touchFunc = event => onEnd(handler, event);
  //     handlers.mouseup.push(mouseFunc);
  //     handlers.touchend.push(touchFunc);
  //     node.addEventListener("mouseup", mouseFunc);
  //     node.addEventListener("touchend", touchFunc);
  //     // additional
  //     // const mouseLeaveFunc = event => onEnd(handler, event);
  //     // const touchCancelFunc = event => onEnd(handler, event);
  //     // handlers.mouseleave.push(mouseLeaveFunc);
  //     // handlers.touchcancel.push(touchCancelFunc);
  //     // node.addEventListener("mouseleave", mouseLeaveFunc);
  //     // node.addEventListener("touchcancel", touchCancelFunc);
  //   },
  //   enumerable: true
  // });
  // Object.defineProperty(node, "scroll", {
  //   set: (handler) => {
  //     const scrollFunc = event => onScroll(handler, event);
  //     handlers.mouseup.push(scrollFunc);
  //     node.addEventListener("scroll", scrollFunc);
  //   },
  //   enumerable: true
  // });

export default TouchEvents;
