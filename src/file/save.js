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

const SAVE_OPTIONS = () => ({
  output: K.string,
  windowStyle: false,
  filename: "image.svg"
});

const save = function (svg, options) {
  options = Object.assign(SAVE_OPTIONS(), options);
  const source = (new window.XMLSerializer()).serializeToString(svg);
  const formattedString = vkXML(source);
  if (isBrowser && !isNode) {
    downloadInBrowser(options.filename, formattedString);
  }
  return (options.output === "svg" ? svg : formattedString);
};

export default save;
