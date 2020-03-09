/**
 * SVG (c) Robby Kraft
 */

import { convertToViewBox } from "../methods/viewBox";

const setPoint = (object, name, point = [0, 0]) => {
  object[name] = [point[0], point[1]];
  object[name].x = point[0];
  object[name].y = point[1];
}

const Pointer = function (node) {
  const pointer = Object.create(null);

  Object.assign(pointer, {
    isPressed: false, // is the finger pressing, or is the mouse button down?
    x: 0, //
    y: 0 //              -- x and y, copy of position data
  });
  ["position",  // the current position of the mouse [x,y]
   "pressed",   // the location of the beginning of this press
   "drag",      // vector, displacement from start to now
   "previous"]  // on mouseMoved, the previous location
    .forEach(name => setPoint(pointer, name));

  // deep copy mouse object
  const export = () => {
    const m = pointer.position.slice();
    // if a property is an object it's an array. we can .slice()
    Object.keys(pointer)
      .filter(key => typeof key === "object")
      .forEach((key) => { m[key] = pointer[key].slice(); });
    Object.keys(pointer)
      .filter(key => typeof key !== "object")
      .forEach((key) => { m[key] = pointer[key]; });
    return Object.freeze(m);
  };

  /**
   * private methods that modify
  */

  // clientX and clientY are from the browser event data
  const setPosition = (clientX, clientY) => setPoint(pointer, "position", convertToViewBox(node, clientX, clientY));
  // counting on didMove to have just been called
  // using pointer.position instead of calling convertToViewBox again
  const updateDrag = () => setPoint(pointer, "drag", [pointer.position[0] - pointer.pressed[0], pointer.position[1] - pointer.pressed[1]]);

  /**
   * public modifiers
  */
  const thisPointer = {};

  // let lastFramePressed = false;
  const move = function (clientX, clientY, isPressed = false) {
    // if pressed, but last frame pressed is false, call down()
    if (isPressed && !pointer.isPressed) {
      // move happened, and the last move it wasn't pressed.
      pointer.pressed = convertToViewBox(node, clientX, clientY);
    }
    pointer.isPressed = isPressed;
    pointer.previous = pointer.position;
    setPosition(clientX, clientY);
    if (pointer.isPressed) {
      updateDrag();
    } else {
      pointer.drag = [0, 0];
      pointer.pressed = [0, 0];
      [pointer.drag.x, pointer.drag.y] = pointer.drag;
      [pointer.pressed.x, pointer.pressed.y] = pointer.pressed;
    }
    return thisPointer;
  };
  const release = function () {
    pointer.isPressed = false;
    return thisPointer;
  };

  Object.defineProperty(thisPointer, "release", { value: release });
  Object.defineProperty(thisPointer, "move", { value: move });
  Object.defineProperty(thisPointer, "get", { value: export });
  return thisPointer;
};

export default Pointer;
