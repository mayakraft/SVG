/**
 * SVG (c) Robby Kraft
 */
/**
 * provide DOMParser, XMLSerializer, and document for both browser
 * and or nodejs environments.
 * - browser: built-in window object
 * - nodejs: package XMLDOM, https://www.npmjs.com/package/@xmldom/xmldom
 */
import detect from "./detect";
/**
 * @description an object named "window" with DOMParser, XMLSerializer,
 * and document.
 * in the case of browser-usage, this object is simply the browser window,
 * in the case of nodejs, the package "xmldom" provides the methods.
 */
const SVGWindow = (function () {
  let win = {};
  if (detect.isNode) {
    const { DOMParser, XMLSerializer } = require("@xmldom/xmldom");
    win.DOMParser = DOMParser;
    win.XMLSerializer = XMLSerializer;
    // smallest, valid HTML5 document: doctype with non-whitespace title
    win.document = new DOMParser().parseFromString(
      "<!DOCTYPE html><title>.</title>", "text/html");
  } else if (detect.isBrowser) {
    win = window;
  }
  return win;
}());

export default SVGWindow;
