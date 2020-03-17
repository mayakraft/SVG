// /**
//  * SVG (c) Robby Kraft
//  */

// /**
//  * convert all user-supplied arguments into a flat array
//  * to match the expected arguments ordered in "attributes"
//  */

// import window from "../environment/window";
// import svgNS from "../environment/namespace";
// import K from "../environment/keys";

// import Spec from "../nodes/spec/index";
// import attributes from "../attributes/index";

// const applyArgsToAttrs = (element, attrs, func, ...args) => {
//   if (typeof func !== "function") { return; }
//   func(...args).forEach((v, i) => {
//     if (attrs[i] != null) {
//       element.setAttribute(attrs[i], v);
//     }
//   });
// };

// const RequiredAttributes = {
//   svg: {
//     version: "1.1",
//     xmlns: svgNS,
//   },
//   style: {
//     type: "text/css"
//   }
// };

// const Initializers = {};

// Object.keys(Spec)
//   .filter(key => Spec[key].init != null)
//   .forEach(key => {
//     Initializers[key] = Spec[key].init;
//   });

// console.log("Initializers", Initializers);

// const ArgumentByNode = {};

// Object.keys(Spec)
//   .filter(key => Spec[key].args != null)
//   .forEach(key => {
//     ArgumentByNode[key] = Spec[key].args;
//   });

// console.log("ArgumentByNode", ArgumentByNode);

// // nodeName can be custom shapes too like "arrow"
// const Arguments = (primitiveName, element, ...args) => {
//   //
//   // todo: figure out the difference between arc and curve why arguments are coming in differently
//   //
//   const nodeName = element.nodeName;

//   // required attributes for elements like <svg>, <style>
//   if (typeof RequiredAttributes[nodeName] === K.object && RequiredAttributes[nodeName] !== null) {
//     Object.keys(RequiredAttributes[nodeName])
//       .forEach(key => element.setAttribute(key, RequiredAttributes[nodeName][key]));
//   }
//   // custom initializers for anything that ISN'T an attribute=value pair.
//   // for example: append the SVG to a parent.
//   if (Initializers[primitiveName] !== undefined) {
//     Initializers[primitiveName](element, ...args);
//   }
//   // set attribute=value pair, if they exist, and if the user supplied arguments
//   if (typeof ArgumentByNode[primitiveName] === "function") {
//     applyArgsToAttrs(element, attributes[primitiveName], ArgumentByNode[primitiveName], ...args);
//   }
//   return element;
// };

// Arguments.prepareCustomNodes = CustomNodes => {
//   Object.keys(CustomNodes)
//     .filter(name => CustomNodes[name].attributes !== undefined)
//     .forEach(name => {
//       attributes[name] = CustomNodes[name].attributes;
//     });

//   Object.keys(CustomNodes)
//     .filter(name => CustomNodes[name].arguments !== undefined)
//     .forEach(name => {
//       ArgumentByNode[name] = CustomNodes[name].arguments;
//     });

//   Object.keys(CustomNodes)
//     .filter(name => CustomNodes[name].init !== undefined)
//     .forEach(name => {
//       Initializers[name] = CustomNodes[name].init;
//     });
// };

// export default Arguments;
