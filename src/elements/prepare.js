import Attributes from "./attributes";
import Elements from "./childElements";
import constructor from "./constructor";
import ElementAttr from "./elementAttributes";

const toCamel = s => s.replace(/([-_][a-z])/ig, $1 => $1
  .toUpperCase()
  .replace("-", "")
  .replace("_", ""));

// export const attachFunctionalStyleSetters = function (element) {
//   // attributes.filter(attr => attr !== element.tagName).forEach((key) => {
//   attributes.filter(key => element[toCamel(key)] === undefined)
//     .forEach((key) => {
//       element[toCamel(key)] = (...args) => {
//         element.setAttribute(key, ...args);
//         return element;
//       };
//     });
// };

const prepare = function (element) {
  const nodeName = element.nodeName;
  if (typeof Attributes[nodeName] === "object" && Attributes[nodeName] !== null) {
    Object.keys(Attributes[nodeName])
      .forEach(key => element.setAttribute(key, Attributes[nodeName][key]));
  };
  if (typeof Elements[nodeName] === "object" && Elements[nodeName] !== null) {
    Elements[nodeName].forEach(childTag => {
      Object.defineProperty(element, childTag, { value: (...args) => {
        const el = prepare(constructor(childTag, ...args));
        element.appendChild(el);
        return el; // returns the new element;
      }});
    });
  };
  if (typeof ElementAttr[nodeName] === "object" && ElementAttr[nodeName] !== null) {
    ElementAttr[nodeName].forEach(attribute => {
      Object.defineProperty(element, toCamel(attribute), { value: (...args) => {
        element.setAttribute(attribute, ...args);
        return element;
      }});
    });
  }
  // switch (nodeName) {
  //   case "svg":
  //     // attach certain methods
  //     break;
  //   case "g":
  //     break;
  // }
  return element;
};

export default prepare;

// const cdata = function (textContent) {
//   const c = (new window.DOMParser())
//     .parseFromString("<root></root>", "text/xml")
//     .createCDATASection(`${textContent}`);
//   return c;
// };
