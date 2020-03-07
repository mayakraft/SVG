import flatten from "../arguments/flatten";
import coordinates from "../arguments/coordinates";
import attributes from "../attributes";
import { setViewBox } from "../view/viewBox";

// const pointType = el => {
//   if (typeof el === "number") { return "number"; }
//   if (typeof el.x === "number") { return "object"; }
//   if (typeof el[0] === "number") { return "array"; }
// };

/**
 * before calling this, call flatten and coordinates
 * this is assuming that the array is a flat span:2 coordinates
 * with typeof pointsArray[0] equal to number
 */
const pointsString = (...points) => {
  return Array.from(Array(Math.floor(points.length / 2)))
    .map((_, i) => `${points[i * 2]},${points[i * 2 + 1]}`).join(" ");
};

const setPoints = (el, ...args) => {
  el.setAttribute("d", pointsString(...coordinates(...flatten(...args))));
  return el;
};

const setLinePoints = (el, ...args) => {
  coordinates(...flatten(...args)).slice(0, 4)
    .forEach((n, i) => el.setAttribute(attributes.line[i], n));
  return el;
};

const setRadius = (el, r) => {
  el.setAttribute("r", r);
  return el;
};

const setCenter = (el, ...args) => {
  coordinates(...flatten(...args)).slice(0, 2)
    .forEach((n, i) => el.setAttribute(attributes.circle[i], n));
  return el;
};

const setTextContent = (el, text) => {
  el.textContent = "";
  el.appendChild(cdata(text));
  return el;
};

// set the viewbox size
// "size" refers viewbox whenever possible
// size on the DOM, the "width" attribute, you can handle it yourself
const size = (element, ...args) => {
  const numbers = coordinates(...flatten(...args));
  switch (numbers.length) {
    case 2: setViewBox(element, 0, 0, ...numbers); break;
    case 4: setViewBox(element, ...numbers); break;
    default: break;
  }
  return element;
};

export default {
  svg: {
    size: size,
  },
  line: {
    setPoints: setLinePoints
  },
  circle: {
    setCenter: setCenter,
    setRadius: setRadius,
    radius: setRadius,
  },
  polygon: {
    setPoints: setPoints
  },
  polyline: {
    setPoints: setPoints
  },
  style: {
    setTextContent: setTextContent
  },
};
