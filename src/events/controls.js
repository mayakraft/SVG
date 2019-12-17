/**
 * SVG (c) Robby Kraft
 */

const controlPoint = function (parent, options = {}) {
  const position = [0, 0]; // initialize below
  let selected = false;
  let svg;

  const updateSVG = () => {
    if (svg != null) {
      if (svg.parentNode == null) { parent.appendChild(svg); }
      svg.setAttribute("cx", position[0]);
      svg.setAttribute("cy", position[1]);
    }
  };

  const proxy = new Proxy(position, {
    set: (target, property, value, receiver) => {
      target[property] = value;
      updateSVG();
      return true;
    }
  });

  const setPosition = function (...args) {
    if (args.length === 0) { return; }
    const root = typeof args[0];
    if (root === "number") {
      position[0] = args[0];
      position[1] = args[1];
      updateSVG();
    }
    if (root === "object") {
      if (typeof args[0][0] === "number") {
        position[0] = args[0][0];
        position[1] = args[0][1];
        updateSVG();
      } else if (typeof args[0].x === "number") {
        position[0] = args[0].x;
        position[1] = args[0].y;
        updateSVG();
      }
    }
    // alert delegate
    if (typeof position.delegate === "function") {
      // console.log("proxy.pointsContainer", position.pointsContainer);
      position.delegate.apply(position.pointsContainer, [proxy, position.pointsContainer]);
    }
  };

  // set default position
  setPosition(options.position);

  // to be overwritten
  let updatePosition = input => input;

  const onMouseMove = function (mouse) {
    if (selected) {
      setPosition(updatePosition(mouse));
    }
  };
  const onMouseUp = () => { selected = false; };
  const distance = mouse => ([0, 1]
    .map(i => mouse[i] - position[i])
    .map(e => e ** 2)
    .reduce((a, b) => a + b, 0));

  position.delegate = undefined; // to be set
  position.setPosition = setPosition;
  position.onMouseMove = onMouseMove;
  position.onMouseUp = onMouseUp;
  position.distance = distance;
  Object.defineProperty(position, "x", {
    get: () => position[0],
    set: (newValue) => { position[0] = newValue; }
  });
  Object.defineProperty(position, "y", {
    get: () => position[1],
    set: (newValue) => { position[1] = newValue; }
  });
  Object.defineProperty(position, "svg", {
    get: () => svg,
    set: (newSVG) => { svg = newSVG; }
  });
  Object.defineProperty(position, "positionDidUpdate", {
    set: (method) => { updatePosition = method; }
  });
  Object.defineProperty(position, "selected", {
    set: (value) => { selected = value; }
  });
  Object.defineProperty(position, "remove", {
    value: () => {
      if (svg != null) { svg.remove(); }
    }
  });

  return proxy;
};

const controls = function (svg, number, options) {
  let selected;
  let delegate;
  const points = Array.from(Array(number))
    .map(() => controlPoint(svg, options));
  points.forEach((pt, i) => {
    if (typeof options === "object"
      && typeof options.position === "function") {
      pt.setPosition(options.position(i));
    }
  });

  // hook up the delegate callback for the on change event
  const protocol = function (point) {
    if (typeof delegate === "function") {
      delegate.call(points, points, point);
    }
  };
  points.forEach((p) => {
    p.delegate = protocol;
    p.pointsContainer = points;
  });

  const mousePressedHandler = function (mouse) {
    if (!(points.length > 0)) { return; }
    selected = points
      .map((p, i) => ({ i, d: p.distance(mouse) }))
      .sort((a, b) => a.d - b.d)
      .shift()
      .i;
    points[selected].selected = true;
  };
  const mouseMovedHandler = function (mouse) {
    points.forEach(p => p.onMouseMove(mouse));
  };
  const mouseReleasedHandler = function () {
    points.forEach(p => p.onMouseUp());
    selected = undefined;
  };

  svg.mousePressed = mousePressedHandler;
  svg.mouseMoved = mouseMovedHandler;
  svg.mouseReleased = mouseReleasedHandler;
  // svg.addEventListener("touchcancel", touchUpHandler, false);

  Object.defineProperty(points, "selectedIndex", { get: () => selected });
  Object.defineProperty(points, "selected", { get: () => points[selected] });
  Object.defineProperty(points, "add", {
    value: (opt) => {
      points.push(controlPoint(svg, opt));
    },
  });
  points.removeAll = () => {
    while (points.length > 0) {
      points.pop().remove();
    }
  };

  points.onChange = function (func, runOnceAtStart) {
    if (typeof func === "function") {
      delegate = func;
      if (runOnceAtStart === true) { func.call(points, points, undefined); }
    }
    return points;
  };

  points.position = function (func) {
    if (typeof func === "function") {
      points.forEach((p, i) => p.setPosition(func.call(points, i)));
    }
    return points;
  };
  points.svg = function (func) {
    if (typeof func === "function") {
      points.forEach((p, i) => { p.svg = func.call(points, i); });
    }
    return points;
  };
  points.parent = function (parent) {
    if (parent != null && parent.appendChild != null) {
      points.forEach((p) => { parent.appendChild(p.svg); });
    }
    return points;
  };

  return points;
};

export default controls;
