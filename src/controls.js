/**
 * SVG in Javascript (c) Robby Kraft
 */

import { circle } from "./elements/primitives";
import { convertToViewBox } from "./viewBox";

const controlPoint = function (parent, options) {
  if (options == null) { options = {}; }
  if (options.radius == null) { options.radius = 1; }
  if (options.fill == null) { options.fill = "#000"; }
  if (options.stroke == null) { options.stroke = "none"; }

  const c = circle(0, 0, options.radius);
  // c.setAttribute("fill", options.fill);
  c.setAttribute("style", `fill:${options.fill};stroke:${options.stroke};`);
  // let _position = options.position.slice();
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
  if ("position" in options) {
    const pos = options.position;
    if (pos[0] != null) {
      setPosition(...pos);
    } else if (pos.x != null) {
      setPosition(pos.x, pos.y);
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

export default function (parent, number, options) {
  // constructor options
  if (options == null) { options = {}; }
  if (options.parent == null) { options.parent = parent; }
  if (options.radius == null) { options.radius = 1; }
  if (options.fill == null) { options.fill = "#000000"; }

  let _points = Array.from(Array(number))
    .map(_ => controlPoint(options.parent, options));
  let _selected = undefined;

  const mouseDownHandler = function (event) {
    event.preventDefault();
    let mouse = convertToViewBox(parent, event.clientX, event.clientY);
    if (!(_points.length > 0)) { return; }
    _selected = _points
      .map((p,i) => ({i:i, d:p.distance(mouse)}))
      .sort((a,b) => a.d - b.d)
      .shift()
      .i;
    _points[_selected].selected = true;
  }
  const mouseMoveHandler = function (event) {
    event.preventDefault();
    let mouse = convertToViewBox(parent, event.clientX, event.clientY);
    _points.forEach(p => p.onMouseMove(mouse));
  }
  const mouseUpHandler = function (event) {
    event.preventDefault();
    _points.forEach(p => p.onMouseUp());
    _selected = undefined;
  }
  const touchDownHandler = function (event) {
    event.preventDefault();
    let touch = event.touches[0];
    if (touch == null) { return; }
    let pointer = convertToViewBox(parent, touch.clientX, touch.clientY);
    if (!(_points.length > 0)) { return; }
    _selected = _points
      .map((p,i) => ({i:i, d:p.distance(pointer)}))
      .sort((a,b) => a.d - b.d)
      .shift()
      .i;
    _points[_selected].selected = true;
  }
  const touchMoveHandler = function (event) {
    event.preventDefault();
    let touch = event.touches[0];
    if (touch == null) { return; }
    let pointer = convertToViewBox(parent, touch.clientX, touch.clientY);
    _points.forEach(p => p.onMouseMove(pointer));
  }
  const touchUpHandler = function (event) {
    event.preventDefault();
    _points.forEach(p => p.onMouseUp());
    _selected = undefined;
  }
  parent.addEventListener("touchstart", touchDownHandler, false);
  parent.addEventListener("touchend", touchUpHandler, false);
  parent.addEventListener("touchcancel", touchUpHandler, false);
  parent.addEventListener("touchmove", touchMoveHandler, false);
  parent.addEventListener("mousedown", mouseDownHandler, false);
  parent.addEventListener("mouseup", mouseUpHandler, false);
  parent.addEventListener("mousemove", mouseMoveHandler, false);

  Object.defineProperty(_points, "selectedIndex", {
    get: function () { return _selected; }
  });
  Object.defineProperty(_points, "selected", {
    get: function () { return _points[_selected]; }
  });
  Object.defineProperty(_points, "removeAll", {value: function () {
    _points.forEach(tp => tp.remove());
    _points.splice(0, _points.length);
    _selected = undefined;
    // todo: do we need to untie all event handlers?
  }});

  Object.defineProperty(_points, "add", {value: function (options) {
    _points.push(controlPoint(parent, options));
  }});

  return _points;
}
