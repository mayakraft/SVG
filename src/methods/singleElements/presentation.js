// /**
//  * SVG (c) Robby Kraft
//  */

// import flatten from "../../arguments/flatten";
// import coordinates from "../../arguments/coordinates";
// import attributes from "../../attributes/attributes";
// import Debug from "../../environment/debug";

// const pointsString = function () {
//   return Array.from(Array(Math.floor(arguments.length / 2)))
//     .map((_, i) => `${arguments[i * 2]},${arguments[i * 2 + 1]}`).join(" ");
// };

// const polys = {
//   setPoints: {
//     attr: attributes.polyline.slice(0,1),
//     f: (...args) => pointsString(...coordinates(...flatten(...args)))
//   }
// };

// const AttributeSetters = {
//   line: {
//     setPoints: {
//       attrs: attributes.line,
//       f: (a,b,c,d) => coordinates(...flatten(a, b, c, d)).slice(0, 4)
//     },
//   },
//   polyline: polys,
//   polygon: polys,
//   circle: {
//     setRadius: { attr: "r", f: r => r },
//     radius: { attr: "r", f: r => r },
//     setCenter: {
//       attrs: attributes.circle.slice(0, 2),
//       f: (a,b) => coordinates(...flatten(a, b)).slice(0, 2)
//     },
//   },
// };

// const methods = {};

// Object.keys(AttributeSetters).forEach(nodeName => {
//   methods[nodeName] = {};
//   Object.keys(AttributeSetters[nodeName])
//     .filter(method => AttributeSetters[nodeName][method].attr !== undefined)
//     .forEach(method => {
//       methods[nodeName][method] = (el, ...args) => el.setAttribute(
//         AttributeSetters[nodeName][method].attr,
//         AttributeSetters[nodeName][method].f(...args)
//       );
//     });
//   Object.keys(AttributeSetters[nodeName])
//     .filter(method => AttributeSetters[nodeName][method].attrs !== undefined)
//     .forEach(method => {
//       methods[nodeName][method] = (el, ...args) => AttributeSetters[nodeName][method].f(...args)
//         .forEach((v, i) => el.setAttribute(AttributeSetters[nodeName][method].attrs[i], v));
//     });
// });

// Debug.log("presentation attrs", methods);

// export default methods;
