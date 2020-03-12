/**
 * SVG (c) Robby Kraft
 */

import vkXML from "../../include/vkbeautify-xml";
import svgNS from "../environment/namespace";
import window from "../environment/window";
import {
  isBrowser,
  isNode,
  isWebWorker
} from "../environment/detect";
import K from "../environment/keys";


const downloadInBrowser = function (filename, contentsAsString) {
  const blob = new window.Blob([contentsAsString], { type: "text/plain" });
  const a = window.document.createElement("a");
  a.setAttribute("href", window.URL.createObjectURL(blob));
  a.setAttribute("download", filename);
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
};

// const getPageCSS = function () {
//   const css = [];
//   for (let s = 0; s < window.document.styleSheets.length; s += 1) {
//     const sheet = window.document.styleSheets[s];
//     try {
//       const rules = ("cssRules" in sheet) ? sheet.cssRules : sheet.rules;
//       for (let r = 0; r < rules.length; r += 1) {
//         const rule = rules[r];
//         if ("cssText" in rule) {
//           css.push(rule.cssText);
//         } else {
//           css.push(`${rule.selectorText} {\n${rule.style.cssText}\n}\n`);
//         }
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   }
//   return css.join("\n");
// };

const SAVE_OPTIONS = () => ({
  output: K.string,
  windowStyle: false,
  filename: "image.svg"
});

// export const save = function (svg, filename = "image.svg", includeDOMCSS = false) {
const save = function (svg, options) {
  options = Object.assign(SAVE_OPTIONS(), options);
  // // prepare options
  // if (typeof options === K.string || options instanceof String) {
  //   // expecting the user provided a filename instead of the options object
  //   const filename = options;
  //   options = SAVE_OPTIONS();
  //   options.filename = filename;
  // } else
  // else {
  //   // user supplied object. make sure it has all the necessary keys.
  //   const newOptions = SAVE_OPTIONS();
  //   Object.keys(options).forEach((key) => { newOptions[key] = options[key]; });
  //   options = newOptions;
  // }
  // // save file
  // if (options.windowStyle) {
  //   // include the CSS inside of <link> style sheets
  //   const styleContainer = window.document.createElementNS(svgNS, K.style);
  //   styleContainer.setAttribute("type", "text/css");
  //   styleContainer.innerHTML = getPageCSS();
  //   svg.appendChild(styleContainer);
  // }
  const source = (new window.XMLSerializer()).serializeToString(svg);
  const formattedString = vkXML(source);
  // const formattedString = source;
  if (isBrowser && !isNode) {
    downloadInBrowser(options.filename, formattedString);
  }
  return (options.output === "svg" ? svg : formattedString);
  // return formattedString;
};

export default save;
