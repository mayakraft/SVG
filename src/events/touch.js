/**
 * SVG (c) Robby Kraft
 */

import Case from "../arguments/case";

const convertToViewBox = function (svg, x, y) {
  const pt = svg.createSVGPoint();
  pt.x = x;
  pt.y = y;
  const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
  return [svgPoint.x, svgPoint.y];
};

const categories = {
  move: ["mousemove", "touchmove"],
  press: ["mousedown", "touchstart"], // "mouseover",
  release: ["mouseup", "touchend"]    // "mouseleave", "touchcancel",
};

const handlerNames = Object.values(categories)
  .reduce((a,b) => a.concat(b), []);

const off = (node, handlers) => handlerNames.forEach(handlerName => {
  handlers[handlerName].forEach(func => node.removeEventListener(handlerName, func));
  handlers[handlerName] = [];
});

const defGet = (obj, prop, value) => Object.defineProperty(obj, prop, {
  get: () => value,
  enumerable: true
});

const TouchEvents = function (node) {
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
      handlers[handlerName].forEach(func => node.removeEventListener(handlerName, func));
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
      ["startX", "startY"].forEach((prop, i) => defGet(e, prop, startPoint[i]));
    }
  };

  // assign handlers for onMove, onPress, onRelease
  Object.keys(categories).forEach(category => {
    const propName = "on" + Case.capitalized(category);
    Object.defineProperty(node, propName, {
      set: (handler) => (handler == null)
        ? removeHandler(category)
        : categories[category].forEach(handlerName => {
            const handlerFunc = (e) => {
              const pointer = e.touches != null ? e.touches[0] : e;
              const viewPoint = convertToViewBox(node, pointer.clientX, pointer.clientY); // e.target
              ["x", "y"].forEach((prop, i) => defGet(e, prop, viewPoint[i]));
              categoryUpdate[category](e, viewPoint);
              handler(e);
            };
            handlers[handlerName].push(handlerFunc);
            node.addEventListener(handlerName, handlerFunc);
          }),
      enumerable: true
    });
  });

  Object.defineProperty(node, "off", { value: () => off(node, handlers) });
};

export default TouchEvents;
