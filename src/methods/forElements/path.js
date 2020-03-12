/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";

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


const expectedArguments = {
  m: 2,
  l: 2,
  v: 1,
  h: 1,
  a: 7, // or 14
  c: 6,
  s: 4,
  q: 4,
  t: 2,
  z: 0,
};

// make capitalized copies of each command
Object.keys(pathCommands).forEach(key => {
  const s = pathCommands[key];
  pathCommands[key.toUpperCase()] = s.charAt(0).toUpperCase() + s.slice(1);
  expectedArguments[key.toUpperCase()] = expectedArguments[key];
});

const getD = (el) => { // 🍆
  const attr = el.getAttribute("d");
  return (attr == null) ? "" : attr;
};

// todo: would be great if for arguments > 2 it alternated space and comma
const appendPathItem = function (el, command, ...args) {
  console.log("append", command, ...args);
  const params = flatten(...args).join(" ");
  el.setAttribute("d", `${getD(el)}${command}${params}`);
  return el;
};

const parsePathCommand = (string) => {
  const letter = string.match(/[a-z]/ig).shift();
  const numberString = string.match(/[^a-z]*/ig).filter(a => a !== "").shift();
  const numbers = (numberString != null ? numberString.split(/(,| )/) : [])
    .map(a => parseFloat(a))
    .filter(a => !isNaN(a))
    .slice(0, expectedArguments[letter] || 0);
  return {
    name: pathCommands[letter],
    letter,
    numbers,
  };
};

const getCommands = (element) => {
  return getD(element).match(/[a-z][^a-z]*/ig)
    .map(a => parsePathCommand(a));
};

const methods = {
  command: appendPathItem,
  clear: (el) => { el.removeAttribute("d"); return el; },
  instructions: getCommands,
};

Object.keys(pathCommands).forEach(key => {
  methods[pathCommands[key]] = (el, ...args) => appendPathItem(el, key, ...args);
});

console.log(methods);

export default methods;
