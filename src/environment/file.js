/**
 * SVG (c) Robby Kraft
 */

import vkXML from "../../include/vkbeautify-xml";
import svgNS from "./namespace";
import window from "./window";
import {
  isBrowser,
  isNode,
  isWebWorker
} from "./detect";

const downloadInBrowser = function (filename, contentsAsString) {
  const blob = new window.Blob([contentsAsString], { type: "text/plain" });
  const a = window.document.createElement("a");
  a.setAttribute("href", window.URL.createObjectURL(blob));
  a.setAttribute("download", filename);
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
};

const getPageCSS = function () {
  const css = [];
  for (let s = 0; s < window.document.styleSheets.length; s += 1) {
    const sheet = window.document.styleSheets[s];
    try {
      const rules = ("cssRules" in sheet) ? sheet.cssRules : sheet.rules;
      for (let r = 0; r < rules.length; r += 1) {
        const rule = rules[r];
        if ("cssText" in rule) {
          css.push(rule.cssText);
        } else {
          css.push(`${rule.selectorText} {\n${rule.style.cssText}\n}\n`);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
  return css.join("\n");
};

const SAVE_OPTIONS = () => ({
  output: "string",
  windowStyle: false,
  filename: "image.svg"
});

// export const save = function (svg, filename = "image.svg", includeDOMCSS = false) {
export const save = function (svg, options) {
  // prepare options
  if (typeof options === "string" || options instanceof String) {
    // expecting the user provided a filename instead of the options object
    const filename = options;
    options = SAVE_OPTIONS();
    options.filename = filename;
  } else if (typeof options !== "object" || options === null) {
    options = SAVE_OPTIONS();
  } else {
    // user supplied object. make sure it has all the necessary keys.
    const newOptions = SAVE_OPTIONS();
    Object.keys(options).forEach((key) => { newOptions[key] = options[key]; });
    options = newOptions;
  }
  // save file
  if (options.windowStyle) {
    // include the CSS inside of <link> style sheets
    const styleContainer = window.document.createElementNS(svgNS, "style");
    styleContainer.setAttribute("type", "text/css");
    styleContainer.innerHTML = getPageCSS();
    svg.appendChild(styleContainer);
  }
  const source = (new window.XMLSerializer()).serializeToString(svg);
  const formattedString = vkXML(source);
  if (isBrowser && !isNode) {
    downloadInBrowser(options.filename, formattedString);
  }
  return (options.output === "svg" ? svg : formattedString);
};

// const parseCSSText = function (styleContent) {
//   const styleElement = document.createElement("style");
//   styleElement.textContent = styleContent;
//   document.body.appendChild(styleElement);
//   const rules = styleElement.sheet.cssRules;
//   document.body.removeChild(styleElement);
//   return rules;
// };

/** parser error to check against */
// const pErr = (new window.DOMParser())
//  .parseFromString("INVALID", "text/xml")
//  .getElementsByTagName("parsererror")[0]
//  .namespaceURI;

// the SVG is returned, or given as the argument in the callback(svg, error)
export const load = function (input, callback) {
  // try cascading attempts at different possible param types
  // "input" is either a (1) raw text encoding of the svg
  //   (2) filename (3) already parsed DOM element
  if (typeof input === "string" || input instanceof String) {
    // (1) raw text encoding
    const xml = (new window.DOMParser()).parseFromString(input, "text/xml");
    const parserErrors = xml.getElementsByTagName("parsererror");
    if (parserErrors.length === 0) {
      const parsedSVG = xml.documentElement;
      if (callback != null) {
        callback(parsedSVG);
      }
      return parsedSVG;
    }
    // (2) filename
    fetch(input)
      .then(response => response.text())
      .then(str => (new window.DOMParser())
        .parseFromString(str, "text/xml"))
      .then((svgData) => {
        const allSVGs = svgData.getElementsByTagName("svg");
        if (allSVGs == null || allSVGs.length === 0) {
          throw new Error("error, valid XML found, but no SVG element");
        }
        if (callback != null) {
          callback(allSVGs[0]);
        }
        return allSVGs[0];
      // }).catch((err) => callback(null, err));
      });
  } else if (input instanceof Document) {
    // (3) already parsed SVG... why would this happen? just return it
    callback(input);
    return input;
  }
};
