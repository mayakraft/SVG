/**
 * SVG (c) Robby Kraft
 */

const Animation = function (node) {

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

};

export default Animation;