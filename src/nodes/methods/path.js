/**
 * SVG (c) Robby Kraft
 */

import flatten from "../arguments/flatten";

// todo: curve is putting too many commas , , , , 
// between everything

const pathCommands = {
  m: "move",
  l: "line",
  v: "vertical",
  h: "horizontal",
  a: "ellipse",
  c: "curve",
  s: "smoothCurve",
  q: "quadCurve",
  t: "smoothQuadCurve",
  z: "close"
};
Object.keys(pathCommands).forEach(key => {
  const s = pathCommands[key];
  pathCommands[key.toUpperCase()] = s.charAt(0).toUpperCase() + s.slice(1);
});

const methods = { };
methods.clear = (el) => { el.setAttribute("d", ""); return el; }

// 🍆
const getD = (el) => {
  const attr = el.getAttribute("d");
  return (attr == null) ? "" : attr;
};

const appendPathItem = function (el, command, ...args) {
  const params = flatten(args).join(",");
  el.setAttribute("d", `${getD(el)}${command}${params}`);
  return el;
};

Object.keys(pathCommands).forEach(key => {
  methods[pathCommands[key]] = (el, ...args) => appendPathItem(el, key, ...args);
});

export default methods;
