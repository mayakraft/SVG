/**
 * SVG (c) Robby Kraft
 */

import flatten from "../arguments/flatten";

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

// 🍆
const getD = (el) => {
  const attr = el.getAttribute("d");
  return (attr == null) ? "" : attr;
};

// todo: would be great if for arguments > 2 it alternated space and comma
const appendPathItem = function (el, command, ...args) {
  const params = flatten(...args).join(" ");
  el.setAttribute("d", `${getD(el)}${command}${params}`);
  return el;
};

const methods = { };
methods.clear = (el) => { el.removeAttribute("d"); return el; }

Object.keys(pathCommands).forEach(key => {
  methods[pathCommands[key]] = (el, ...args) => appendPathItem(el, key, ...args);
});

export default methods;
