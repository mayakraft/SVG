/**
 * SVG (c) Robby Kraft
 */

import { convertToViewBox } from "../attributes/viewBox";

const Pointer = function (node) {
  const pointer = Object.create(null);

  Object.assign(pointer, {
    isPressed: false, // is the finger pressing, or is the mouse button down?
    position: [0, 0], // the current position of the mouse [x,y]
    pressed: [0, 0], //  the location of the beginning of this press
    drag: [0, 0], //     vector, displacement from start to now
    previous: [0, 0], //     on mouseMoved, the previous location
    x: 0, //
    y: 0 //              -- x and y, copy of position data
  });

  [pointer.position.x, pointer.position.y] = [0, 0];
  [pointer.pressed.x, pointer.pressed.y] = [0, 0];
  [pointer.drag.x, pointer.drag.y] = [0, 0];
  [pointer.previous.x, pointer.previous.y] = [0, 0];

  // deep copy mouse object
  const copyPointer = function () {
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
  const setPosition = function (clientX, clientY) {
    pointer.position = convertToViewBox(node, clientX, clientY);
    [pointer.x, pointer.y] = pointer.position;
  };
  const updateDrag = function () {
    // counting on didMove to have just been called
    // using pointer.position instead of calling convertToViewBox again
    pointer.drag = [
      pointer.position[0] - pointer.pressed[0],
      pointer.position[1] - pointer.pressed[1]
    ];
    [pointer.drag.x, pointer.drag.y] = pointer.drag;
  };

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
  Object.defineProperty(thisPointer, "get", { value: copyPointer });
  return thisPointer;
};

export default Pointer;
