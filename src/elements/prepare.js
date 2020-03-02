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

const prepare = function (element, tagName) {
  if (typeof Attributes[tagName] === "object" && Attributes[tagName] !== null) {
    Object.keys(Attributes[tagName])
      .forEach(key => element.setAttribute(key, Attributes[tagName][key]));
  };
  if (typeof Elements[tagName] === "object" && Elements[tagName] !== null) {
    Elements[tagName].forEach(childTag => {
      Object.defineProperty(element, childTag, { value: (...args) => {
        const el = constructor(childTag, ...args);
        prepare(el, childTag);
        element.appendChild(el);
        return el; // returns the new element;
      }});
    });
  };
  if (typeof ElementAttr[tagName] === "object" && ElementAttr[tagName] !== null) {
    ElementAttr[tagName].forEach(attribute => {
      Object.defineProperty(element, toCamel(attribute), { value: (...args) => {
        element.setAttribute(attribute, ...args);
        return element;
      }});
    });
  }
  // switch (tagName) {
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
