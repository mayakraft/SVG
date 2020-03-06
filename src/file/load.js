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

const done = (svg, callback) => {
  if (callback != null) { callback(svg); }
  return svg;
};

const goFetch = function (input, callback) {
  const promise = {};
  fetch(input)
    .then(response => response.text())
    .then(str => (new window.DOMParser())
      .parseFromString(str, "text/xml"))
    .then((svgData) => {
      const allSVGs = svgData.getElementsByTagName("svg");
      if (allSVGs == null || allSVGs.length === 0) {
        throw new Error("error, valid XML found, but no SVG element");
      }
      promise.svg = done(allSVGs[0], callback);
    // }).catch((err) => callback(null, err));
    });
  return promise;
};

// the SVG is returned, or given as the argument in the callback(svg, error)
// try "filename.svg", "<svg>" text blob, already-parsed XML document tree
const load = function (input, callback) {
  if (typeof input === K.string || input instanceof String) {
    if (input.slice(input.length - 4, input.length) === ".svg") {
      return goFetch(input, callback);
    }
    const xml = (new window.DOMParser()).parseFromString(input, "text/xml");
    const parserErrors = xml.getElementsByTagName("parsererror");
    return (parserErrors.length === 0)
      ? done(xml.documentElement, callback)
      : parserErrors[0];
  }
  if (input instanceof window.Document) {
    return done(input);
  }
};

export default load;
