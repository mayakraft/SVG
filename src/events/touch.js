/**
 * SVG (c) Robby Kraft
 */

import Case from "../arguments/case";
import { convertToViewBox } from "../methods/viewBox";

const categories = {
  move: ["mousemove", "touchmove"],
  press: ["mousedown", "touchstart"], // "mouseover",
  release: ["mouseup", "touchend"]    // "mouseleave", "touchcancel",
};

const handlerNames = Object.values(categories)
  .reduce((a,b) => a.concat(b), []);

const off = (element, handlers) => handlerNames.forEach(handlerName => {
  handlers[handlerName].forEach(func => element.removeEventListener(handlerName, func));
  handlers[handlerName] = [];
});

const defineGetter = (obj, prop, value) => Object.defineProperty(obj, prop, {
  get: () => value,
  enumerable: true
});

const TouchEvents = function (element) {
  // todo, more pointers for multiple screen touches

  let startPoint = [];
  // hold onto all handlers. to be able to turn them off
  const handlers = [];
  Object.keys(categories).forEach((key) => {
    categories[key].forEach((handler) => {
      handlers[handler] = [];
    });
  });

  const removeHandler = (category) => {
    categories[category].forEach(handlerName => {
      handlers[handlerName].forEach(func => element.removeEventListener(handlerName, func));
    })
  };

  // add more properties depending on the type of handler
  const categoryUpdate = {
    press: () => {},
    release: () => {},
    move: (e, viewPoint) => {
      if (e.buttons > 0 && startPoint[0] === undefined) {
        startPoint = viewPoint;
      } else if(e.buttons === 0 && startPoint[0] !== undefined) {
        startPoint = [];
      }
      ["startX", "startY"].filter(prop => !e.hasOwnProperty(prop))
        .forEach((prop, i) => defineGetter(e, prop, startPoint[i]));
    }
  };

  // assign handlers for onMove, onPress, onRelease
  Object.keys(categories).forEach(category => {
    const propName = "on" + Case.capitalized(category);
    Object.defineProperty(element, propName, {
      set: (handler) => (handler == null)
        ? removeHandler(category)
        : categories[category].forEach(handlerName => {
            const handlerFunc = (e) => {
              // const pointer = (e.touches != null && e.touches.length
              const pointer = (e.touches != null
                ? e.touches[0]
                : e);
              // onRelease events don't have a pointer
              if (pointer !== undefined) {
                const viewPoint = convertToViewBox(element, pointer.clientX, pointer.clientY).map(n => isNaN(n) ? undefined : n); // e.target
                ["x", "y"]
                  .filter(prop => !e.hasOwnProperty(prop))
                  .forEach((prop, i) => defineGetter(e, prop, viewPoint[i]));
                categoryUpdate[category](e, viewPoint);
              }
              handler(e);
            };
            handlers[handlerName].push(handlerFunc);
            element.addEventListener(handlerName, handlerFunc);
          }),
      enumerable: true
    });
  });

  Object.defineProperty(element, "off", { value: () => off(element, handlers) });
};

export default TouchEvents;
