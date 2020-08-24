/**
 * SVG (c) Robby Kraft
 */

import flatten from "../arguments/flatten";
import coordinates from "../arguments/coordinates";
import { distanceSq2 } from "../methods/math";

const attachToParent = (parent, svg) => (svg && svg.parentNode == null
  ? parent.appendChild(svg)
  : undefined);

const removeFromParent = svg => (svg && svg.parentNode
  ? svg.parentNode.removeChild(svg)
  : undefined);

const possiblePositionAttributes = [["cx", "cy"], ["x", "y"]];

const controlPoint = function (parent, options = {}) {
  // private properties. unless exposed
  const position = [0, 0]; // initialize below
  const cp = {
    selected: false,
    svg: undefined,
    // to be overwritten
    updatePosition: input => input,
  };

  const updateSVG = () => {
    if (!cp.svg) { return; }
    if (!cp.svg.parentNode) {
      parent.appendChild(cp.svg);
    }
    possiblePositionAttributes
      .filter(coords => cp.svg[coords[0]] != null)
      .forEach(coords => coords.forEach((attr, i) => {
        cp.svg.setAttribute(attr, position[i]);
      }));
  };

  const proxy = new Proxy(position, {
    set: (target, property, value) => {
      target[property] = value;
      updateSVG();
      return true;
    }
  });

  const setPosition = function (...args) {
    coordinates(...flatten(...args))
      .forEach((n, i) => { position[i] = n; });
    updateSVG();
    // alert delegate
    if (typeof position.delegate === "function") {
      // console.log("proxy.pointsContainer", position.pointsContainer);
      position.delegate.apply(position.pointsContainer, [proxy, position.pointsContainer]);
    }
  };

  // set default position
  // setPosition(options.position);

  position.delegate = undefined; // to be set
  position.setPosition = setPosition;
  position.onMouseMove = mouse => (cp.selected
    ? setPosition(cp.updatePosition(mouse))
    : undefined);
  position.onMouseUp = () => { cp.selected = false; };
  position.distance = mouse => Math.sqrt(distanceSq2(mouse, position));

  ["x", "y"].forEach((prop, i) => Object.defineProperty(position, prop, {
    get: () => position[i],
    set: (v) => { position[i] = v; }
  }));
  // would be nice if "svg" also called removeFromParent(); on set()
  ["svg", "updatePosition", "selected"].forEach(key => Object
    .defineProperty(position, key, {
      get: () => cp[key],
      set: (v) => { cp[key] = v; }
    }));
  Object.defineProperty(position, "remove", {
    value: () => {
      // todo, do we need to do any other unwinding?
      removeFromParent(cp.svg);
      position.delegate = undefined;
    }
  });

  return proxy;
};

const controls = function (svg, number, options) {
  let selected;
  let delegate;
  const points = Array.from(Array(number))
    .map(() => controlPoint(svg, options));

  // hook up the delegate callback for the on change event
  const protocol = point => (typeof delegate === "function"
    ? delegate.call(points, points, point)
    : undefined);

  points.forEach((p) => {
    p.delegate = protocol;
    p.pointsContainer = points;
  });

  const mousePressedHandler = function (mouse) {
    if (!(points.length > 0)) { return; }
    selected = points
      .map((p, i) => ({ i, d: distanceSq2(p, [mouse.x, mouse.y]) }))
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

  svg.onPress = mousePressedHandler;
  svg.onMove = mouseMovedHandler;
  svg.onRelease = mouseReleasedHandler;
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

  const functionalMethods = {
    onChange: (func, runOnceAtStart) => {
      delegate = func;
      if (runOnceAtStart === true) { func.call(points, points, undefined); }
    },
    position: func => points.forEach((p, i) => p.setPosition(func.call(points, i))),
    svg: func => points.forEach((p, i) => { p.svg = func.call(points, i); }),
  };
  Object.keys(functionalMethods).forEach((key) => {
    points[key] = function () {
      if (typeof arguments[0] === "function") {
        functionalMethods[key](...arguments);
      }
      return points;
    };
  });
  points.parent = function (parent) {
    if (parent != null && parent.appendChild != null) {
      points.forEach((p) => { parent.appendChild(p.svg); });
    }
    return points;
  };

  return points;
};

const applyControlsToSVG = (svg) => {
  svg.controls = (...args) => controls.call(svg, svg, ...args);
};

// export default controls;
export default applyControlsToSVG;
