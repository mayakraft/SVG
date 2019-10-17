/**
 * SVG (c) Robby Kraft
 */

import vkXML from "../../include/vkbeautify-xml";
import svgNS from "./namespace";

const downloadInBrowser = function (filename, contentsAsString) {
  const blob = new window.Blob([contentsAsString], { type: "text/plain" });
  const a = document.createElement("a");
  a.setAttribute("href", window.URL.createObjectURL(blob));
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const getPageCSS = function () {
  const css = [];
  for (let s = 0; s < document.styleSheets.length; s += 1) {
    const sheet = document.styleSheets[s];
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

export const save = function (svg, filename = "image.svg", includeDOMCSS = false) {
  if (includeDOMCSS) {
    // include the CSS inside of <link> style sheets
    const styleContainer = document.createElementNS(svgNS, "style");
    styleContainer.setAttribute("type", "text/css");
    styleContainer.innerHTML = getPageCSS();
    svg.appendChild(styleContainer);
  }
  const source = (new XMLSerializer()).serializeToString(svg);
  const formattedString = vkXML(source);
  if (window != null) {
    downloadInBrowser(filename, formattedString);
  }
  return formattedString;
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
// const pErr = (new DOMParser())
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
    const xml = (new DOMParser()).parseFromString(input, "text/xml");
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
      .then(str => (new DOMParser())
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
