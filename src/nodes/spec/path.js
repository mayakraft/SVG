/**
 * SVG (c) Robby Kraft
 */

import flatten from "../../arguments/flatten";

var markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
var digitRegEx = /-?[0-9]*\.?\d+/g;

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

// const expectedArguments = {
//   m: 2,
//   l: 2,
//   v: 1,
//   h: 1,
//   a: 7, // or 14
//   c: 6,
//   s: 4,
//   q: 4,
//   t: 2,
//   z: 0,
// };

// make capitalized copies of each command
Object.keys(pathCommands).forEach(key => {
  const s = pathCommands[key];
  pathCommands[key.toUpperCase()] = s.charAt(0).toUpperCase() + s.slice(1);
  // expectedArguments[key.toUpperCase()] = expectedArguments[key];
});

const getD = (el) => { // 🍆
  const attr = el.getAttribute("d");
  return (attr == null) ? "" : attr;
};

// todo: would be great if for arguments > 2 it alternated space and comma
const appendPathItem = (el, command, ...args) => el
  .setAttribute("d", `${getD(el)}${command}${flatten(...args).join(" ")}`);

// results in an array of objects [
//  { command: "M", values: [50, 50], en: "Move" }
//  { command: "l", values: [45, 95], en: "line" }
// ]
const parsePathCommands = function (str) {
  // Ulric Wilfred
  const results = []; 
  let match;
  while ((match = markerRegEx.exec(str)) !== null) {
    results.push(match);
  };
  return results.map(match => ({
    command: str[match.index],
    index: match.index
  }))
  .reduceRight((all, cur) => {
    const chunk = str.substring(cur.index, all.length ? all[all.length - 1].index : str.length);
    return all.concat([
       { command: cur.command, 
       index: cur.index, 
       chunk: (chunk.length > 0) ? chunk.substr(1, chunk.length - 1) : chunk }
    ]);
  }, [])
  .reverse()
  .map((el) => {
    const values = el.chunk.match(digitRegEx);
    el.en = pathCommands[el.command];
    el.values = values ? values.map(parseFloat) : [];
    delete el.chunk;
    return el;
  });
};

const clear = element => element.removeAttribute("d");

// break out the path commands into an array of descriptive objects
const getCommands = element => parsePathCommands(getD(element));

// user got the commands object and is returning it to us
const setCommands = (element, commandsObject) => commandsObject
  .forEach(el => appendPathItem(element, el.command, el.values));

// user provided one already-formatted path string
const setString = (element, commandsString) => element
  .setAttribute("d", commandsString);

const setters = {
  "string": setString,
  "object": setCommands,
};

// depending on the user's argument, different setters will get called
const noClearSet = (element, ...args) => {
  if (args.length === 1) {
    const typ = typeof args[0];
    if (setters[typ]) {
      setters[typ](element, args[0]);
    }
  }
};

const clearAndSet = (element, ...args) => {
  if (args.length === 1) {
    const typ = typeof args[0];
    if (setters[typ]) {
      clear(element);
      setters[typ](element, args[0]);
    }
  }
};

const methods = {
  command: appendPathItem,
  clear,
  "get": getCommands,
  "set": clearAndSet,
  "add": noClearSet,
};

Object.keys(pathCommands).forEach(key => {
  methods[pathCommands[key]] = (el, ...args) => appendPathItem(el, key, ...args);
});

export default {
  path: {
    methods
  }
};
