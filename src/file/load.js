/**
 * SVG (c) Robby Kraft
 */

import window from "../environment/window";
import { isBrowser } from "../environment/detect";
import K from "../environment/keys";

/** parser error to check against */
// const pErr = (new window.DOMParser())
//  .parseFromString("INVALID", "text/xml")
//  .getElementsByTagName("parsererror")[0]
//  .namespaceURI;

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

// get an svg from a html 5 fetch returned in a promise
// will reject if there is no svg

// the SVG is returned as a promise
// try "filename.svg", "<svg>" text blob, already-parsed XML document tree
export const async = function (input) {
  return new Promise((resolve, reject) => {
    if (typeof input === K.string || input instanceof String) {
      fetch(input)
        .then(response => response.text())
        .then(str => checkParseError(parse(str)))
        .then(xml => xml.nodeName === "svg"
          ? xml
          : xml.getElementsByTagName("svg")[0])
        .then(svg => (svg == null
            ? reject("valid XML found, but no SVG element")
            : resolve(svg)))
        .catch(err => reject(err));
    }
    else if (input instanceof window.Document) {
      return asyncDone(input);
    }
  });
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

// check for an actual .svg ending?
// (input.slice(input.length - 4, input.length) === ".svg")
const isFilename = input => typeof input === K.string
  && /^[\w,\s-]+\.[A-Za-z]{3}$/.test(input)
  && input.length < 10000;

const Load = input => (isFilename(input) 
  && isBrowser
  && typeof window.fetch === K.function
  ? async(input)
  : sync(input));

export default Load;
