import flatten from "../arguments/flatten";
import coordinates from "../arguments/coordinates";
import attributes from "../attributes/attributes";

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
const pointsString = function (...points) {
  return Array.from(Array(Math.floor(points.length / 2)))
    .map((_, i) => `${points[i * 2]},${points[i * 2 + 1]}`).join(" ");
};

export const setPoints = function (el, ...args) {
  el.setAttribute("d", pointsString(...coordinates(...flatten(...args))));
  return el;
};

export const setLinePoints = function (el, ...args) {
  coordinates(...flatten(...args)).slice(0, 4)
    .forEach((n, i) => el.setAttribute(attributes.line[i], n));
  return el;
};

export const setRadius = (el, r) => {
  el.setAttribute("r", r);
  return el;
};

export const setCenter = function (el, ...args) {
  coordinates(...flatten(...args)).slice(0, 2)
    .forEach((n, i) => el.setAttribute(attributes.circle[i], n));
  return el;
};


// export const setArrowPoints = function (el, ...args) {
//   const children = Array.from(el.childNodes);
//   const path = children.filter(node => node.tagName === "path").shift();
//   const polys = ["svg-arrow-head", "svg-arrow-tail"]
//     .map(c => children.filter(n => n.getAttribute("class") === c).shift());

//   // draw
//   // if straight or curved
//   path.setAttribute("d", buildArrow(...args));

//   if (o.head.visible) {
//     polys[0].removeAttribute("display");
//     setPoints(polys[0], headPolyPts);
//   } else {
//     polys[0].setAttribute("display", "none");
//   }

//   if (o.tail.visible) {
//     polys[1].removeAttribute("display");
//     setPoints(polys[1], tailPolyPts);
//   } else {
//     polys[1].setAttribute("display", "none");
//   }
//   return el;
// };

