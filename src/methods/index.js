// /**
//  * SVG (c) Robby Kraft
//  */

// import N from "../nodes/nodes";
// import Debug from "../environment/debug";
// import flatten from "../arguments/flatten";
// // specific to nodes
// import svg from "./singleElements/svg";
// import path from "./singleElements/path";
// import style from "./singleElements/style";
// import marker from "./singleElements/marker";
// import presentation from "./singleElements/presentation";
// // specific to no one node
// import classId from "./manyElements/classId";
// import DOM from "./manyElements/dom";
// import Transforms from "./manyElements/transforms";
// import URLs from "./manyElements/urls";
// import * as ViewBox from "./manyElements/viewBox";

// const makeExist = (obj, key) => {
//   if (obj[key] === undefined) { obj[key] = {}; }
// };

// const assignKey = (target, key, source) => {
//   makeExist(target, key);
//   Object.assign(target[key], source);
// };

// const assignKeys = (target, keys, source) => keys
//   .forEach(key => assignKey(target, key, source));

// // assuming these don't overlap in keys, we can init this object this way
// const methods = {};

// // [svg, path, style, marker, presentation]
// //   .forEach(obj => Object.keys(obj)
// //     .forEach(key => assignKey(methods, key, obj[key])));

// assignKeys(methods, flatten(N.t, N.v, N.g, N.s), Transforms);
// assignKeys(methods, flatten(N.t, N.v, N.g), URLs);
// assignKeys(methods, flatten(N.t, N.v, N.g, N.s, N.p, N.i, N.h, N.d), DOM);

// const bound = {};
// // // assigning bound to "this" to pass the Constructor back up the chain.
// Object.keys(methods).forEach(nodeName => {
//   bound[nodeName] = {};
//   Object.keys(methods[nodeName]).forEach(method => {
//     bound[nodeName][method] = (el, ...args) => methods[nodeName][method].call(bound, el, ...args) || el;
//   });
// });

// export default bound;

// // export a master lookup table, a node type and its methods
// // {
// //  svg: {clear: ƒ, size: ƒ, setViewBox: ƒ, background: ƒ, …}
// //  path: {command: ƒ, clear: ƒ, instructions: ƒ, move: ƒ, …}
// //  style: {setTextContent: ƒ, removeChildren: ƒ, appendTo: ƒ, …}
// //  marker: {size: ƒ, setViewBox: ƒ, removeChildren: ƒ, …}
// //  text: {clearTransform: ƒ, translate: ƒ, rotate: ƒ, …}
// //  …
// // }
