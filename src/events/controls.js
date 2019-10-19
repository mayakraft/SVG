/**
 * SVG (c) Robby Kraft
 */

import { circle } from "../elements/primitives";

const controlPoint = function (parent, opts = {}) {
  const options = Object.assign({}, opts);
  if (options.radius == null) { options.radius = 1; }
  if (options.fill == null) { options.fill = "#000"; }
  if (options.stroke == null) { options.stroke = "none"; }

  const c = circle(0, 0, options.radius)
    .fill(options.fill)
    .stroke(options.stroke);
  // c.setAttribute("style", `fill:${options.fill};stroke:${options.stroke};`);

  const position = [0, 0]; // do below
  let selected = false;

  if (parent != null) {
    parent.appendChild(c);
  }
  const setPosition = function (x, y) {
    position[0] = x;
    position[1] = y;
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
  };
  // set default position
  if (options.position != null) {
    let pos = options.position;
    if (typeof options.position === "function") {
      pos = options.position();
    }
    if (typeof pos === "object") {
      if (typeof pos[0] === "number") {
        setPosition(...pos);
      } else if (typeof pos.x === "number") {
        setPosition(pos.x, pos.y);
      }
    }
  }
  let updatePosition = function (input) { return input; };
  const onMouseMove = function (mouse) {
    if (selected) {
      const pos = updatePosition(mouse);
      setPosition(pos[0], pos[1]);
    }
  };
  const onMouseUp = function () {
    selected = false;
  };
  const distance = function (mouse) {
    return Math.sqrt(((mouse[0] - position[0]) ** 2)
      + ((mouse[1] - position[1]) ** 2));
  };
  const remove = function () {
    parent.removeChild(c);
  };

  return {
    circle: c,
    set position(pos) {
      if (pos[0] != null) {
        setPosition(pos[0], pos[1]);
      } else if (pos.x != null) {
        setPosition(pos.x, pos.y);
      }
    },
    get position() { return [...position]; },
    onMouseUp,
    onMouseMove,
    distance,
    remove,
    set positionDidUpdate(method) { updatePosition = method; },
    set selected(value) { selected = true; },
  };
};

const controls = function (svg, number, opts = {}) {
  // constructor options
  const options = Object.assign({}, opts);
  if (options.radius == null) { options.radius = 1; }
  if (options.fill == null) { options.fill = "#000"; }

  const points = Array.from(Array(number))
    .map(() => controlPoint(svg, options));
  let selected;

  const mouseDownHandler = function (mouse) {
    if (!(points.length > 0)) { return; }
    selected = points
      .map((p, i) => ({ i, d: p.distance(mouse) }))
      .sort((a, b) => a.d - b.d)
      .shift()
      .i;
    points[selected].selected = true;
  };
  const mouseMoveHandler = function (mouse) {
    points.forEach(p => p.onMouseMove(mouse));
  };
  const mouseUpHandler = function () {
    points.forEach(p => p.onMouseUp());
    selected = undefined;
  };
  const touchDownHandler = function (pointer) {
    if (!(points.length > 0)) { return; }
    selected = points
      .map((p, i) => ({ i, d: p.distance(pointer) }))
      .sort((a, b) => a.d - b.d)
      .shift()
      .i;
    points[selected].selected = true;
  };
  const touchMoveHandler = function (pointer) {
    points.forEach(p => p.onMouseMove(pointer));
  };
  const touchUpHandler = function () {
    // event.preventDefault();
    points.forEach(p => p.onMouseUp());
    selected = undefined;
  };

  svg.mousePressed = touchDownHandler;
  svg.mousePressed = mouseDownHandler;
  svg.mouseMoved = mouseMoveHandler;
  svg.mouseMoved = touchMoveHandler;
  svg.mouseReleased = mouseUpHandler;
  svg.mouseReleased = touchUpHandler;
  // todo
  // svg.addEventListener("touchcancel", touchUpHandler, false);

  Object.defineProperty(points, "selectedIndex", {
    get: () => selected,
  });
  Object.defineProperty(points, "selected", {
    get: () => points[selected],
  });
  // Object.defineProperty(points, "removeAll", {
  //   value: () => {
  //     points.forEach(tp => tp.remove());
  //     points.splice(0, points.length);
  //     selected = undefined;
  //   // todo: do we need to untie all event handlers?
  //   //  Object.keys(handlers)
  //   //    .forEach(key => handlers[key]
  //   //      .forEach(f => node.removeEventListener(key, f)));
  //   //  Object.keys(handlers).forEach((key) => { handlers[key] = []; });
  //   }
  // });

  Object.defineProperty(points, "add", {
    value: (opt) => {
      points.push(controlPoint(svg, opt));
    },
  });

  return points;
};

export default controls;
