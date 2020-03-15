/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
import K from "../environment/keys";

/** parser error to check against */
// const pErr = (new window.DOMParser())
//  .parseFromString("INVALID", "text/xml")
//  .getElementsByTagName("parsererror")[0]
//  .namespaceURI;

const asyncDone = (svg, callback) => {
  if (callback != null) { callback(svg); }
  return svg;
};

/**
 * parse and checkParseError go together. 
 * checkParseError needs to be called to pull out the .documentElement
 */
const parse = string => (new window.DOMParser())
  .parseFromString(string, "text/xml");

const checkParseError = xml => {
  const parserErrors = xml.getElementsByTagName("parsererror");
  if (parserErrors.length > 0) {
    throw new Error(parserErrors[0]);
  }
  return xml.documentElement;
};

const goFetch = function (input, callback) {
  const promise = {};
  fetch(input)
    .then(response => response.text())
    .then(str => checkParseError(parse(str)))
    .then((xml) => {
      const allSVGs = xml.getElementsByTagName("svg")[0];
      // if (allSVGs == null || allSVGs.length === 0) {
      if (allSVGs.length === 0) {
        throw new Error("error, valid XML found, but no SVG element");
      }
      promise.svg = asyncDone(allSVGs[0], callback);
    }).catch((err) => callback(null, err));
    // });
  return promise;
};

// the SVG is returned, or given as the argument in the callback(svg, error)
// try "filename.svg", "<svg>" text blob, already-parsed XML document tree
export const async = function (input, callback) {
  if (typeof input === K.string || input instanceof String) {
    if (input.slice(input.length - 4, input.length) === ".svg") {
      try {
        return goFetch(input, callback);
      }
      catch (error) {
        return error;
      }
    }
    return asyncDone(loadSync(input), callback);
  }
  if (input instanceof window.Document) {
    return asyncDone(input);
  }
};

export const sync = function (input) {
  if (typeof input === K.string || input instanceof String) {
    try {
      return checkParseError(parse(input));
    } catch (error) {
      return error;
    }
  }
  if (input.childNodes != null) {
    return input;
  }
};
