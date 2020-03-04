/**
 * SVG (c) Robby Kraft
 */

import {
  arcPath
} from "../../geometry/index";

const arcArguments = (a, b, c, d, e) => arcPath(a, b, c, d, e, false);
const wedgeArguments = (a, b, c, d, e) => arcPath(a, b, c, d, e, true);

const parabolaArguments = (x, y, width, height) => {
  const COUNT = 128;
  const iter = Array.from(Array(COUNT + 1))
    .map((_, i) => (i - (COUNT)) / COUNT * 2 + 1);
  const ptsX = iter.map(i => x + (i + 1) * width * 0.5);
  const ptsY = iter.map(i => y + (i ** 2) * height);
  return iter.map((_, i) => [ptsX[i], ptsY[i]]);
};

const regularPolygonArguments = (cX, cY, radius, sides) => {
  const halfwedge = 2 * Math.PI / sides * 0.5;
  const r = Math.cos(halfwedge) * radius;
  return Array.from(Array(sides)).map((el, i) => {
    const a = -2 * Math.PI * i / sides + halfwedge;
    const x = cX + r * Math.sin(a);
    const y = cY + r * Math.cos(a);
    return [x, y];
  });
};

const roundRectArguments = (x, y, width, height, cornerRadius = 0) => {
  if (cornerRadius > width / 2) { cornerRadius = width / 2; }
  if (cornerRadius > height / 2) { cornerRadius = height / 2; }
  const w = width - cornerRadius * 2;
  const h = height - cornerRadius * 2;
  const s = `A${cornerRadius} ${cornerRadius} 0 0 1`;
  return [`M${x + (width - w) / 2}`, y, `h${w}`, s, x + width, y + (height - h) / 2, `v${h}`, s, x + width - cornerRadius, y + height, `h${-w}`, s, x, y + height - cornerRadius, `v${-h}`, s, x + cornerRadius, y].join(" ");
};

// export const arrow = function (...args) {
//   const shape = window.document.createElementNS(svgNS, "g");
//   const tailPoly = window.document.createElementNS(svgNS, "polygon");
//   const headPoly = window.document.createElementNS(svgNS, "polygon");
//   const arrowPath = window.document.createElementNS(svgNS, "path");
//   tailPoly.setAttributeNS(null, "class", "svg-arrow-tail");
//   headPoly.setAttributeNS(null, "class", "svg-arrow-head");
//   arrowPath.setAttributeNS(null, "class", "svg-arrow-path");
//   tailPoly.setAttributeNS(null, "style", "stroke: none; pointer-events: none;");
//   headPoly.setAttributeNS(null, "style", "stroke: none; pointer-events: none;");
//   arrowPath.setAttributeNS(null, "style", "fill: none;");
//   shape.appendChild(arrowPath);
//   shape.appendChild(tailPoly);
//   shape.appendChild(headPoly);
//   shape.options = {
//     head: { width: 0.5, height: 2, visible: false, padding: 0.0 },
//     tail: { width: 0.5, height: 2, visible: false, padding: 0.0 },
//     curve: 0.0,
//     pinch: 0.618,
//     endpoints: [],
//   };
//   setArrowPoints(shape, ...args);
//   prepare("arrow", shape);
//   shape.setPoints = (...a) => setArrowPoints(shape, ...a);
//   return shape;
// };

const nodes = {
  names: {
    arc: "path",
    wedge: "path",
    parabola: "polyline",
    regularPolygon: "polygon",
    roundRect: "path"
  },
  arguments: {
    arc: arcArguments,
    wedge: wedgeArguments,
    parabola: parabolaArguments,
    regularPolygon: regularPolygonArguments,
    roundRect: roundRectArguments,
  }
};

export default nodes;
