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
  const params = flatten(...args).join(" ");
  el.setAttribute("d", `${getD(el)}${command}${params}`);
  return el;
};

// const parsePathCommand = (string) => {
//   const letter = string.match(/[a-z]/ig).shift();
//   const numberString = string.match(/[^a-z]*/ig).filter(a => a !== "").shift();
//   const numbers = (numberString != null ? numberString.split(/(,| )/) : [])
//     .map(a => parseFloat(a))
//     .filter(a => !isNaN(a))
//     .slice(0, expectedArguments[letter] || 0);
//   return {
//     name: pathCommands[letter],
//     letter,
//     numbers,
//   };
// };

var markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
var digitRegEx = /-?[0-9]*\.?\d+/g;

const parsePathCommands = function (str) {
  // Ulric Wilfred
  const results = []; 
  let match;
  while ((match = markerRegEx.exec(str)) !== null) {
    results.push(match);
  };
  return results.map(match => ({
    letter: str[match.index],
    index: match.index
  }))
  .reduceRight((all, cur) => {
    const chunk = str.substring(cur.index, all.length ? all[all.length - 1].index : str.length);
    return all.concat([
       { letter: cur.letter, 
       index: cur.index, 
       chunk: (chunk.length > 0) ? chunk.substr(1, chunk.length - 1) : chunk }
    ]);
  }, [])
  .reverse()
  .map((command) => {
    const values = command.chunk.match(digitRegEx);
    return {
      command: pathCommands[command.letter],
      letter: command.letter,
      values: values ? values.map(parseFloat) : []
    };
  });
};

const getCommands = (element) => {
  return parsePathCommands(getD(element));
};

const methods = {
  command: appendPathItem,
  clear: (el) => { el.removeAttribute("d"); return el; },
  instructions: getCommands,
};

Object.keys(pathCommands).forEach(key => {
  methods[pathCommands[key]] = (el, ...args) => appendPathItem(el, key, ...args);
});

export default methods;
